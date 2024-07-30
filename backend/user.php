<?php 
if(isset($_POST['user']) && isset($_POST['ip'])){
    date_default_timezone_set('Asia/Kolkata');
    // Database connection
   $con= mysqli_connect("localhost","mayabnax_aatsUser","*mWl?B=tX(bc","mayabnax_aats");
    
    if (!$con) {
        $data = [
            'success' => false,
            'code' => 0,
            'message' => 'Failed to connect to database: ' . mysqli_connect_error()
        ];
        echo json_encode($data);
        exit;
    }

    // Sanitize inputs
    $user = mysqli_real_escape_string($con, $_POST['user']);
    $scan_from = mysqli_real_escape_string($con, $_POST['scan_from']);
    $scan_year = date('Y');
    $scan_month = date('m');
    $scan_time = date('H:i:s');
    $scan_date = date('Y-m-d');
    $scan_lat = mysqli_real_escape_string($con, $_POST['lat']);
    $scan_long = mysqli_real_escape_string($con, $_POST['long']);
    $scan_device = mysqli_real_escape_string($con, $_POST['device']);
    $scan_ip = mysqli_real_escape_string($con, $_POST['ip']);
    $scan_account = mysqli_real_escape_string($con, $_POST['account']);
    $scan_status = 1;

    // Check if user has already scanned today
    $check_query = "SELECT `id`, `scan_time`, `user_id`, `scan_timestamp` FROM `a` WHERE `user_id`='$user' AND `scan_date`='$scan_date'";
    $check = mysqli_query($con, $check_query);

    if ($check) {
        if (mysqli_num_rows($check) > 0) {
            $checkdata = mysqli_fetch_assoc($check);
            // Data available for today
            //FETCH USER
            $userData = mysqli_fetch_assoc(mysqli_query($con,"SELECT `id`,`name`,`stuid`,`image` FROM `aa` WHERE `id`='1'"));
            $data = [
                'success' => true,
                'code' => 2,
                'last_scan_on' => $checkdata['scan_timestamp'],
                'message' => 'Duplicate Entry',
            ];
        } else {
            // No data for today - Insert
            $insert_query = "INSERT INTO `a`(`user_id`, `scan_from`, `scan_year`, `scan_month`, `scan_time`, `scan_date`, `scan_lat`, `scan_long`, `device`, `ip`, `account_login_from`, `status`) 
            VALUES ('$user', '$scan_from', '$scan_year', '$scan_month', '$scan_time', '$scan_date', '$scan_lat', '$scan_long', '$scan_device', '$scan_ip', '$scan_account', '$scan_status')";
            $ins = mysqli_query($con, $insert_query);

            if ($ins) {
                // Entry success
                $data = [
                    'success' => true,
                    'code' => 1,
                    'message' => 'Entry success',
                    'userDetails'=> $userData
                ];
            } else {
                // Failed to insert
                $data = [
                    'success' => false,
                    'code' => 3,
                    'message' => 'Failed to insert entry __'.$con->error
                    
                ];
            }
        }
    } else {
        // Error in check
        $data = [
            'success' => false,
            'code' => 0,
            'message' => 'Failed to check status'
        ];
    }

    // Output response
    echo json_encode($data);
    
    // Close connection
    mysqli_close($con);
}else{
    echo "Just testing....";
}
?>
