import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert, AsyncStorage, Image, StatusBar } from 'react-native';
import * as firebase from 'firebase'
import { AppLoading } from 'expo';

class SplashScreen extends Component {

  performTimeConsumingTask = async () => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        2000
      )
    )
  }

  componentWillMount() {
    var firebaseConfig ={
        apiKey: "AIzaSyCJCohaofeLusv-AiTQEPek5fR99T9nMqI",
        authDomain: "uride-98526.firebaseapp.com",
        databaseURL: "https://uride-98526.firebaseio.com",
        projectId: "uride-98526",
        storageBucket: "uride-98526.appspot.com",
        messagingSenderId: "480399157228",
        appId: "1:480399157228:web:78cf0912c7983ee4d042c9",
        measurementId: "G-2TK27KYB55"
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }


  async componentDidMount() {

    const data = await this.performTimeConsumingTask();

    if (data !== null) {
      this.loadSesion()
    }
  }

  loadSesion = async () => {
    try {
      let usu_informacion = await AsyncStorage.getItem('usu_informacion')
      let parsed = JSON.parse(usu_informacion)
      let id = parsed.usu_id;
      let usu_id_rol_global = parsed.usu_id_rol_global

      
      if (id != '') {
        this.props.navigation.navigate('Home',{usu_id_rol_global:usu_id_rol_global})
      }

    } catch (error) {
      this.props.navigation.navigate('Auth')
    }

  }


  render() {
    return (
      <View style={styles.viewStyles}>
        <StatusBar barStyle='light-content'/>
        <View style={{ flex: .8 }}>
          <Image source={require('../Images/Uride_logo.png')} style={{ flex: 1, height: 200, width: 200 }} resizeMode="contain" />
        </View>
      </View>
    );
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
}

export default SplashScreen;