import React, {Component} from 'react';
import { Text, View, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import { withNavigationFocus } from 'react-navigation';
import { Button } from 'react-native-elements';

class RideBox extends Component{

    constructor(props)
    {
        super(props)
        this.state={

              usu_nombre:props.usu_nombre,
              usu_apellidos:props.usu_apellidos,
              usu_correo:props.usu_correo,
              usu_imagen:props.usu_imagen,
              usu_destino:props.usu_destino,
              usu_hora:props.usu_hora
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
                    <View style={{flex:.8}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{flex:.8}}>
                                <Text style={{color:'white'}}>{this.state.usu_nombre+" "+this.state.usu_apellidos}</Text>
                            </View>
                        </View>
                        <View style={{paddingTop:5}}>
                            <Text style={{color:'white'}}>{'Destino'+" - "+this.state.usu_destino}</Text>
                        </View>
                        <View style={{paddingTop:5}}>
                            <Text style={{color:'white'}}>{'Hora de salida'+" - "+this.state.usu_hora}</Text>
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
        backgroundColor:'#F39C12',
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