<?php
// ini_set('display_startup_errors', 1);
// ini_set('display_errors', 1);
// error_reporting(-1);

if(isset($_POST['uid']) && isset($_POST['tstamp']) && isset($_POST['longitude']) && isset($_POST['latitude'])){
$con = mysqli_connect("localhost","user","password","db");

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }else{
     // echo "connected";
  }
  
  $uid = $_POST['uid'];
  $tstamp = $_POST['tstamp'];
  $longitude = $_POST['longitude'];
  $latitude = $_POST['latitude'];
  $place = $_POST['place'];
  $data = $_POST['data'];
  $location = $_POST['location'];
  
  
     $n = mysqli_num_rows(mysqli_query($con,"SELECT `id` FROM `qr_test`"));
     
  $q = mysqli_query($con,"INSERT INTO `qr_test`(`uid`, `data`, `tstamp`, `longitude`, `latitude`, `scan_loc`,`scan_pos`)
  VALUES ('$uid','$data','$tstamp','$longitude','$latitude','$place','$location')");
  if($q){
    $myObj['success'] = true;
    $myObj['message'] = 'ok';
    $myObj['total'] = $n+1;
    $myJSON = json_encode($myObj);
    echo $myJSON;
      //echo "ok".$n+1;
  }else{
    $myObj['success'] = false;
    $myObj['message'] = 'Failed';
        $myJSON = json_encode($myObj);
    echo $myJSON;
     // echo "failed";
  }
}else{
     $myJSON = json_encode('Not found... ');
    echo $myJSON;
}

  
?>