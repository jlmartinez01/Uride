import React, {Component} from 'react';
import {TouchableOpacity,View,Text,SafeAreaView,Image} from 'react-native';
import {strings} from './Src/Values/Strings'
import PresentationScreen from './Src/Screens/PresentationScreen';
import RegisterScreen from './Src/Screens/RegisterScreen';
import LoginScreen from './Src/Screens/LoginScreen';
import HomeScreen from './Src/Screens/HomeScreen';
import {createSwitchNavigator,createAppContainer,createBottomTabNavigator,createTopTabNavigator} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';



const AuthStackNavigator = createStackNavigator({
  Presentation:{screen:PresentationScreen,
    navigationOptions:{
      header:null}
  },
  Register:{screen:RegisterScreen,
    navigationOptions:{
      title: strings.GoBack,
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      },
    },
  Login:{screen:LoginScreen,
    navigationOptions:{
      title: strings.GoBack,
      headerStyle: {
        backgroundColor: 'black',
      },
      headerTintColor: '#fff',
      },
    }
 })

 const Home = createStackNavigator({
  Home:{screen:HomeScreen,
    navigationOptions:{
      header:null
    }
  },

})

const SwitchApp  = createSwitchNavigator({
  Auth:AuthStackNavigator,
  App:Home,
})

const ContainerApp = createAppContainer(SwitchApp);




export default ContainerApp;


