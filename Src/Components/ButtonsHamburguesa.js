import React, { Component } from 'react';
import { TouchableOpacity, Platform, Share, View, SafeAreaView, Button, Text, Alert, AsyncStorage, Image, Dimensions, StyleSheet, StatusBar } from 'react-native';
import { withNavigation, NavigationEvents } from 'react-navigation'

class ButtonsHamburguesa extends Component {



  constructor(props) {
    super(props)
    this.state = {
    }
    this.usu_id=''
    this.usu_id_rol=''
  }

  clearData = async () => {
    try {
      AsyncStorage.removeItem('usu_informacion')
    } catch (error) {
      // Error retrieving data
      console.warn(error);
    }

  }

  componentDidMount() {
    this.loadInformation()
  }

  loadInformation = async () => {
    this.setState({
      isloading: true
    })
    try {
      let usu_informacion = await AsyncStorage.getItem('usu_informacion')
      let parsed = JSON.parse(usu_informacion)
      this.usu_id = parsed.usu_id;
      this.usu_id_rol = parsed.usu_id_rol


    } catch (error) {
      // Error retrieving data
      console.warn(error);
    }

  }
  

  render() {

    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('EditInformation')}>
      <View style={{justifyContent:'flex-end',padding:15}}>
        <Text style={{color:'black'}}>{'Editar información de perfil'}</Text>
      </View>
      </TouchableOpacity>
      {
        this.usu_id_rol==2
        ?
        <TouchableOpacity onPress={() => this.props.navigation.navigate('EditRideInformation')}>
        <View style={{justifyContent:'flex-end',padding:15}}>
          <Text style={{color:'black'}}>{'Editar información de ride'}</Text>
        </View>
        </TouchableOpacity>
        :
        <View/>
      }
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Help')}>
      <View style={{justifyContent:'flex-end',padding:15}}>
        <Text style={{color:'black'}}>{'Ayuda'}</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
         this.clearData()
        this.props.navigation.navigate('Presentation')
        }}>
      <View style={{justifyContent:'flex-end',padding:15}}>
        <Text style={{color:'black'}}>{'Cerrar sesión'}</Text>
      </View>
      </TouchableOpacity>
    </SafeAreaView>
      </View>
    )
  }
}



export default withNavigation(ButtonsHamburguesa);