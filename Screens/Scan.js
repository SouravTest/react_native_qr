import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
  Clipboard,
  Linking,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialIcons } from "@expo/vector-icons";

const Scan = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setData(data);
    setType(type);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const copyToClipboard = () => {
    // your code to copy data to clipboard
    Clipboard.setString(data);
  };

  const openLink = () => {
    // your code to open link
    Linking.openURL(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>QR & BAR Code scanner</Text>
      {scanned ? (
        <View style={styles.data}>
          <Text style={{ margin: 10 }}>
            {" "}
            <MaterialIcons name="celebration" size={24} color="black" /> Scan
            Complete :~
          </Text>
          <Text style={styles.datainner}>Code type : {type}</Text>
          <Text style={styles.datainner}>Data : {data}</Text>
          <View style={styles.buttonContainer}>
            <Button style={styles.btn} title="Copy to Clipboard" onPress={copyToClipboard} />
            <Button style={styles.btn} title="Open Link" onPress={openLink} />
          </View>
        </View>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </SafeAreaView>
  );
};

export default Scan;

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
  data: {
    elevation: 5,
    padding: 10,
    borderRadius: 5,
  },
  datainner: {
    margin: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  btn:{
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  }
});
