import React, {Component} from 'react';
import {StyleSheet,Text, View,Alert,Image,ImageBackground,AsyncStorage,Switch,Platform} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const itemUser =[
  {label: 'Pasajero', value: 'pasajero'},
  {label: 'Conductor', value: 'conductor'},
]


export default class EditRideInformation extends Component {

  constructor(){
    super();
    this.state={
      isloading:false,
      typeUser:'',
      enablePassengerText:false,
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
      usu_id_ride:"",
      usu_punto_encuentro:"",
      usu_auto:"",
      usu_color_auto:"",
      usu_auto_asientos:"",
      usu_matricula:'',
      usu_ride_activo:''

    }
  }


  componentDidMount()
  {
    this._loadUsuInformation()
  }

   
  _loadUsuInformation = async () => {
    this.setState({
      isloading:true
    })
    try {
      let usu_informacion = await AsyncStorage.getItem('usu_informacion')
      let parsed = JSON.parse(usu_informacion)
        this.usu_id= parsed.usu_id,
        this.usu_id_rol= parsed.usu_id_rol,
        this.usu_id_ride= parsed.usu_id_ride

      firebase.database().ref('rides/'+parsed.usu_id_ride).on('value', (res) => {
        this.setState({
          isloading:false,
          usu_destino:res.val().usu_destino,
          usu_hora:res.val().usu_hora,
          usu_punto_encuentro:res.val().usu_punto_encuentro,
          usu_auto:res.val().usu_auto,
          usu_color_auto:res.val().usu_color_auto,
          usu_auto_asientos:res.val().usu_auto_asientos,
          usu_matricula:res.val().usu_matricula,
          usu_ride_activo:res.val().usu_ride_activo,
          isloading:false,
          typeUser:parsed.usu_id_rol==1?'Pasajero':'Conductor'
        })
    
        })

      

    } catch (error) {
      // Error retrieving data
      console.warn(error);
    }

  }

  

  _updateRide(){
    if(
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
        firebase.database().ref('rides/'+this.usu_id_ride).update({
          usu_destino:this.state.usu_destino,
          usu_hora:this.state.usu_hora,
          usu_punto_encuentro:this.state.usu_punto_encuentro,
          usu_auto:this.state.usu_auto,
          usu_color_auto:this.state.usu_color_auto,
          usu_auto_asientos:this.state.usu_auto_asientos,
          usu_ride_activo:this.state.usu_ride_activo
          })
          .then((message)=>{
          this.setState({
            isloading:false
          })
          this.props.navigation.navigate('Home')

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
      <KeyboardAwareScrollView 
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 250 })}>
        <View style={{padding:30}}>
                  <View>
                        <View style={{padding:30,justifyContent:'center',alignItems:'center'}}>
                            <View>
                            {
                                this.state.usu_imagen!=""
                                ?
                                <View style={{height:100, width:100,marginBottom:20}}>
                                <Image source={{uri:this.state.usu_imagen}} style={{flex:1, height: undefined, width: undefined}}/>
                                </View>
                                :
                                <Icon3 name='user' size={100} color='gray'/>
                            }
                            </View>
                        </View>
                        <View style={{justifyContent:'space-between',marginHorizontal:25,flexDirection:'row',marginBottom:20}}>
                                        <View style={{flex:.7}}>
                                        <Text style={{marginBottom:10,color:'black'}}>Estatus de ride</Text>
                                        </View>
                                        <View style={{flex:.3}}>
                                            <Switch
                                                onValueChange = {()=>{
                                                this.setState({
                                                    usu_ride_activo:!this.state.usu_ride_activo
                                                })
                                                
                                                }}
                                                value = {this.state.usu_ride_activo}
                                                trackColor={{false: 'white', true:'#F64648'}}
                                                thumbColor='white'
                                                />
                                        </View>
                        </View>
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
                                  value={this.state.usu_auto}
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
                                  value={this.state.usu_color_auto}
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
                                  value={this.state.usu_hora}
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
                                  value={this.state.usu_auto_asientos}
                                />
                        </View>
                        <View style={{marginVertical:10}}>
                                <Fumi
                                  label={'Punto de encuentro'}
                                  labelStyle={{color:'#fff'}}
                                  iconClass={MaterialCommunityIcons}
                                  iconName={'map-marker'}
                                  iconColor={'#fff'}
                                  iconSize={20}
                                  iconWidth={40}
                                  inputPadding={16}
                                  style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                                  onChangeText={(text)=>{
                                    this.setState({
                                      usu_punto_encuentro:text
                                    })
                                  }}
                                  value={this.state.usu_punto_encuentro}
                                />
                        </View>
                        <View style={{marginVertical:10}}>
                                <Fumi
                                  label={'Destino'}
                                  labelStyle={{color:'#fff'}}
                                  iconClass={MaterialCommunityIcons}
                                  iconName={'pine-tree'}
                                  iconColor={'#fff'}
                                  iconSize={20}
                                  iconWidth={40}
                                  inputPadding={16}
                                  style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                                  onChangeText={(text)=>{
                                    this.setState({
                                      usu_destino:text
                                    })
                                  }}
                                  value={this.state.usu_destino}
                                />
                        </View>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
                                <Button
                                    title={'Guardar'}
                                    rounded
                                    titleStyle={{fontSize:14,color:'#fff'}}
                                    buttonStyle={{
                                        borderRadius: 10,
                                        backgroundColor:'#F64648'
                                        
                                    }}
                                    containerStyle={{paddingHorizontal:5,paddingVertical:6, borderRadius:4,flex:.7}}
                                    onPress={() =>{ 
                                          this._updateRide()
                                    }}
                                />
                  </View>
        </View>
      </KeyboardAwareScrollView>
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