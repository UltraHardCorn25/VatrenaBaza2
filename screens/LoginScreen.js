import {
  StyleSheet,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase.js';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Colors from '../Color.js';

let option;

const screenWidth = Dimensions.get('window').width;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('4ITS');

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const handleLogin = () => {
    option = selectedOption;
    subscribeToTopic(selectedOption);
    navigation.navigate('Main');
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

  // subscribeToTopic('4ITS');
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <LinearGradient
        // Background Linear Gradient
        colors={[Colors.primary, Colors.secondary]}
        start={[0.2, 0.2]}
        end={[0.7, 0.6]}
        style={styles.background}
      >
      <View>
        <Picker
          style={[styles.inputes, { marginVertical: 0 }]}
          selectedValue={selectedOption}
          onValueChange={handleOptionChange}
        >
          <Picker.Item label='4ITS' value='4ITS' />
          <Picker.Item label='3ITS' value='3ITS' />
          <Picker.Item label='2ITS' value='2ITS' />
          <Picker.Item label='1ITS' value='1ITS' />
        </Picker>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
export { option };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: screenWidth,
    opacity: 0.95,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: Colors.accent,
    width: '100%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.headerText,
    fontWeight: '700',
    fontSize: 16,
  },
  inputes: {
    backgroundColor: Colors.accent,
    color: Colors.headerText,
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginTop: 20,
    borderRadius: 20,
  },
});
