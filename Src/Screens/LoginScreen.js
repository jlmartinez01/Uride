import React, {Component} from 'react';
import {Text, View,AsyncStorage,Image,ImageBackground,Alert,TouchableOpacity,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Fumi } from 'react-native-textinput-effects';
import * as Progress from 'react-native-progress';
import Display from 'react-native-display';
import * as firebase from 'firebase'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast'
import { withNavigationFocus } from 'react-navigation';

class LoginScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      isloading:false,
      usu_correo:'',
      usu_contrasena:''
    }
  }

  _login(){
    this.setState({
      isloading:true
    })
    firebase.auth().signInWithEmailAndPassword(this.state.usu_correo,this.state.usu_contrasena)
    .then((message)=>{
      
      firebase.database().ref('users/'+message.user.uid).on('value', (res) => {
        this.setState({
          isloading:false
        })
        let informacion={
          usu_id:message.user.uid,
          usu_id_rol:res.val().usu_id_rol
        }
        AsyncStorage.setItem('usu_informacion', JSON.stringify(informacion))

        console.warn(informacion.usu_id_rol)
        this.props.navigation.navigate('Home',{usu_id_rol_global:informacion.usu_id_rol})
      })
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
      this.setState({
        isloading:false
      })
    })
  }
  
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <Spinner
                visible={this.state.isloading}
                color='#F64648' />
        <Toast
                ref="toast"
                style={{backgroundColor:'black'}}
                position='bottom'
                positionValue={200}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{color:'white'}}
            />
        <ImageBackground source={require('../Images/fondo.jpg')} style={{ flex: 1,}}>
        <ScrollView>
          <View style={{padding:30}}>
                  <Display enable={this.state.isloading} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                          <Progress.Circle size={30} indeterminate={true} animated={true} color='#F64648'/>
                  </Display>
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
                   <View style={{marginVertical:10}}>
                          <Fumi
                            label={'Contraseña'}
                            labelStyle={{color:'#fff'}}
                            iconClass={MaterialCommunityIcons}
                            iconName={'security'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                            secureTextEntry={true}
                            onChangeText={(text)=>{
                              this.setState({
                                usu_contrasena:text
                              })
                            }}
                          />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
                                <Button
                                    title={'Iniciar sesión'}
                                    rounded
                                    titleStyle={{fontSize:14,color:'#fff'}}
                                    buttonStyle={{
                                        borderRadius: 10,
                                        backgroundColor:'#F64648'
                                        
                                    }}
                                    containerStyle={{paddingHorizontal:5,paddingVertical:6, borderRadius:4,flex:.7}}
                                    onPress={() => this._login()}
                                />
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',marginTop:20}}>
                        <TouchableOpacity style={{padding:10}} onPress={()=>{this.props.navigation.navigate('Recovery')}}>
                            <Text style={{color:'black'}}>{'¿Olvidaste tu contraseña?'}</Text>
                        </TouchableOpacity>
                  </View>
          </View>
        </ScrollView>
        </ImageBackground>
      </View>
      )
  }
}

export default withNavigationFocus(LoginScreen)
