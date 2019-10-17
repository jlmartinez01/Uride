import React, {Component} from 'react';
import {Text, View,TextInput,Image,ImageBackground,Dimensions,TouchableOpacity,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Fumi } from 'react-native-textinput-effects';
import * as Progress from 'react-native-progress';
import Display from 'react-native-display';
import {strings} from '../Values/Strings'



export default class HomeScreen extends Component {

  constructor(){
    super();
    this.state={

    }
  }
  
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <ScrollView>
          <View style={{padding:30,alignItems:'center'}}>
                  <Display enable={this.state.isloading} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                          <Progress.Circle size={30} indeterminate={true} animated={true} color='#F64648'/>
                  </Display>
                  <View style={{flex:.5,justifyContent:'center',alignItems:'center',marginBottom:30}}>
                      <Image source={require('../Images/Uride_logo.png')}style={{flex:1, height:200, width:200}} resizeMode="contain"/>
                  </View>
          </View>
        </ScrollView>
      </View>
      )
  }
}
