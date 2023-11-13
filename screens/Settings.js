import { StyleSheet, Text, View, Switch, TouchableOpacity,Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

export default function Settings({navigation}) {

  const [notifications,setNotifications] = useState(true);
  const [darkMode,setDarkMode] = useState(false);

  const toggleNotification = () => {setNotifications(previousState => !previousState)
    console.log("Notification logic");
  };
  const toggleDarkMode = () => setDarkMode(previousState => !previousState);

    return (
      <View style={styles.container}><LinearGradient
      // Background Linear Gradient
      colors={['#ACE1FF','#e0f4ff']}
      start={[0.3, 0]}
      end={[0.7,0.6]}
      style={styles.background}
    >
    
    
      <Text style={styles.lineText}>Preference</Text>
      <View style={styles.line}></View>

      <TouchableOpacity style={styles.option} activeOpacity={1} onPress={()=>{
        toggleNotification();
      }}>
        <Text style={styles.optionText}>Notifikacije</Text>
        <Switch
          trackColor={{false: '#b5b5b5', true: '#65C8FF'}}
          thumbColor={notifications ? '#e0f4ff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotification}
          value={notifications}
          style={styles.optionSwitch}
        />
      </TouchableOpacity>
      
      {//DARK MODE
        /* <TouchableOpacity style={styles.option} activeOpacity={1} onPress={()=>{
        toggleDarkMode();
      }}>
        <Text style={styles.optionText}>Taman rezim</Text>
        <Switch
          trackColor={{false: '#b5b5b5', true: '#65C8FF'}}
          thumbColor={notifications ? '#e0f4ff' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
          style={styles.optionSwitch}
        />
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.option} activeOpacity={1}
      onPress={()=> navigation.navigate('Login')}>
        <Text style={styles.optionText}>Promeni razred</Text>
        <Image
        style={{ width: 25, height: 25, marginRight:12 }}
        source={require('../images/dots-menu.png')}
        />
      </TouchableOpacity>
      
      <Text style={styles.lineText}>O Aplikaciji</Text>
      <View style={styles.line}></View>

      <TouchableOpacity style={styles.option} activeOpacity={1}>
        <Text style={styles.optionText}>O autorima</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} activeOpacity={1}>
        <Text style={styles.optionText}>O aplikaciji</Text>
      </TouchableOpacity>

    </LinearGradient>
      </View>
    );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      width: '100%',
      height: '100%',
      opacity: 0.95,
      padding:20,
    },
    option: {
      height: 70,
      width: '100%',

      flexDirection: 'row',
      alignItems:'center',
      padding: 20,

      backgroundColor: 'white',
      marginVertical: 10,
      borderRadius: 10,
      //borderColor: 'gray',
      //borderWidth: 1,

      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 2, height: 5 },
      shadowRadius: 1,
    },
    optionText:{
      fontSize: 17,
      flex:1,
    },
    optionSwitch: {
      flex:1,
      transform:[{ scaleX: 1.2}, { scaleY: 1.2 }],
      marginRight: 10,
    },
    line: {
      width: '100%',
      backgroundColor: 'gray',
      height: 1,
    },
    lineText: {
      marginTop: 10,
      marginBottom: 3,
    }
  });