import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Button, TouchableOpacity,Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Settings from './screens/Settings';
import Obavestenje from './screens/Obavestenje';
import About from './screens/About';
import Colors from './Color';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'horizontal'
        }}
        headerMode='float'
        animation='fade'
      >
        <Stack.Screen name='Login'
        component={LoginScreen} 
        options={{
            title: 'Odaberi razred',
            headerStyle: {
              backgroundColor: Colors.headerBG,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: 'uppercase',
            },
          }}
        />
        <Stack.Screen name='Main'
        component={HomeScreen} 
        options={({navigation})=>({
            headerBackVisible: false,
            title: 'Obavestenja',
            headerStyle: {
              backgroundColor: Colors.headerBG,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              marginLeft: 10,
              fontSize: 22,
              textTransform: 'uppercase',
            },
            headerRight: () => (
              <TouchableOpacity activeOpacity={0.8} 
              onPress={() => navigation.navigate('Settings')}>
                <Image
                  style={{ width: 25, height: 25, marginRight:15 }}
                  source={require('./images/cog-wheel.png')}
                />
              </TouchableOpacity>
            ),
        })}
        />
        <Stack.Screen name='Settings' 
        component={Settings} 
        options={{
            title: 'Settings',
            headerStyle: {
              backgroundColor: Colors.headerBG,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: 'uppercase',
            },
          }}
        />
        <Stack.Screen name='Obavestenje' 
        component={Obavestenje} 
        options={{
            title: 'Obavestenje',
            headerStyle: {
              backgroundColor: Colors.headerBG,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: 'uppercase',
            },
          }}
        />
        <Stack.Screen name='About'
        component={About} 
        options={{
            title: 'O aplikaciji',
            headerStyle: {
              backgroundColor: Colors.headerBG,
              height: 100,
            },
            headerTintColor: Colors.headerText,
            headerTitleStyle: {
              fontSize: 22,
              textTransform: 'uppercase',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
