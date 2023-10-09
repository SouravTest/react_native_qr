import { StyleSheet, Text, View } from "react-native";
import React from "react";
import QRCode from "react-native-qrcode-svg";

const Show = () => {
  return (
    <View style={styles.container}>
      <QRCode value="http://awesome.link.qr" />
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
});
