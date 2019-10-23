import React, {Component} from 'react';
import {Text, View,TextInput,Image,ImageBackground,Dimensions,TouchableOpacity,ScrollView, FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Fumi } from 'react-native-textinput-effects';
import * as Progress from 'react-native-progress';
import Display from 'react-native-display';
import {strings} from '../Values/Strings'
import RideBox from '../Components/RideBox'
import { PinchGestureHandler } from 'react-native-gesture-handler';



export default class HomeScreen extends Component {

  constructor(){
    super();
    this.state={

      rides:[
        {
          usu_nombre:"Rogelio",
          usu_apellidos:"Pineda Sánchez",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://gpluseurope.com/wp-content/uploads/Mauro-profile-picture.jpg",
          usu_destino:"Dalias",
          usu_hora:"20:00"
        },
        {
          usu_nombre:"Estefanía",
          usu_apellidos:"Silva Orozco",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-all-about-face.jpg",
          usu_destino:"Dalias",
          usu_hora:"20:00"
        },
        {
          usu_nombre:"Imelda",
          usu_apellidos:"Melisa Rainerio",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://images.freeimages.com/images/large-previews/71b/pittsburgh-5-1217930.jpg",
          usu_destino:"Dalias",
          usu_hora:"20:00"
        },
        {
          usu_nombre:"Victorino",
          usu_apellidos:"Salvador Jenaro",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"http://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-101-e1485815933252.jpg",
          usu_destino:"Dalias",
          usu_hora:"20:00"
        },
        {
          usu_nombre:"Florina",
          usu_apellidos:"Martínez Sánchez",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
          usu_destino:"Dalias",
          usu_hora:"20:00"
        },
        {
          usu_nombre:"Lázaro",
          usu_apellidos:"Pineda Sánchez",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"http://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-116.jpg",
          usu_destino:"Dalias",
          usu_hora:"20:00"
        },
        {
          usu_nombre:"Lázaro",
          usu_apellidos:"Pineda Sánchez",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-all-about-face.jpg",
          usu_destino:"Dalias",
          usu_hora:"20:00"
        },
        
      ]

    }
  }
  
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <Display enable={this.state.isloading} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Progress.Circle size={30} indeterminate={true} animated={true} color='#F64648'/>
        </Display>
          <View style={{flex:1}}>
            <FlatList   
              data={this.state.rides}
              renderItem={({item}) => {
              return(
              <RideBox
                usu_nombre={item.usu_nombre}
                usu_apellidos={item.usu_apellidos}
                usu_correo={item.usu_correo}
                usu_imagen={item.usu_imagen}
                usu_destino={item.usu_destino}
                usu_hora={item.usu_hora}/>
              )}
              }
              keyExtractor={(item, index) => index.toString()}

              ListEmptyComponent={() => {
                return (
                    <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',marginVertical:10,height:300}}>
                        <Text>... {strings.NoRides} ...</Text>
                    </View>
                )
              }}
              ItemSeparatorComponent={()=>{
                return (
                  <View style={{height:15}}/>
              )
              }}
            />

          </View>
      </View>
      )
  }
}
