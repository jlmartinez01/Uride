import React, {Component} from 'react';
import {Text, View,AsyncStorage,Image,ImageBackground,Dimensions,TouchableOpacity,ScrollView, FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  Fumi } from 'react-native-textinput-effects';
import * as Progress from 'react-native-progress';
import Display from 'react-native-display';
import RideBox from '../Components/RideBox'
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { SearchBar } from 'react-native-elements';
import * as firebase from 'firebase'
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Entypo';

export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state={

      busqueda:"",

      usu_id_rol_global:this.props.navigation.getParam('usu_id_rol_global'),

      isloading:false,
      typeUser:'',
      enablePassengerText:false,
      enableDriverText:false,
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
      rides:[],
      arrayHolder:[]
    }

    this.usu_id='',
    this.usu_id_rol='',

    this.state.rides
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
      this.setState({
        usu_id_rol_global:parsed.usu_id_rol
      })

      

      if(this.usu_id_rol==1)
      {
        firebase.database().ref('/rides').on('value',(snapshot) =>{
          var returnArray = [];
      
              snapshot.forEach((snap)=>{
                  var item = snap.val();
                  item.key = snap.key;
          
                  returnArray.push({
                    usu_nombre:snap.val().usu_nombre,
                    usu_apellidos:snap.val().usu_apellidos,
                    usu_destino:snap.val().usu_destino,
                    usu_hora:snap.val().usu_hora,
                    usu_id_ride:snap.key,
                    usu_punto_encuentro:snap.val().usu_punto_encuentro,
                    usu_auto:snap.val().usu_auto,
                    usu_color_auto:snap.val().usu_color_auto,
                    usu_auto_asientos:snap.val().usu_auto_asientos,
                    usu_matricula:snap.val().usu_matricula,
                    usu_ride_activo:snap.val().usu_ride_activo,
                  });

                  let finalArray = returnArray.filter(item=>item.usu_ride_activo==true)

                  
          
                  this.setState({ 
                    rides: finalArray ,
                    arrayHolder:finalArray
                  })
              });



          });

      }

      firebase.database().ref('users/'+parsed.usu_id).on('value', (res) => {
        this.setState({
          typeUser:parsed.usu_id_rol==1?'Pasajero':'Conductor',
          usu_id_ride:res.val().usu_id_ride,
        })

          
          if(this.usu_id_rol==2)
          {
                firebase.database().ref('rides/'+res.val().usu_id_ride).on('value', (snapshot) => {
                  this.setState({
                    usu_nombre:snapshot.val().usu_nombre,
                    usu_apellidos:snapshot.val().usu_apellidos,
                    usu_matricula:snapshot.val().usu_matricula,
                    usu_destino:snapshot.val().usu_destino,
                    usu_hora:snapshot.val().usu_hora,
                    usu_punto_encuentro:snapshot.val().usu_punto_encuentro,
                    usu_auto:snapshot.val().usu_auto,
                    usu_color_auto:snapshot.val().usu_color_auto,
                    usu_auto_asientos:snapshot.val().usu_auto_asientos,
                    usu_ride_activo:snapshot.val().usu_ride_activo==false?'inactivo':'activo',
                    isloading:false,
                  })
                })
                
          }
          this.setState({
            isloading:false
          })
      })
      

      

    } catch (error) {
      
      console.warn(error);
      this.setState({
        isloading:false
      })
    }

  }

  

  searchFilterFunction = text => {  
        
    const newData = this.state.arrayHolder.filter(item => {     
        const itemData = `
        ${item.usu_nombre.toUpperCase()}   
        ${item.usu_apellidos.toUpperCase()}
        ${item.usu_destino.toUpperCase()}`;
        
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;    
        });
        
    this.setState({ rides: newData });  
  };

  
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <Spinner
                visible={this.state.isloading}
                color='#F64648' />
        {
          this.state.usu_id_rol_global==1
          ?
          <View style={{flex:1}}>
            <SearchBar
              placeholder={'Buscar'}
              placeholderTextColor={'black'}
              inputStyle={[{backgroundColor:'white',padding:0,color:'black',fontSize:14}]}
              containerStyle={{backgroundColor:'white',padding:0,borderBottomColor:'white'}}
              inputContainerStyle={[{backgroundColor:'white',padding:5}]}
              cancelButtonProps={null}
              returnKeyType='search'
              onChangeText={(text)=>{this.setState({
                      busqueda:text
                  })
                  this.searchFilterFunction(text)
              }}
              value={this.state.busqueda}/>
            <FlatList   
              data={this.state.rides}
              renderItem={({item}) => {
              return(
              <RideBox
                usu_nombre={item.usu_nombre}
                usu_apellidos={item.usu_apellidos}
                usu_matricula={item.usu_matricula}
                usu_correo={item.usu_correo}
                usu_destino={item.usu_destino}
                usu_hora={item.usu_hora}
                usu_id_ride={item.usu_id_ride}
                usu_punto_encuentro={item.usu_punto_encuentro}
                usu_auto={item.usu_auto}
                usu_color_auto={item.usu_color_auto}/>
              )}
              }
              keyExtractor={(item) => item.usu_id_ride}

              ListEmptyComponent={() => {
                return (
                    <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',marginVertical:10,height:300}}>
                        <Text>... {'No existen rides disponibles'} ...</Text>
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
          :
          this.state.usu_id_rol_global==2
          ?
          <View style={{flex:1,backgroundColor:'#fff'}}>
            <View style={{padding:30,justifyContent:'center',alignItems:'center'}}>
              <View>
              {
                this.state.usu_imagen!=""
                ?
                <View style={{height:100, width:100,marginBottom:20}}>
                  <Image source={{uri:this.state.usu_imagen}} style={{flex:1, height: undefined, width: undefined}}/>
                </View>
                :
                <Icon name='user' size={100} color='gray'/>
              }
            </View>
            <Text style={{color:'gray',marginBottom:3}}>{'Conductor'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_nombre+" "+this.state.usu_apellidos}</Text>
            <Text style={{color:'gray',marginBottom:3}}>{'Matrícula'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_matricula}</Text>
            {
              this.state.usu_auto!=''
              ?
              <View style={{justifyContent:'center',alignItems:'center'}}>
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
                    <Text style={{color:'gray',marginBottom:3}}>{'Estatus'}</Text>
                    <Text style={{color:'black',marginBottom:3}}>{this.state.usu_ride_activo}</Text>
              </View>
              :
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditRideInformation')}>
              <View style={{justifyContent:'center',alignItems:'center',marginTop:30,backgroundColor:'#F64648',padding:20}}>
                  <Text style={{color:'white',marginBottom:3}}>{'Aún no haz configurado tu ride'}</Text>
              </View>
              </TouchableOpacity>
            }
        </View>
      </View>
      :
      <View/>
      }
    </View>
    )
  }
}
