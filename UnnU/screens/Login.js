import React, {useState} from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet } from 'react-native';
import firebase from '../dataBase/firebase';

const Login = () => {

  const [state, setState] = useState({
    name:'',
    email:'',
    phone:''
  })

  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  }

  const createNewUser = async() => {

    console.log(state)
    if (state.name === '' || state.email === '' || state.phone === ''){ alert('Please Provide a Information')}
   
    else{
      await firebase.db.collection('users').add({
          name: state.name,
          email: state.email,
          phone: state.phone
      })
      alert('User Create Susesfully')
   }
  }

    return(
      <ScrollView style={styles.containerGrup}>

        <View style={styles.inputGruop}>
          <TextInput placeholder = 'Name User'
            onChangeText = {(value => handleChangeText('name', value))}
            />
        </View>
        <View style={styles.inputGruop}>
          <TextInput placeholder = 'Email User' 
            onChangeText = {(value => handleChangeText('email', value))}
            />
        </View>
        <View style={styles.inputGruop}>
          <TextInput placeholder = 'Phone User'
            onChangeText = {(value => handleChangeText('phone', value))}
            />
        </View>

        <View style={styles.inputGruop}>
          <Button title = "Create User" onPress = {() => createNewUser()}/>
        </View>

      </ScrollView>
        
    )
}

const styles = StyleSheet.create({

  containerGrup:{
    flex: 1,
    padding: 35

  },

  inputGruop:{
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
    
  }
})

export default Login