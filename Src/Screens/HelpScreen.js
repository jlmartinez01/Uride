import React, {Component} from 'react';
import {Text, View,TextInput,Image,ImageBackground,Dimensions,TouchableOpacity,ScrollView, FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Fumi } from 'react-native-textinput-effects';
import * as Progress from 'react-native-progress';
import Display from 'react-native-display';
import RideBox from '../Components/RideBox'
import { PinchGestureHandler } from 'react-native-gesture-handler';



export default class HelpScreen extends Component {

  constructor(){
    super();
    this.state={
    
    }

  }
  
  render() {

    return (
      <View style={{flex:1}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center',alignContent:'center',marginVertical:10}}>
                        <Text style={{fontWeight: 'bold', fontSize:30}}>{'Email de Contacto'}</Text>
                        <Text style={{fontSize:30}}> {'ayuda@uride.com'} </Text>
                        <Text>{' '}</Text>
                        <Text style={{fontWeight: 'bold', fontSize:30}}>{'Derechos Reservados'}</Text>
                    </View>
                
      </View>
      )
  }
}
