import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as Network from "expo-network";

const DeviceDetails = () => {
  const [net, setNet] = useState([]);
  const [device, setDevice] = useState([]);
  const [networkState, setNetworkState] = useState("");

  useEffect(() => {
    const getDeviceName = async () => {
      const ddata = [];
      ddata["deviceName"] = await Device.deviceName;
      ddata["brand"] = await Device.brand;
      ddata["deviceType"] = await Device.deviceType;
      ddata["manufacturer"] = await Device.manufacturer;
      ddata["modelName"] = await Device.modelName;
      ddata["osName"] = await Device.osName;
      ddata["osVersion"] = await Device.osVersion;
      ddata["deviceName"] = await Device.deviceName;
      ddata["modelId"] = await Device.modelId;
      ddata["osBuildFingerprint"] = await Device.osBuildFingerprint;
      setDevice(ddata);
    };

    const getIpAddress = async () => {
        const ndata = [];

       ndata['ipAddress'] = await Network.getIpAddressAsync();
       const networkState = await Network.getNetworkStateAsync();
       setNetworkState(networkState);
       console.log(networkState);
      setNet(ndata);
    };

    getDeviceName();
    getIpAddress();
  }, []);
  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>-------- Device Details --------</Text>
      <Text>Device name: {device["deviceName"]}</Text>
      <Text>brand name: {device["brand"]}</Text>
      <Text>deviceType: {device["deviceType"]}</Text>
      <Text>Device manufacturer: {device["manufacturer"]}</Text>
      <Text>osName: {device["osName"]}</Text>
      <Text>osVersion: {device["osVersion"]}</Text>
      <Text>modelId: {device["modelId"]}</Text>
      <Text>osBuildFingerprint: {device["osBuildFingerprint"]}</Text>
      <Text style={styles.title}>-------- Network Details --------</Text>
      <Text>IP address: {net['ipAddress']}</Text>
      <Text>Network state: {networkState.type}</Text>
      <Text>Is connected: {networkState.isConnected === true ? 'Yes':'no'}</Text>
      <Text>Is internet reachable: {networkState.isInternetReachable=== true ? 'Yes':'no'}</Text>
    </View>
  );
};

export default DeviceDetails;

const styles = StyleSheet.create({
  conatiner:{
    flex: 1,
    padding:10,
    margin:5,
    elevation:3,
  },
  title:{
    alignContent:"center",
    alignSelf:"center",
    fontSize:16,
    fontWeight:"bold",
    margin:5
  }
});
