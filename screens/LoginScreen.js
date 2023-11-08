import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase.js";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";

let option;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("4ITS");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleLogin = () => {
    option = selectedOption;
    subscribeToTopic(selectedOption);
    navigation.navigate("Home");
  };
  //Set a topic for an account
  const subscribeToTopic = async (topic) => {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`Subscribed to ${topic}`);
    } catch (error) {
      console.error(`Error subscribing to ${topic}:`, error);
    }
  };

  // subscribeToTopic("4ITS");
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Picker
          style={[styles.inputes, { marginVertical: 0 }]}
          selectedValue={selectedOption}
          onValueChange={handleOptionChange}
        >
          <Picker.Item label="4ITS" value="4ITS" />
          <Picker.Item label="3ITS" value="3ITS" />
          <Picker.Item label="2ITS" value="2ITS" />
          <Picker.Item label="1ITS" value="1ITS" />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
export { option };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'red',
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  inputes: {
    backgroundColor: "#0782F9",
    color: "white",
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginTop: 20,
    borderRadius: 20,
  },

  buttonOutlineText: { color: "#0782F9", fontWeight: "700", fontSize: 16 },
});
