import React, {Component} from 'react';
import {StyleSheet,Text, View,AsyncStorage,Alert,ImageBackground,Dimensions,TouchableOpacity,ScrollView} from 'react-native';
import { Button } from 'react-native-elements';
import Icon3 from 'react-native-vector-icons/Entypo'
import * as firebase from 'firebase'

const itemUser =[
  {label: 'Pasajero', value: 'pasajero'},
  {label: 'Conductor', value: 'conductor'},
]


export default class VerViajeScreen extends Component {

  constructor(props){
    super(props);
    this.state=this.props.navigation.getParam('state')
    this.state.viaje_solicitado=false
    this.usu_id=''
    this.usu_i_rol=''
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
      this.usu_id_rol= parsed.usu_id_rol

      firebase.database().ref('solicitudes_viaje').on('value', (snapshot)=>{
        if(snapshot.val()!=null)
        {
          firebase.database().ref('solicitudes_viaje/'+this.state.usu_id_ride+'/'+this.usu_id).on('value', (snap)=>{
            if(snap.val()!=null)
            {
              this.setState({
                viaje_solicitado:true
              })
            }
          })
        }
      })


    } catch (error) {
      // Error retrieving data
      console.warn(error);
    }

  }

  

  _hacerSolicitud(){

    firebase.database().ref('solicitudes_viaje').once('value', (snapshot)=>{
      if(snapshot.val()==null)
      {
        firebase.database().ref('solicitudes_viaje/'+this.state.usu_id_ride).set({
          [this.usu_id]:true
        })
      }
      else{
        firebase.database().ref('solicitudes_viaje/'+this.state.usu_id_ride+'/'+this.usu_id).once('value', (snap)=>{
          if(snap.val()==null)
          {
            firebase.database().ref('solicitudes_viaje/'+this.state.usu_id_ride).update({
              [this.usu_id]:true
            })
          }
          else
          {
            firebase.database().ref('solicitudes_viaje/'+this.state.usu_id_ride+'/'+this.usu_id).remove()
            this.setState({
              viaje_solicitado:false
            })

            firebase.database().ref('pasajeros_viaje/').on('value', (snapshot2)=>{
              if(snapshot2.val()!=null)
              {
                firebase.database().ref('pasajeros_viaje/'+this.state.usu_id_ride+'/'+this.usu_id).on('value', (snap2)=>{
                  if(snap2.val()!=null)
                  {
                    firebase.database().ref('pasajeros_viaje/'+this.state.usu_id_ride+'/'+this.usu_id).remove()
                  }
                })
              }
            })

            firebase.database().ref('users/'+this.usu_id).update({
              usu_id_ride:''
            })
          }
        })
      }
    })
  }

  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{padding:20,justifyContent:'center',alignItems:'center'}}>
            <View style={{padding:20,justifyContent:'center',alignItems:'center'}}>
                <View>
                    <Icon3 name='user' size={100} color='gray'/>
                </View>
            </View>
            <Text style={{color:'gray',marginBottom:3}}>{'Conductor'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_nombre+" "+this.state.usu_apellidos}</Text>
            <Text style={{color:'gray',marginBottom:3}}>{'Matrícula'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_matricula}</Text>
            <Text style={{color:'gray',marginBottom:3}}>{'Punto de encuentro'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_punto_encuentro}</Text>
            <Text style={{color:'gray',marginBottom:3}}>{'Destino'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_destino}</Text>
            <Text style={{color:'gray',marginBottom:3}}>{'Vehículo'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_auto}</Text>
            <Text style={{color:'gray',marginBottom:3}}>{'Color'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_color_auto}</Text>
            <Text style={{color:'gray',marginBottom:3}}>{'Hora de salida'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_hora}</Text>
            <View style={{flexDirection:'row',justifyContent:'center',marginTop:5}}>
                          <Button
                              title={this.state.viaje_solicitado==true?'Cancelar solicitud':'Solicitar ride'}
                              rounded
                              titleStyle={{fontSize:14,color:'#fff'}}
                              buttonStyle={{
                                  borderRadius: 10,
                                  backgroundColor:'#F64648'
                                  
                              }}
                              containerStyle={{paddingHorizontal:5,paddingVertical:6, borderRadius:4,flex:.7}}
                              onPress={() => {
                                this._hacerSolicitud()
                              }}
                          />
            </View>
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