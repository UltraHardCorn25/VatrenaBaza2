import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, Button } from "react-native";
import React, { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import { auth } from "./firebase";

export default function App() {
  auth
    .signInWithEmailAndPassword("buljovcicdario@gmail.com", "qwerty")
    .then((userCredentials) => {
      const user = userCredentials.user;
      console.log("Logged in with: " + user.email);
    })
    .catch((error) => alert(error.message));
  const [message, setMessage] = useState("");
  //request premission from the user to send notifications
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };

  //Get and show notifications
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
        });
    } else {
      console.log("Failed token status", authStatus);
    }

    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      setMessage(remoteMessage.notification.body);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          setMessage(remoteMessage.notification.body);
        }
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      setMessage(remoteMessage.notification.body);
    });

    return unsubscribe;
  }, []);

  //Set a topic for an account
  const subscribeToTopic = async (topic) => {
    try {
      await messaging().subscribeToTopic(topic);
      console.log(`Subscribed to ${topic}`);
    } catch (error) {
      console.error(`Error subscribing to ${topic}:`, error);
    }
  };
  subscribeToTopic("school");
  subscribeToTopic("4ITS");
  return (
    <View style={styles.container}>
      <Button title="Klikni" />
      <Text>Message: {message}</Text>
      <StatusBar style="auto" />
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
});
