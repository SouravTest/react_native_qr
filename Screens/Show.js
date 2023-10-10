import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";

const Show = () => {
  let logoFromFile = require('../assets/adaptive-icon.png');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Qr</Text>
      <QRCode
      value="https://play.google.com/store/apps/details?id=com.o2Academia.souravtech&pli=1"
      logo={logoFromFile}
      logoSize={20}
    />
    </View>
  );
};

export default Show;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title:{
    fontFamily:"monospace",
    fontSize:17,
    color:"green",
    alignItems:"center",
    alignSelf:"center",
    margin:10
  }
});
