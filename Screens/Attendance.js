import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

const Attendence = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Processing...");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

    //send to server
    try {
      setIsLoading(true);
      const response = await axios.get(
        "https://mmg.wjy.mybluehostin.me/qr.php",
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
        }
      );

      const Result = response.data;

      if (Result.success == true) {
        //Alert.alert(Result.message, Result.total.toString());
        setMessage(Result.message + Result.total.toString());
        setScanned(true);
      } else {
        // Alert.alert("Alert", Result.message);
        setMessage("Try again", Result.message);
        setScanned(false);
      }
    } catch (err) {
      //console.log(err);
      setScanned(false);
      Alert.alert("Server error: ", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SCAN ATTENDENCE QR</Text>
      {isLoading ? (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      ) : scanned ? (
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </SafeAreaView>
  );
};

export default Attendence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "monospace",
    fontSize: 17,
    color: "green",
    alignItems: "center",
    alignSelf: "center",
    margin: 1,
  },
  indicatorContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    marginTop: 20,
    textAlign: "center",
  },
});
