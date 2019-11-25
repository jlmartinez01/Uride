import React, {Component} from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import { withNavigationFocus } from 'react-navigation';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

class RideBox extends Component{

    constructor(props)
    {
        super(props)
        this.state={

              usu_nombre:props.usu_nombre,
              usu_apellidos:props.usu_apellidos,
              usu_matricula:props.usu_matricula,
              usu_correo:props.usu_correo,
              usu_imagen:props.usu_imagen,
              usu_destino:props.usu_destino,
              usu_hora:props.usu_hora,
              usu_id_viaje:props.usu_id_viaje,
              usu_punto_encuentro:props.usu_punto_encuentro,
              usu_auto:props.usu_auto,
              usu_color_auto:props.usu_color_auto,
        }
    }


    render(){

        

       

        

        return(
                <View style={styles.container_caja}>
                    <View style={{flex:.2, justifyContent:'space-between',marginRight:5}}>
                        <View style={{height:75,width:75,backgroundColor:'black'}}>
                            <Image source={{uri:this.state.usu_imagen}} style={{flex:1, height: undefined, width: undefined}}/>
                        </View>
                    </View>
                    <View style={{flex:.8,backgroundColor:'#F64648', flexDirection:'row'}}>
                        <View style={{flex:.7,paddingVertical:3,paddingHorizontal:6}}>
                            <Text style={{color:'white',marginBottom:3}}>{this.state.usu_nombre+" "+this.state.usu_apellidos}</Text>
                            <Text style={{color:'white',marginBottom:3}}>{'Destino'+" - "+this.state.usu_destino}</Text>
                            <Text style={{color:'white'}}>{'Hora de salida'+" - "+this.state.usu_hora}</Text>
                        </View>
                        <View style={{flex:.3,alignItems:'center',justifyContent:'center',backgroundColor:'white'}}>
                            <TouchableOpacity style={{padding:10}} onPress={()=>{this.props.navigation.navigate('VerViaje',{state:this.state})}}>
                            <Text style={{color:'black'}}>{'Ver más'}</Text>
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
    }
  });

export default withNavigationFocus(RideBox)