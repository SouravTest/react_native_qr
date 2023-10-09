import { StyleSheet, Text, View, Button, SafeAreaView,TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <View style={styles.box}>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Show")}>
        <Text style={styles.btninner}> <AntDesign name="qrcode" size={24} color="black" /> Show</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Create")}>
        <Text style={styles.btninner}> <MaterialCommunityIcons name="qrcode-plus" size={24} color="black" /> Create</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Scan")}>
        <Text style={styles.btninner}> <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" /> Scan</Text>
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
    flexDirection:"column"
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
    fontSize:16,
    fontWeight:"bold",
  }
});
