import { StyleSheet, Text, View, Button, SafeAreaView,TouchableOpacity,Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
          <Image
            style={{
              width: "100%",
              height: 220,
              margin:5,
              resizeMode: "contain",
            }}
            source={require("../assets/ok.png")}
          />

      <View style={styles.box}>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Show")}>
          <Text style={styles.btninner}> <AntDesign name="qrcode" size={20} color="black" />  Show</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Create")}>
          <Text style={styles.btninner}> <MaterialCommunityIcons name="qrcode-plus" size={20} color="black" />  Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Scan")}>
          <Text style={styles.btninner}> <MaterialCommunityIcons name="qrcode-scan" size={20} color="black" />  Scan</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Attendance")}>
          <Text style={styles.btninner}> <MaterialCommunityIcons name="barcode-scan" size={20} color="black" />  Attendance</Text>
        </TouchableOpacity>

            
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Device")}>
          <Text style={styles.btninner}> <Octicons name="device-mobile" size={20} color="black" />  My Device</Text>
        </TouchableOpacity>

      </View>

      {/* <Button title="Scan" onPress={() => navigation.navigate("Scan")} /> */}

    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"column",
    backgroundColor:"white"
  },
  box:{

  },
  btn:{
    backgroundColor:"yellow",
    padding:10,
    margin:10,
    width:"50%",
    alignSelf:"center",
    textAlign:"center"
    
  },
  btninner:{
    textAlign:"center",
    fontSize:17,
    fontWeight:"bold",
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
