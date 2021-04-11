import React, { useState, useEffect } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import io from "socket.io-client";

export default function App() {
  const [text, onChangeText] = useState("hello world");
  console.log('hello world')
  useEffect(() => {
    const socketClient = io("https://deliverytracker.herokuapp.com/");
    socketClient.on("connect", () => {
      socketClient.emit("new-user", {
        id: 4545,
        store: "psq2",
        role: "driver",
      });
    });
    return () => {
      socketClient.close();
    };
  });
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={styles.loginScreenButton}
        onPress={() => Alert.alert(`${text}`)}
        underlayColor="#fff"
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 100,
    height: 40,
    margin: 12,
    borderWidth: 1,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  loginScreenButton: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#1E6738",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
