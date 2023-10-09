import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";

const CreateQr = () => {
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (text) => {
    if (text === "") {
      Alert.alert("Enter Data 1");
    } else {
      setShow(false);
      setData(text);
    }
  };

  const handleClick = () => {
    if (data === "") {
      Alert.alert("Enter Data 2");
    } else {
      setShow(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Generate Qr code</Text>
      <TextInput
        style={styles.inp}
        placeholder="Enter...."
        onChangeText={(text) => handleChange(text)}
      />
      <TouchableOpacity onPress={handleClick} style={styles.btn}>
        <Text style={styles.btninner}>Generate</Text>
      </TouchableOpacity>

    <View style={styles.qr}>
    {show && <QRCode value={data} />}
    </View>

      <Text style={{padding:10}}>QR CODE FOR : {data}</Text>
    </SafeAreaView>
  );
};

export default CreateQr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inp: {
    padding: 10,
    borderColor: "green",
    borderWidth: 0.5,
    margin: 10,
  },
  btn: {
    backgroundColor: "yellow",
    padding: 10,
    margin: 10,
    width: "30%",
    alignSelf: "center",
    textAlign: "center",
  },
  btninner: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  qr:{
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin:10
  }
});
