import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import messaging from "@react-native-firebase/messaging";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import firestore from "@react-native-firebase/firestore";
import { option } from "./LoginScreen";

// Add a new subscription to a user's document

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const [obavestenjaArray, setObavestenja] = useState([]);
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
      //ovde treba kod za siri prikaz notifikacije
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
        }
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {});

    return unsubscribe;
  }, []);

  //dobijanje obavestenja
  useEffect(() => {
    const temp = collection(db, "Obavestenja");
    const obavestenjaRef = query(temp, orderBy("date", "desc"));
    const subscriber = onSnapshot(obavestenjaRef, {
      next: (snapshot) => {
        const obavestenja = [];
        snapshot.docs.forEach((doc) => {
          obavestenja.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setObavestenja(obavestenja);
      },
    });
    return () => subscriber();
  }, []);

  //prikazivanje obavestenja
  let date = new Timestamp();
  const renderObavestenje = ({ item }) => {
    let dateNew;
    if (item.razred == option) {
      dateNew = item.date;
      if (dateNew.toDate().toDateString() === date.toDate().toDateString()) {
        return (
          <View style={styles.obavestenje}>
            <Text style={styles.obavestenjeTitle}>{item.title}</Text>
            <Text style={styles.obavestenjeBody}>{item.body}</Text>
          </View>
        );
      } else {
        date = dateNew;
        return (
          <View>
            <View style={styles.datum}>
              <Text style={styles.datumText}>
                {dateNew.toDate().toDateString()}
              </Text>
            </View>
            <View style={styles.obavestenje}>
              <Text style={styles.obavestenjeTitle}>{item.title}</Text>
              <Text style={styles.obavestenjeBody}>{item.body}</Text>
            </View>
          </View>
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["red", "white"]}
        start={[0.2, 0.2]}
        end={[0.7, 0.6]}
        style={styles.background}
      >
        <Text style={styles.Header}>Obaveštenja</Text>
        {obavestenjaArray.length > 0 && (
          <View style={styles.list}>
            <FlatList
              style={styles.flatList}
              data={obavestenjaArray.sort()}
              renderItem={renderObavestenje}
              keyExtractor={(obavestenje) => obavestenje.id}
            />
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  Header: {
    fontSize: 25,
    marginBottom: 10,
    color: "white",
  },
  list: {
    paddingTop: 10,
    flex: 1,
    alignItems: "center",
    width: "80%",
    borderTopWidth: 1,
    borderTopColor: "white",
  },
  background: {
    width: "100%",
    height: "100%",
    paddingTop: 30,
    opacity: 0.95,
    alignItems: "center",
  },
  flatList: {
    width: screenWidth,
  },
  obavestenje: {
    height: 100,
    width: "90%",
    marginVertical: 10,
    marginLeft: screenWidth * 0.05,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    shadowColor: "gray",
  },
  obavestenjeTitle: {
    fontSize: 20,
  },
  obavestenjeBody: {
    flexShrink: 1,
  },
  datum: {
    marginTop: 30,
    marginLeft: screenWidth * 0.06,
  },
  datumText: {
    color: "#646464",
    fontSize: 14,
  },
});

//Set a topic for an account
// const subscribeToTopic = async (topic) => {
//   try {
//     await messaging().subscribeToTopic(topic);
//     console.log(`Subscribed to ${topic}`);
//   } catch (error) {
//     console.error(`Error subscribing to ${topic}:`, error);
//   }
// };
// subscribeToTopic("school");
// subscribeToTopic("4ITS");
