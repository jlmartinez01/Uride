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


export default class HomeScreen extends Component {

  constructor(props){
    super(props);
    this.state={

      busqueda:"",

      usu_id:'',
      usu_id_rol:'',
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
      usu_id_viaje:"",
      usu_punto_encuentro:"",
      usu_auto:"",
      usu_color_auto:"",
      usu_auto_asientos:"",

      rides:[
        {
          usu_id:'1',
          usu_nombre:"Rogelio",
          usu_apellidos:"Pineda Sánchez",
          usu_matricula:"140460",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://gpluseurope.com/wp-content/uploads/Mauro-profile-picture.jpg",
          usu_destino:"Dalias",
          usu_id_viaje:'56',
          usu_punto_encuentro:"Edificio ASA",
          usu_auto:"Volkswagen Sedan",
          usu_color_auto:'rojo',
          usu_hora:"20:00"
        },
        {
          usu_id:'2',
          usu_nombre:"Estefanía",
          usu_apellidos:"Silva Orozco",
          usu_matricula:"160460",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-all-about-face.jpg",
          usu_destino:"Industrias",
          usu_id_viaje:'53',
          usu_punto_encuentro:"Servicios escolares",
          usu_auto:"Bugatti Veyron",
          usu_color_auto:'naranja',
          usu_hora:"17:00"
        },
        {
          usu_id:'3',
          usu_nombre:"Imelda",
          usu_apellidos:"Melisa Rainerio",
          usu_matricula:"150560",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://images.freeimages.com/images/large-previews/71b/pittsburgh-5-1217930.jpg",
          usu_destino:"Eucaliptos Campestre",
          usu_id_viaje:'58',
          usu_punto_encuentro:"Plaza fumadores 1",
          usu_auto:"Dodge Viper",
          usu_color_auto:'Azul',
          usu_hora:"18:00"
        },
        {
          usu_id:'4',
          usu_nombre:"Victorino",
          usu_apellidos:"Salvador Jenaro",
          usu_matricula:"150760",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"http://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-101-e1485815933252.jpg",
          usu_destino:"El paseo",
          usu_id_viaje:'48',
          usu_punto_encuentro:"Cafetería",
          usu_auto:"Shelby Cobra",
          usu_color_auto:'Azul',
          usu_hora:"20:00"
        },
        {
          usu_id:'5',
          usu_nombre:"Florina",
          usu_apellidos:"Martínez Sánchez",
          usu_matricula:"160560",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
          usu_destino:"Valle dorado",
          usu_id_viaje:'38',
          usu_punto_encuentro:"Edificio ASA",
          usu_auto:"Ferrari Testarrosa",
          usu_color_auto:'Amarillo',
          usu_hora:"20:00"
        },
        {
          usu_id:'6',
          usu_nombre:"Lázaro",
          usu_apellidos:"Pineda Sánchez",
          usu_matricula:"160260",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"http://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-116.jpg",
          usu_destino:"Pedregal",
          usu_id_viaje:'64',
          usu_punto_encuentro:"Edificio ASA",
          usu_auto:"Ford Mustang",
          usu_color_auto:'Negro',
          usu_hora:"20:00"
        },
        {
          usu_id:'7',
          usu_nombre:"Lázaro",
          usu_apellidos:"Pineda Sánchez",
          usu_matricula:"140460",
          usu_correo:'140645@upslp.edu.mx',
          usu_imagen:"https://static.makeuseof.com/wp-content/uploads/2015/11/perfect-profile-picture-all-about-face.jpg",
          usu_destino:"Foviste",
          usu_id_viaje:'74',
          usu_punto_encuentro:"Servicios escolares",
          usu_auto:"Ford Mustang",
          usu_color_auto:'Negro',
          usu_hora:"20:00"
        },
      ],
    }

    this.arrayHolder=this.state.rides
  }

  componentDidMount()
  {
    this._loadUsuInformation()
  }

  
  _loadUsuInformation = async () => {
    try {
      let usu_informacion = await AsyncStorage.getItem('usu_informacion')
      let parsed = JSON.parse(usu_informacion)
      this.setState({
        usu_id: parsed.usu_id,
        usu_id_rol: parsed.usu_id_rol,
        usu_id_rol_global:parsed.usu_id_rol,
      })

      firebase.database().ref('users/'+parsed.usu_id).on('value', (res) => {
        
        this.setState({
          isloading:false,
          usu_nombre:res.val().usu_nombre,
          usu_apellidos:res.val().usu_apellidos,
          usu_imagen:res.val().usu_imagen,
          usu_destino:res.val().usu_destino,
          usu_hora:res.val().usu_hora,
          usu_id_viaje:res.val().usu_id_viaje,
          usu_punto_encuentro:res.val().usu_punto_encuentro,
          usu_auto:res.val().usu_auto,
          usu_color_auto:res.val().usu_color_auto,
          usu_auto_asientos:res.val().usu_auto_asientos,
          isloading:false,
          typeUser:parsed.usu_id_rol==1?'Pasajero':'Conductor'
        })
      })

      

    } catch (error) {
      
      console.warn(error);
    }

  }

  

  searchFilterFunction = text => {  
        
    const newData = this.arrayHolder.filter(item => {     
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

    console.warn(this.state.usu_nombre)

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <Display enable={this.state.isloading} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                <Progress.Circle size={30} indeterminate={true} animated={true} color='#F64648'/>
        </Display>
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
                usu_imagen={item.usu_imagen}
                usu_destino={item.usu_destino}
                usu_hora={item.usu_hora}
                usu_id_viaje={item.usu_id_viaje}
                usu_punto_encuentro={item.usu_punto_encuentro}
                usu_auto={item.usu_auto}
                usu_color_auto={item.usu_color_auto}/>
              )}
              }
              keyExtractor={(item) => item.usu_id}

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
          <View style={{flex:1,backgroundColor:'#fff'}}>
          <View style={{padding:30,justifyContent:'center',alignItems:'center'}}>
            <View style={{height:100, width:100,marginBottom:20}}>
                <Image source={{uri:this.state.usu_imagen}} style={{flex:1, height: undefined, width: undefined}}/>
            </View>
            <Text style={{color:'gray',marginBottom:3}}>{'Conductor'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_nombre+" "+this.state.usu_apellidos}</Text>
            <Text style={{color:'gray',marginBottom:3}}>{'Matrícula'}</Text>
            <Text style={{color:'black',marginBottom:3}}>{this.state.usu_correo}</Text>
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
            </View>
        </View>
          </View>
        }
      </View>
      )
  }
}
