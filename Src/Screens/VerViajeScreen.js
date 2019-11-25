import React, {Component} from 'react';
import {StyleSheet,Text, View,TextInput,Image,ImageBackground,Dimensions,TouchableOpacity,ScrollView} from 'react-native';
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


const itemUser =[
  {label: 'Pasajero', value: 'pasajero'},
  {label: 'Conductor', value: 'conductor'},
]


export default class VerViajeScreen extends Component {

  constructor(props){
    super(props);
    this.state=this.props.navigation.getParam('state')
  }

  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{padding:30,justifyContent:'center',alignItems:'center'}}>
            <View style={{height:100, width:100,marginBottom:20}}>
                <Image source={{uri:this.state.usu_imagen}} style={{flex:1, height: undefined, width: undefined}}/>
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
                              title={'Solicitar ride'}
                              rounded
                              titleStyle={{fontSize:14,color:'#fff'}}
                              buttonStyle={{
                                  borderRadius: 10,
                                  backgroundColor:'#F64648'
                                  
                              }}
                              containerStyle={{paddingHorizontal:5,paddingVertical:6, borderRadius:4,flex:.7}}
                              onPress={() => this.props.navigation.navigate('App')}
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