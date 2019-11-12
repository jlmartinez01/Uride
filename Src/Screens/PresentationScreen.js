import React, {Component} from 'react';
import {Text, View,TextInput,Image,ImageBackground,Dimensions,AsyncStorage} from 'react-native';
import { Button } from 'react-native-elements';


export default class PresentationScreen extends Component {

  constructor(){
    super();
    this.state={

    }
  }
  
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
                  <ImageBackground source={require('../Images/fondo.jpg')} style={{ 
                    flex: 1, width:'100%', height: undefined, alignItems:'center',justifyContent:'center'}}>
                  <View style={{flex:.3,alignItems:'center',justifyContent:'center',marginBottom:50}}>
                      <Image source={require('../Images/Uride_logo.png')}style={{flex:1, height:200, width:200}} resizeMode="contain"/>
                  </View>
                  <View style={{flex:.3,alignItems:'center',justifyContent:'center',}}>
                        <View style={{margin:5,flex:1,flexDirection:'row'}}>
                        <Button
                              title={'Registrarse'}
                              rounded
                              titleStyle={{fontSize:14,color:'#fff'}}
                              buttonStyle={{
                                  borderRadius: 10,
                                  backgroundColor:'rgba(52, 52, 52, .9)' 
                                  
                              }}
                              containerStyle={{paddingHorizontal:5,paddingVertical:6, borderRadius:4,flex:.7}}
                              onPress={() => this.props.navigation.navigate('Register')}
                          />
                        </View>
                        <View style={{margin:5,flex:1,flexDirection:'row'}}>
                            <Button
                                  title={'Iniciar sesión'}
                                  rounded
                                  titleStyle={{fontSize:14,color:'#fff'}}
                                  buttonStyle={{
                                    borderRadius: 10,
                                    backgroundColor:'rgba(52, 52, 52, .9)' 
                                      
                                  }}
                                  containerStyle={{paddingHorizontal:5,paddingVertical:6, borderRadius:4,flex:.7}}
                                  onPress={() => this.props.navigation.navigate('Login')}
                              />
                        </View>
                  </View>
          </ImageBackground>
      </View>
      )
  }
}
