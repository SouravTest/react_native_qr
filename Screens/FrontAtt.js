import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator, Alert, Image, SafeAreaView } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import axios from 'axios';
import * as Device from 'expo-device';
import { Audio } from 'expo-av';

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
  const [currentTime, setCurrentTime] = useState(new Date());
  const defaultImage = require('../assets/default_user_image.png'); // Fallback image
  const wrongImage = require('../assets/wrong.png'); // Fallback image
  const rightImage = require('../assets/right.png'); // Fallback image

  const playSound = async (soundFile) => {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();
  };


  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    }, 2000); // Increase timeout to ensure user sees the response
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
      //console.log(result);
      if (result.code === 1) {
        setUserDetails(result.userDetails); // Set user details on success
        setModalMessage('Entry success');
        await playSound(require('../assets/mp3/right.wav')); 
      } else {
        setModalMessage(result.message || 'Failed to process entry');
        setUserDetails(null);
        await playSound(require('../assets/mp3/wrong.wav')); 
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
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Getting location data, please wait...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  if (hasCameraPermission === null || hasLocationPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text>Requesting for permissions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasCameraPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text>No access to camera</Text>
          <Button title="Request Camera Permission" onPress={requestCameraPermission} />
        </View>
      </SafeAreaView>
    );
  }

  if (hasLocationPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text>No access to location</Text>
          <Button title="Request Location Permission" onPress={requestLocationPermission} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateTime}>{currentTime.toLocaleString()}</Text>
      </View>
      <View style={styles.content}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          type={cameraType}
        />
        <Text style={styles.scanText}>{'[ SCAN YOUR ID CARD ]'} </Text>
      </View>
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
                <Image source={rightImage} style={styles.modalImage} />
                <Image
                  source={{ uri: `https://sankrailachighschool.org/sms/student_image/${userDetails.image}` }}
                  style={styles.userImage}
                  onError={(e) => console.error('Image loading error:', e.nativeEvent.error)} // Log errors
                  defaultSource={defaultImage} // Use a fallback image for iOS
                />
              <Text style={styles.modalMessage}>NAME : {userDetails.name}</Text>
              <Text style={styles.modalMessage}>STU ID : {userDetails.stuid}</Text>
              <Text style={styles.modalMessage}>CLASS : {userDetails.class}</Text>
              <Text style={styles.modalMessage}>SECTION : {userDetails.section}</Text>
              <Text style={styles.modalMessage}>ROLL : {userDetails.roll}</Text>
              <Text style={styles.modalMessage}>SESSION : {userDetails.session}</Text>
            </>
          ) : (
            <>
             <Image source={wrongImage} style={styles.modalImage} />
            <Text style={styles.modalMessage}>{modalMessage}</Text>
            </>
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
      <View style={styles.footer}>
        <Text style={styles.footerText}>Design & developed by TMIS.CO.IN</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  dateTime: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop:20
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
    textShadowColor:"blue"
  },
  footerText: {
    fontSize: 14,
    color: '#333',
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
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
  },
  modalImage:{
    width: 100,
    height: 100,
    marginBottom: 20,
  }
});
