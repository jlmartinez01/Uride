import React, {Component} from 'react';
import {Text, View,Alert,Image,ImageBackground,Dimensions,TouchableOpacity,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Fumi } from 'react-native-textinput-effects';
import * as Progress from 'react-native-progress';
import Display from 'react-native-display';
import * as firebase from 'firebase'


export default class RecoveryPasswordScreen extends Component {

  constructor(){
    super();
    this.state={
      usu_correo:''

    }
  }


  forgotPassword = (email) => {
    firebase.auth().sendPasswordResetEmail(email)
      .then((message)=>{
        setTimeout(() => {
        Alert.alert(
          'Por favor verifica tu correo electrónico',
          '',
          [
              { text: 'Aceptar',style:'cancel'},
          ],
          { cancelable: true }
        )},100)
        this.props.navigation.navigate('Login')
      })
      .catch((error)=>{
        setTimeout(() => {
          Alert.alert(
            error.message,
            '',
            [
                { text: 'Aceptar',style:'cancel'},
            ],
            { cancelable: true }
          )},100)
      })
  }
  
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <ImageBackground source={require('../Images/fondo.jpg')} style={{ flex: 1,}}>
        <ScrollView>
          <View style={{padding:30}}>
                  <View style={{flex:.5,justifyContent:'center',alignItems:'center',marginBottom:30}}>
                      <Image source={require('../Images/Uride_logo.png')}style={{flex:1, height:200, width:200}} resizeMode="contain"/>
                  </View>
                  <View style={{marginVertical:10}}>
                          <Fumi
                            label={'Correo institucional'}
                            labelStyle={{color:'#fff'}}
                            iconClass={FontAwesomeIcon}
                            iconName={'university'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                            onChangeText={(text)=>{
                              this.setState({
                                usu_correo:text
                              })
                            }}
                          />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',marginTop:70}}>
                                <Button
                                    title={'Hecho'}
                                    rounded
                                    titleStyle={{fontSize:14,color:'#fff'}}
                                    buttonStyle={{
                                        borderRadius: 10,
                                        backgroundColor:'#F64648'
                                        
                                    }}
                                    containerStyle={{paddingHorizontal:5,paddingVertical:6, borderRadius:4,flex:.7}}
                                    onPress={() => this.forgotPassword(this.state.usu_correo)}
                                />
                  </View>
          </View>
        </ScrollView>
        </ImageBackground>
      </View>
      )
  }
}
