import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View} from 'react-native';

const Stack = createNativeStackNavigator();

import UserList from './screens/Home';
import UserRegister from './screens/Register';

function MyStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={UserList} />
      <Stack.Screen name="Register" component={UserRegister} />
    </Stack.Navigator> 
  )     
}

 export default function App() {
   return (
     <NavigationContainer>
        <MyStack/>
     </NavigationContainer>
   );
 }

 const styles = StyleSheet.create({
   container:{
     flex: 1,
     backgroundColor: '#101B36',
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
 
 