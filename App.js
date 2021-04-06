import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  const [text, onChangeText] = useState("Useless Text");

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
      <TouchableOpacity>
        <Text>hello world</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    position: "absolute",
    bottom: 60,
  },
});
