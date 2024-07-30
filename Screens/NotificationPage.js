// import { StyleSheet, Text, View } from 'react-native';
// import React, { useEffect } from 'react';
// import messaging from '@react-native-firebase/messaging';

// const NotificationPage = () => {
//   const requestUserPermission = async () => {
//     try {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log('Authorization status:', authStatus);
//       }
//     } catch (error) {
//       console.error('Error requesting permission:', error);
//     }
//   };

//   useEffect(() => {
//     const setupPushNotifications = async () => {
//       await requestUserPermission();

//       try {
//         const token = await messaging().getToken();
//         console.log('FCM Token:', token);
//       } catch (error) {
//         console.error('Error getting FCM token:', error);
//       }
//     };

//     setupPushNotifications();
//   }, []);

//   return (
//     <View>
//       <Text>NotificationPage</Text>
//     </View>
//   );
// };

// export default NotificationPage;

// const styles = StyleSheet.create({});
