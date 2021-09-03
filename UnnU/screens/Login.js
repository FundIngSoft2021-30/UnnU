import React, {useState} from 'react';
import { View, Text, TextInput, ScrollView, Button, StyleSheet, ImageBackgroundBase } from 'react-native';

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

    
    if (state.name === '' || state.email === '' || state.phone === ''){ alert('Please Provide a Information'), console.log(state)}
   
    else{
      alert('User Create Susesfully'),
      console.log(state)
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
    padding: 35,
    backgroundColor: '#D8E3E7',
  },

  inputGruop:{
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
    
  }
})

export default Login