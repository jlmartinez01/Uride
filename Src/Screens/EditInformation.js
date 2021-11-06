import React, {Component} from 'react';
import {StyleSheet,Text, View,Alert,Image,ImageBackground,AsyncStorage,Platform,ScrollView} from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const itemUser =[
  {label: 'Pasajero', value: 'pasajero'},
  {label: 'Conductor', value: 'conductor'},
]


export default class EditInformation extends Component {

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
      usu_auto_asientos:""

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
      this.setState({
        usu_id: parsed.usu_id,
        usu_id_rol: parsed.usu_id_rol
      })

      firebase.database().ref('users/'+parsed.usu_id).on('value', (res) => {
        this.setState({
          isloading:false,
          usu_nombre:res.val().usu_nombre,
          usu_apellidos:res.val().usu_apellidos,
          usu_imagen:res.val().usu_imagen,
          isloading:false,
          typeUser:parsed.usu_id_rol==1?'Pasajero':'Conductor'
        })
    
        })

      

    } catch (error) {
      // Error retrieving data
      console.warn(error);
    }

  }

  

  _updateConductor(){
    if(this.state.usu_nombre!=""&&
        this.state.usu_apellidos!="")
    {
      this.setState({
        isloading:true
      })
        firebase.database().ref('users/'+this.state.usu_id).update({
          usu_nombre:this.state.usu_nombre,
          usu_apellidos:this.state.usu_apellidos,
          usu_imagen:this.state.usu_imagen,
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


  _updatePasajero(){
    if(this.state.usu_nombre!=""&&
        this.state.usu_apellidos!="")
    {
    this.setState({
      isloading:true
    })
              firebase.database().ref('users/'+this.state.usu_id).update({
              usu_nombre:this.state.usu_nombre,
              usu_apellidos:this.state.usu_apellidos,
              usu_imagen:this.state.usu_imagen,
              })
              .then((message)=>{

                    this.setState({
                      isloading:false
                    })
                    this.refs.toast.show('Información actualizada',DURATION.LENGTH_LONG);
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
          extraHeight={Platform.select({ android: 200 })}>
        <View style={{padding:30}}>
                  <View style={{height:100, width:100,marginBottom:20}}>
                    {
                      this.state.usu_imagen!=""
                      ?
                      <Image source={{uri:this.state.usu_imagen}} style={{flex:1, height: undefined, width: undefined}}/>
                      :
                      <View/>
                    }
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
                            value={this.state.usu_nombre}
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
                            value={this.state.usu_apellidos}
                          />
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
                                      if(this.state.typeUser=='pasajero'){
                                        this._updatePasajero()
                                        }
                                        else{
                                          this._updateConductor()
                                        }
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