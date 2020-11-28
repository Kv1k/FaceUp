import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({navigation}) {
  return (
    <ImageBackground source={require('../images/home.jpg')} style={styles.container}>
        <Input
        inputStyle= {{marginLeft:2 }}
        containerStyle={ { width: '70%', color:'black'} }
        type='solid'
         placeholder='Kamil'
        leftIcon={
            <Icon
            name='user'
            size={24}
            color='#009788'
            />
        }
/>

      <Button title="Go to gallery"
        buttonStyle= {styles.buttonStyle}
        
        onPress={() => navigation.navigate('Menu')}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle:{
      backgroundColor:'#009788'
  }
});
