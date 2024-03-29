import React, {Component} from 'react';
import {TouchableOpacity,View,Text,SafeAreaView,StatusBar,AsyncStorage} from 'react-native';
import PresentationScreen from './Src/Screens/PresentationScreen';
import RegisterScreen from './Src/Screens/RegisterScreen';
import LoginScreen from './Src/Screens/LoginScreen';
import Home from './Src/Screens/HomeScreen';
import MyRide from './Src/Screens/MyRideScreen';
import {createSwitchNavigator,createAppContainer,createTopTabNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import VerViajeScreen from './Src/Screens/VerViajeScreen';
import RecoveryPasswordScreen from './Src/Screens/RecoveryPasswordScreen'
import HelpScreen from './Src/Screens/HelpScreen';
import * as firebase from 'firebase'
import {firebaseConfig} from './Src/Constants/ApiKeys'
import SplashScreen from './Src/Components/SplashScreen'
import ButtonsHamburguesa from './Src/Components/ButtonsHamburguesa'
import EditInformation from './Src/Screens/EditInformation'
import EditRideInformation from './Src/Screens/EditRideInformation'


const AuthStackNavigator = createStackNavigator({
  Presentation:{screen:PresentationScreen,
    navigationOptions:{
      header:null}
  },
  Register:{screen:RegisterScreen,
    navigationOptions:{
      header:null
    }},
  Login:{screen:LoginScreen,
    navigationOptions:{
      header:null
    }},
  Recovery:{screen:RecoveryPasswordScreen,
    navigationOptions:{
      header:null
    }},
 })

 const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      header: (
        <SafeAreaView style={{ backgroundColor: 'black', flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <TouchableOpacity style={{flex:.15,justifyContent:'center',alignItems:'center'}} onPress={() => navigation.toggleDrawer()}>
            <View style={{padding:10}}>
              <Icon name='menu' size={22} color='white'  />
            </View>
          </TouchableOpacity>
          <View style={{ flex: .85, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Home</Text>
            </View>
          </View>
        </SafeAreaView>
      ),
    })
  },
  VerViaje:{
    screen:VerViajeScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <SafeAreaView style={{ backgroundColor: 'black', flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <TouchableOpacity style={{flex:.15,justifyContent:'center',alignItems:'center'}} onPress={() => navigation.goBack()}>
            <View style={{padding:10, flexDirection:'row'}}>
              <Icon2 name='md-arrow-round-back' size={22} color='white'  />
            </View>
          </TouchableOpacity>
          <View style={{ flex: .75, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>

          </View>
          <View style={{ flex: .1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>

          </View>
        </SafeAreaView>
      ),
    })
  },

})

const MyRideStack = createStackNavigator({
  MyRide: {
    screen: MyRide,
    navigationOptions: ({ navigation }) => ({
      header: (
        <SafeAreaView style={{ backgroundColor: 'black', flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <TouchableOpacity style={{flex:.15,justifyContent:'center',alignItems:'center'}} onPress={() => navigation.toggleDrawer()}>
            <View style={{padding:10}}>
              <Icon name='menu' size={22} color='white'  />
            </View>
          </TouchableOpacity>
          <View style={{ flex: .75, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>

          </View>
          <View style={{ flex: .1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>

          </View>
        </SafeAreaView>
      ),
    })
  },

})


 const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack, navigationOptions: () => ({
        tabBarIcon: ({ focused }) => {
          if (focused == true) {
            return (
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center',}}>
                <Icon2 name='ios-car' size={22} color='white' />
              </View>
            )
          }
          else {
            return (
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center',}}>
                  <Icon2 name='ios-car' size={22} color='gray' />
              </View>)

          }
        },
        header: null

      })
    },
    MyRide: {
      screen: MyRideStack, navigationOptions: () => ({
        tabBarIcon: ({ focused }) => {
          if (focused == true) {
            return (
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' ,}}>
                <Icon3 name='route' size={22} color='white' />
              </View>
            )
          }
          else {
            return (
              <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center',}}>
                 <Icon3 name='route' size={22} color='gray' />
              </View>)

          }
        }
      })
    }
  },
  { tabBarOptions: { showLabel: false, activeBackgroundColor: '#F64648', inactiveTintColor: 'gray', style: { backgroundColor: 'white' } } },
  { initialRouteName: 'Home' },
)


 const AppStackNavigator = createStackNavigator({
  AppTabNavigator:{screen:AppTabNavigator,
    navigationOptions:{
      header:null
    }
  },
  
  Help:{
    screen:HelpScreen,
    navigationOptions: ({ navigation }) => ({
      header: (
        <SafeAreaView style={{ backgroundColor: 'black', flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <TouchableOpacity style={{flex:.15,justifyContent:'center',alignItems:'center'}} onPress={() => navigation.goBack()}>
            <View style={{padding:10, flexDirection:'row'}}>
              <Icon2 name='md-arrow-round-back' size={22} color='white'  />
            </View>
          </TouchableOpacity>
          <View style={{ flex: .75, justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row' }}>

          </View>
          <View style={{ flex: .1, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>

          </View>
        </SafeAreaView>
      ),
    })
  },
  EditInformation:{
    screen:EditInformation,
    navigationOptions: ({ navigation }) => ({
      header: (
        <SafeAreaView style={{ backgroundColor: 'black', flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <TouchableOpacity style={{flex:.15,justifyContent:'center',alignItems:'center'}} onPress={() => navigation.goBack()}>
            <View style={{padding:10, flexDirection:'row'}}>
              <Icon2 name='md-arrow-round-back' size={22} color='white'  />
            </View>
          </TouchableOpacity>
          <View style={{ flex: .85, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Editar Información de perfil</Text>
            </View>
          </View>
        </SafeAreaView>
      ),
    })
  },
  EditRideInformation:{
    screen:EditRideInformation,
    navigationOptions: ({ navigation }) => ({
      header: (
        <SafeAreaView style={{ backgroundColor: 'black', flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <TouchableOpacity style={{flex:.15,justifyContent:'center',alignItems:'center'}} onPress={() => navigation.goBack()}>
            <View style={{padding:10, flexDirection:'row'}}>
              <Icon2 name='md-arrow-round-back' size={22} color='white'  />
            </View>
          </TouchableOpacity>
          <View style={{ flex: .85, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>Editar Información de ride</Text>
            </View>
          </View>
        </SafeAreaView>
      ),
    })
  },

})


const AppDrawerNavigator = createDrawerNavigator({
  Home: AppStackNavigator,
}, {
  drawerBackgroundColor: 'white',
  contentComponent: ({ navigation }) => (
    <ButtonsHamburguesa/>
  ),
}
)

const SwitchApp  = createSwitchNavigator({
  Splash: SplashScreen,
  Auth:AuthStackNavigator,
  App:AppDrawerNavigator,
})

const ContainerApp = createAppContainer(SwitchApp);


export default class App extends Component {
  render() {

    return (
        <View style={{flex:1, marginTop: StatusBar.currentHeight }}>
          <ContainerApp />
        </View>
    )
  }
};


