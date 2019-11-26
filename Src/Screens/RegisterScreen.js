import React, {Component} from 'react';
import {StyleSheet,Text, View,ActivityIndicator,Image,ImageBackground,Dimensions,TouchableOpacity,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {  Fumi } from 'react-native-textinput-effects';
import * as Progress from 'react-native-progress';
import Display from 'react-native-display';
import { CustomPicker } from 'react-native-custom-picker'
import * as firebase from 'firebase'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast'


const itemUser =[
  {label: 'Pasajero', value: 'pasajero'},
  {label: 'Conductor', value: 'conductor'},
]


export default class RegisterScreen extends Component {

  constructor(){
    super();
    this.state={
      isloading:false,
      typeUser:'pasajero',
      enablePassengerText:true,
      enableDriverText:false,


      usu_id:'',
      usu_id_rol:'',

      usu_nombre:"",
      usu_apellidos:"",
      usu_correo:"",
      usu_contrasena:"",
      usu_imagen:"",
      usu_destino:"",
      usu_hora:"",
      usu_id_viaje:"",
      usu_punto_encuentro:"",
      usu_auto:"",
      usu_color_auto:"",
      usu_auto_asientos:""

    }
  }

  DisplayViews = (value) => 
  {
    this.setState({
      typeUser:value
    })
    if(value=='pasajero')
    {
      this.setState({
        enablePassengerText:true,
        enableDriverText:false,
      })
    }
    if(value=='conductor')
    {
      this.setState({
        enablePassengerText:false,
        enableDriverText:true,
      })
    }
  }

  _registerConductor(){
    
    if(this.state.usu_nombre!=""&&
        this.state.usu_apellidos!=""&&
        this.state.usu_correo!=""&&
        this.state.usu_contrasena!=""&&
        this.state.usu_destino!=""&&
        this.state.usu_hora!=""&&
        this.state.usu_punto_encuentro!=""&&
        this.state.usu_auto!=""&&
        this.state.usu_color_auto!=""&&
        this.state.usu_auto_asientos!="")
    {
        this.setState({
          isloading:true
        })
          firebase.auth().createUserWithEmailAndPassword(this.state.usu_correo,this.state.usu_contrasena)
          .then((message)=>{
            firebase.database().ref('users/'+message.user.uid).set({
              usu_nombre:this.state.usu_nombre,
              usu_id_rol:2,
              usu_apellidos:this.state.usu_apellidos,
              usu_correo:this.state.usu_correo,
              usu_imagen:this.state.usu_imagen,
              usu_destino:this.state.usu_destino,
              usu_hora:this.state.usu_hora,
              usu_id_viaje:this.state.usu_id_viaje,
              usu_punto_encuentro:this.state.usu_punto_encuentro,
              usu_auto:this.state.usu_auto,
              usu_color_auto:this.state.usu_color_auto,
              usu_auto_asientos:this.state.usu_auto_asientos,
              })
              this.setState({
                isloading:false
              })
          })
          .catch((error)=>{
            this.refs.toast.show(error.message,DURATION.LENGTH_LONG);
            this.setState({
              isloading:false
            })
          })
    }else
    {
      this.refs.toast.show('Los campos no pueden quedar vacíos',DURATION.LENGTH_LONG);
    }
    
  }


  _registerPasajero(){
    
    if(this.state.usu_nombre!=""&&
        this.state.usu_apellidos!=""&&
        this.state.usu_correo!=""&&
        this.state.usu_contrasena!="")
    {
        this.setState({
          isloading:true
        })
          firebase.auth().createUserWithEmailAndPassword(this.state.usu_correo,this.state.usu_contrasena)
          .then((message)=>{
            firebase.database().ref('users/'+message.user.uid).set({
              usu_nombre:this.state.usu_nombre,
              usu_id_rol:1,
              usu_apellidos:this.state.usu_apellidos,
              usu_correo:this.state.usu_correo,
              usu_imagen:this.state.usu_imagen,
              usu_destino:this.state.usu_destino,
              usu_hora:this.state.usu_hora,
              usu_id_viaje:this.state.usu_id_viaje,
              usu_punto_encuentro:this.state.usu_punto_encuentro,
              usu_auto:this.state.usu_auto,
              usu_color_auto:this.state.usu_color_auto,
              usu_auto_asientos:this.state.usu_auto_asientos,
              })
              this.setState({
                isloading:false
              })

              this.props.navigation.navigate('App')
          })
          .catch((error)=>{
            this.refs.toast.show(error.message,DURATION.LENGTH_LONG);
            this.setState({
              isloading:false
            })
          })
    }else
    {
      this.refs.toast.show('Los campos no pueden quedar vacíos',DURATION.LENGTH_LONG);
    }
    
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
                <View style={{flex:.3,justifyContent:'center',alignItems:'center',marginBottom:30}}>
                    <Image source={require('../Images/Uride_logo.png')}style={{flex:1, height:100, width:100}} resizeMode="contain"/>
                </View>
                <View style={{marginVertical:10}}>
                                    <Text style={{color:'gray'}}>Tipo de usuario</Text>
                                    <CustomPicker
                                      defaultValue={itemUser[0]}
                                      options={itemUser}
                                      getLabel={item => item.label}
                                      fieldTemplate={this.renderFieldUser}
                                      optionTemplate={this.renderOption}
                                      onValueChange={value => {
                                        this.DisplayViews(value.value)
                                      }}
                                    />
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
                  <View style={{marginVertical:10}}>
                          <Fumi
                            label={'Nombre'}
                            labelStyle={{color:'#fff'}}
                            iconClass={FontAwesomeIcon}
                            iconName={'user'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                            onChangeText={(text)=>{
                              this.setState({
                                usu_nombre:text
                              })
                            }}
                          />
                  </View>
                  <View style={{marginVertical:10}}>
                          <Fumi
                            label={'Apellidos'}
                            labelStyle={{color:'#fff'}}
                            iconClass={FontAwesomeIcon}
                            iconName={'user'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                            onChangeText={(text)=>{
                              this.setState({
                                usu_apellidos:text
                              })
                            }}
                          />
                  </View>
                  {
                  this.state.enableDriverText
                  ?
                  <View>
                        <View style={{marginVertical:10}}>
                                <Fumi
                                  label={'Automóvil'}
                                  labelStyle={{color:'#fff'}}
                                  iconClass={MaterialCommunityIcons}
                                  iconName={'car'}
                                  iconColor={'#fff'}
                                  iconSize={20}
                                  iconWidth={40}
                                  inputPadding={16}
                                  style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                                  onChangeText={(text)=>{
                                    this.setState({
                                      usu_auto:text
                                    })
                                  }}
                                />
                        </View>
                        <View style={{marginVertical:10}}>
                                <Fumi
                                  label={'Color de automóvil'}
                                  labelStyle={{color:'#fff'}}
                                  iconClass={MaterialIcons}
                                  iconName={'color-lens'}
                                  iconColor={'#fff'}
                                  iconSize={20}
                                  iconWidth={40}
                                  inputPadding={16}
                                  style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                                  onChangeText={(text)=>{
                                    this.setState({
                                      usu_color_auto:text
                                    })
                                  }}
                                />
                        </View>
                        <View style={{marginVertical:10}}>
                                <Fumi
                                  label={'Hora de salida'}
                                  labelStyle={{color:'#fff'}}
                                  iconClass={MaterialCommunityIcons}
                                  iconName={'clock'}
                                  iconColor={'#fff'}
                                  iconSize={20}
                                  iconWidth={40}
                                  inputPadding={16}
                                  style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                                  onChangeText={(text)=>{
                                    this.setState({
                                      usu_hora:text
                                    })
                                  }}
                                />
                        </View>
                        <View style={{marginVertical:10}}>
                                <Fumi
                                  label={'Número de asientos'}
                                  labelStyle={{color:'#fff'}}
                                  iconClass={MaterialCommunityIcons}
                                  iconName={'seat-recline-extra'}
                                  iconColor={'#fff'}
                                  iconSize={20}
                                  iconWidth={40}
                                  inputPadding={16}
                                  style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                                  onChangeText={(text)=>{
                                    this.setState({
                                      usu_auto_asientos:text
                                    })
                                  }}
                                />
                        </View>
                  </View>
                  :
                  <View/>
                  }
                  <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
                                <Button
                                    title={'Registrarse'}
                                    rounded
                                    titleStyle={{fontSize:14,color:'#fff'}}
                                    buttonStyle={{
                                        borderRadius: 10,
                                        backgroundColor:'#F64648'
                                        
                                    }}
                                    containerStyle={{paddingHorizontal:5,paddingVertical:6, borderRadius:4,flex:.7}}
                                    onPress={() =>{ 
                                      if(this.state.typeUser=='pasajero'){
                                      this._registerPasajero()
                                      }
                                      else{
                                        this._registerConductor()
                                      }
                                    }}
                                />
                  </View>
        </View>
      </ScrollView>
      </ImageBackground>
    </View>
      )
  }


  renderFieldUser(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings
    return (
      <View style={styles.container_type_user}>
        <View>
          {!selectedItem && <Text style={[styles.text, { color: 'grey' }]}>{defaultText}</Text>}
          {selectedItem && (
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row'}}>
                <View style={{marginLeft:5}}>
                  <Text style={{color:'white',}}>
                    {getLabel(selectedItem)}
                  </Text>
                </View>
              </View>
              <View>
                  <Icon2 size={25} color='white' name='keyboard-arrow-down'/>
              </View>
                
            </View>
          )}
        </View>
      </View>
    )
  }

  renderOption(settings) {
    const { item, getLabel } = settings
    return (
      <View style={{
        backgroundColor:'#1985DF',
        padding:10,borderWidth:1,
        borderBottomColor:'white',
        borderLeftColor:'transparent',
        borderRightColor:'transparent',
        borderTopColor:'transparent',}}>
        <View style={{padding:10}}>
          <Text style={{ color: '#fff', alignSelf: 'flex-start',}}>{getLabel(item)}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container_type_user: {
    flex: 1,
    borderWidth:1,
    borderLeftColor:'transparent',
    borderRightColor:'transparent',
    borderTopColor:'transparent',
    borderBottomColor:'white',
    justifyContent:'flex-start',
    padding:15,
    backgroundColor:'rgba(52, 52, 52, .9)'
  },
  container: {
    flex: 1,
    borderWidth:1,
    paddingVertical:6,
    borderLeftColor:'transparent',
    borderRightColor:'transparent',
    borderTopColor:'transparent',
    borderBottomColor:'#7f7f7f',
    justifyContent:'flex-start',
  },
});