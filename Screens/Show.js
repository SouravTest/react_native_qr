import { StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native";
import React, { useRef ,useState,useEffect} from "react";
import QRCode from "react-native-qrcode-svg";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import { shareAsync } from 'expo-sharing';


const Show = () => {
  let logoFromFile = require("../assets/adaptive-icon.png");
  const viewShotRef = useRef(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  useEffect(() => {
    (async () => {
      // const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      // setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  const handleDownload = async () => {
    try {
      const result = await viewShotRef.current.capture();
      if (result) {
        MediaLibrary.saveToLibraryAsync(result).then(() => {
          //console.log("QR Code saved to the media library.");
          Alert.alert('Downloade','QR Code saved to the media library')
        });
      }
    } catch (error) {
      Alert.alert('Error','Error while saving');
      //console.error("Error saving QR Code:", error);
    }

  };


  const handleShare = async()=>{
    const result = await viewShotRef.current.capture();
    shareAsync(result).then(() => {
      // setPhoto(undefined);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Qr</Text>
      <ViewShot  ref={viewShotRef} options={{ format: "png", quality: 1.0 }}>
        <QRCode
          value="https://play.google.com/store/apps/details?id=com.o2Academia.souravtech&pli=1"
          logo={logoFromFile}
          logoSize={20}
        />
          <Text style={{alignItems:"center",alignSelf:"center",color:'blue',fontSize:5}}>All about qr</Text>
</ViewShot>
      <TouchableOpacity style={styles.button} onPress={handleDownload}>
        <Text style={styles.buttonText}>Download QR Code</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Share QR Code</Text>
      </TouchableOpacity>
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
  title: {
    fontFamily: "monospace",
    fontSize: 17,
    color: "green",
    alignItems: "center",
    alignSelf: "center",
    margin: 10,
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
