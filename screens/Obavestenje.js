import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Color';

export default function Obavestenje({route}) {

  const navigation=useNavigation();
  navigation.setOptions({ title: route.params.title })

    return (
      <View style={styles.container}>
        <LinearGradient
        // Background Linear Gradient
        colors={[Colors.primary,Colors.secondary]}
        start={[0.3, 0]}
        end={[0.7,0.6]}
        style={styles.background}
        >
        <View style={styles.infoContainer}>
          <Text style={styles.class}>{route.params.class}</Text>
          <Text style={styles.date}>{route.params.date}</Text>
        </View>
          
          <Text style={styles.body}>{route.params.body}</Text>

        </LinearGradient>
      </View>
    );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    background: {
      width: '100%',
      height: '100%',
      opacity: 0.95,
      padding: 20,
    },
    body: {
      marginTop:10,
      flex:15,
      fontSize: 18,
      color:Colors.textPrimary,
      paddingHorizontal:10,
    },
    infoContainer: {
      paddingHorizontal:10,
      paddingBottom:5,
      flexDirection:'row',
      borderColor: Colors.textPrimary,
      borderBottomWidth: 1.5,
    },
    date: {
      flex: 1,
      textAlign:'right',
      color:Colors.textPrimary,
    },
    class: {
      flex: 1,
      color:Colors.textPrimary,
    },
  });