import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Show from "./Screens/Show";
import Scan from "./Screens/Scan";
import Home from "./Screens/Home";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateQr from "./Screens/CreateQr";
import Attendance from "./Screens/Attendance";
import DeviceDetails from "./Screens/DeviceDetails";
import FrontAtt from "./Screens/FrontAtt";

// import { initializeApp } from 'expo-firebase-app';
// // rr

// const app = initializeApp(firebaseConfig);

// if (app) {
//   console.log('Firebase initialized successfully!');
// } else {
//   console.error('Error initializing Firebase.');
// }

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Scan" component={Scan} />
        <Stack.Screen name="Show" component={Show} />
        <Stack.Screen name="Create" component={CreateQr} />
        <Stack.Screen name="Attendance" component={Attendance} />
        <Stack.Screen name="Device" component={DeviceDetails} />
        <Stack.Screen name="Front" component={FrontAtt} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
