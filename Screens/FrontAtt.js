import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import axios from 'axios'; // For making HTTP requests
import * as Device from 'expo-device';

export default function FrontAtt() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [modalVisible, setModalVisible] = useState(false);
  const [processingVisible, setProcessingVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [ipAddress, setIpAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [deviceName, setDeviceName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [locationPermissionRequested, setLocationPermissionRequested] = useState(false);

  // Request location permission
  const requestLocationPermission = async () => {
    if (locationPermissionRequested) {
      return hasLocationPermission;
    }
    const { status } = await Location.requestForegroundPermissionsAsync();
    setHasLocationPermission(status === 'granted');
    setLocationPermissionRequested(true);
    return status === 'granted';
  };

  // Get the public IP address using an external API
  const getIpAddress = async () => {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      setIpAddress(response.data.ip);
    } catch (error) {
      console.error('Failed to get IP address', error);
      setIpAddress('unknown');
    }
  };

  // Get the device's location
  const fetchLocation = async () => {
    const permissionGranted = await requestLocationPermission();
    if (permissionGranted) {
      try {
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        showLocationAlert(coords); // Show location data in an alert
      } catch (error) {
        console.error('Failed to get location', error);
        setLocation({ latitude: 'unknown', longitude: 'unknown' });
        showLocationAlert({ latitude: 'unknown', longitude: 'unknown' });
      }
    } else {
      Alert.alert('Location Permission Required', 'Please grant location permissions to use this app.');
      setIsLoading(false);
    }
  };

  // Show location data in an alert
  const showLocationAlert = (coords) => {
    Alert.alert(
      'Location Data',
      `Latitude: ${coords.latitude}\nLongitude: ${coords.longitude}`,
      [{ text: 'OK', onPress: () => initializeCamera() }]
    );
  };

  // Initialize camera after location alert is dismissed
  const initializeCamera = async () => {
    setIsLoading(false);
    await requestCameraPermission();
  };

  // Get the device name
  const getDeviceName = () => {
    setDeviceName(Device.modelName || 'unknown');
  };

  // Initialize data fetching
  const initializeData = async () => {
    await getIpAddress();
    await fetchLocation();
    getDeviceName();
  };

  // Request camera permission
  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === 'granted');
  };

  // Handle QR code scanning
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setProcessingVisible(true); // Show processing modal

    // Post scan data to the PHP server
    await postScanData(data);

    // Auto close modal after showing response
    setTimeout(() => {
      setModalVisible(false);
      setScanned(false);
      setProcessingVisible(false); // Hide processing modal
    }, 5000); // Increase timeout to ensure user sees the response
  };

  // Post scan data to the PHP server
  const postScanData = async (userId) => {
    try {
      const response = await fetch('https://sankrailachighschool.org/Qr_Attendence/att.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          user: userId, // Use scan data as user ID
          ip: ipAddress,
          scan_from: 'exampleScanFrom', // Replace with actual scan source if available
          lat: location?.latitude || 'unknown',
          long: location?.longitude || 'unknown',
          device: deviceName, // Include device name
          account: 'exampleAccount' // Replace with actual account info if available
        }).toString(),
      });

      const result = await response.json();
      if (result.code === 1) {
        setUserDetails(result.userDetails); // Set user details on success
        console.log(result)
        setModalMessage('Entry success');
      } else {
        setModalMessage(result.message || 'Failed to process entry');
        setUserDetails(null);
      }
      setModalVisible(true);
    } catch (error) {
      console.error('Failed to connect to the server', error);
      setModalMessage('Failed to connect to the server.');
      setUserDetails(null);
      setModalVisible(true);
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Getting location data, please wait...</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (hasCameraPermission === null || hasLocationPermission === null) {
    return <View style={styles.container}><Text>Requesting for permissions...</Text></View>;
  }
  if (hasCameraPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button title="Request Camera Permission" onPress={requestCameraPermission} />
      </View>
    );
  }
  if (hasLocationPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to location</Text>
        <Button title="Request Location Permission" onPress={requestLocationPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        type={cameraType}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {userDetails ? (
            <>
              <Image source={{ uri: 'http://sankrailachighschool.org/sms/student_image/'+userDetails.image }} style={styles.userImage} />
              <Text style={styles.modalMessage}>Name: {userDetails.name}</Text>
              <Text style={styles.modalMessage}>ID: {userDetails.id}</Text>
              <Text style={styles.modalMessage}>STU ID: {userDetails.stuid}</Text>
            </>
          ) : (
            <Text style={styles.modalMessage}>{modalMessage}</Text>
          )}
        </View>
      </Modal>
      <Modal
        isVisible={processingVisible}
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text>Processing...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Modal>
      {/* <Button
        title="Flip Camera"
        onPress={() => {
          setCameraType(prevType =>
            prevType === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderRadius: 4,
    alignItems: 'center',
  },
  modalMessage: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});
