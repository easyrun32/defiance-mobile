import React , { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LocationAuthorization from "./components/LocationAuthorization";
import Map from "./components/Map";

export default function App() {

  const [ displayMap, setDisplayMap ] = useState(true);

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      {displayMap ? <Map/> : <Text>Can't work without authorizaion</Text>}
      <TouchableOpacity style={styles.button} onPress={()=>startApp()}>
        <Text>START APP</Text>
      </TouchableOpacity>
    </View>
  );

  function startApp() {
    LocationAuthorization()
    .then(permission => setDisplayMap(permission))
    .catch(() => console.log("can't start without location permissions, activate manually"))
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    position: "absolute",
    bottom: 60
  }
});
