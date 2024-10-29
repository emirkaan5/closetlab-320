import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import Camera_Test from './Camera_Test.js';
import Home from './Home.js';
import {ClothingItemView, ClothingItemListView} from './ClothingAndOutfits.js';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './Stylesheet';
import axios from 'axios';
import { SafeAreaView } from 'react-native-web';
import { postItem } from './APIContainer.js';

const Stack = createNativeStackNavigator();

/*
Stack.Navigator is a registry of all tabs that exist. 
'Home' is first, so that's the home page.

Maybe we should generalize a function for creating tabs?
*/
//const cp = require('child_process');

// Run a Python script and return output
//function runPythonScript(scriptPath, args) {
//
//  // Use child_process.spawn method from 
//  // child_process module and assign it to variable
//  const pyProg = cp.spawn('python', [scriptPath].concat(args));
//
//  // Collect data from script and print to console
//  let data = '';
//  pyProg.stdout.on('data', (stdout) => {
//    data += stdout.toString();
//  });
//
//  // Print errors to console, if any
//  pyProg.stderr.on('data', (stderr) => {
//    console.log(`stderr: ${stderr}`);
//  });
//
//  // When script is finished, print collected data
//  pyProg.on('close', (code) => {
//    console.log(`child process exited with code ${code}`);
//    console.log(data);
//  });
//}

// Run the Python file


export default function App() {
  
  return (
    <NavigationContainer>
    
      <Stack.Navigator>

        <Stack.Screen
          name={'Home'}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Camera'}
          component={Camera_Test}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Clothing Item View'}
          component={ClothingItemListView}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
