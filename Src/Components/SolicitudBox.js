import React, {Component} from 'react';
import { Text, View, Alert, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import { withNavigationFocus } from 'react-navigation';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon3 from 'react-native-vector-icons/Entypo'
import * as firebase from 'firebase'

class SolicitudBox extends Component{

    constructor(props)
    {
        super(props)
        this.state={

              viaje_solicitado:false,
              usu_nombre:props.usu_nombre,
              usu_apellidos:props.usu_apellidos,
              usu_matricula:props.usu_matricula,
              usu_id:props.usu_id,
              usu_id_ride:props.usu_id_ride,
              usu_auto_asientos:props.usu_auto_asientos
        }
    }

    componentDidMount(){
        this._loadUsuInformation()
    }

    _loadUsuInformation(){
        this.setState({
          isloading:true
        })
          firebase.database().ref('pasajeros_viaje/').on('value', (snapshot)=>{
              
            if(snapshot.val()!=null)
            {
              firebase.database().ref('pasajeros_viaje/'+this.state.usu_id_ride+'/'+this.state.usu_id).on('value', (snap)=>{
                if(snap.val()!=null)
                {
                  this.setState({
                    viaje_solicitado:true
                  })
                }
              })
            }
          })
    
      }

    Aceptar_solicitud()
    {
      firebase.database().ref('pasajeros_viaje').once('value', (snapshot)=>{
        if(snapshot.val()==null)
        {
          firebase.database().ref('pasajeros_viaje/'+this.state.usu_id_ride).set({
            [this.state.usu_id]:true
          })
          firebase.database().ref('users/'+this.state.usu_id).update({
            usu_id_ride:this.state.usu_id_ride
            })
        }
        else{
          firebase.database().ref('pasajeros_viaje/'+this.state.usu_id_ride).once('value', (snap)=>{
                firebase.database().ref('pasajeros_viaje/'+this.state.usu_id_ride+'/'+this.state.usu_id).once('value', (snap2)=>{
                    if(snap2.val()==null)
                    {
                        if(snap.numChildren()<this.state.usu_auto_asientos)
                        {
                            firebase.database().ref('pasajeros_viaje/'+this.state.usu_id_ride).update({
                                [this.state.usu_id]:true
                            })
                            firebase.database().ref('users/'+this.state.usu_id).update({
                                usu_id_ride:this.state.usu_id_ride
                            })
                        }
                        else{
                            setTimeout(() => {
                                Alert.alert(
                                    'El límite de asientos de tu auto se encuentra al máximo',
                                    '',
                                    [
                                        { text: 'Aceptar',style:'cancel'},
                                    ],
                                    { cancelable: true }
                                )},100)
                                this.setState({
                                isloading:false
                                })
                            }
                    }
                    else
                    {
                        firebase.database().ref('pasajeros_viaje/'+this.state.usu_id_ride+'/'+this.state.usu_id).remove()
                        this.setState({
                            viaje_solicitado:false
                        })

                        firebase.database().ref('users/'+this.state.usu_id).update({
                            usu_id_ride:''
                        })
                    }
                })})
                }
            })
        }


    render(){

        

       

        

        return(
                <View style={styles.container_caja}>
                    <View style={{justifyContent:'center',alignItems:'center',flex:.2,}}>
                            <View>
                                <Icon3 name='user' size={50} color='gray'/>
                            </View>
                    </View>
                    <View style={{flex:.8,backgroundColor:'#F64648', flexDirection:'row'}}>
                        <View style={{flex:.7,paddingVertical:3,paddingHorizontal:6}}>
                            <Text style={{color:'white',marginBottom:3}}>{this.state.usu_nombre+" "+this.state.usu_apellidos}</Text>
                            <Text style={{color:'white',marginBottom:3}}>{'Matrícula'+" - "+this.state.usu_matricula}</Text>
                        </View>
                        <View style={{flex:.3,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                            <TouchableOpacity style={{padding:10}} onPress={()=>{
                                this.Aceptar_solicitud()
                            }}>
                            <Text style={{color:'black'}}>{this.state.viaje_solicitado==true?'Terminar':'Aceptar'}</Text>

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
       container_caja: {
        margin:15,
        flexDirection:'row',
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        height:80
    }
  });

export default withNavigationFocus(SolicitudBox)