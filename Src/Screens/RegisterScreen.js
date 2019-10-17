import React, {Component} from 'react';
import {StyleSheet,Text, View,TextInput,Image,ImageBackground,Dimensions,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
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
import {strings} from '../Values/Strings'
import { ScrollView } from 'react-native-gesture-handler';


const itemUser =[
  {label: strings.Passenger, value: 'pasajero'},
  {label: strings.Driver, value: 'conductor'},
]


export default class RegisterScreen extends Component {

  constructor(){
    super();
    this.state={
      typeUser:'pasajero',
      enablePassengerText:true,
      enableDriverText:false,

    }
  }

  DisplayViews = (value) => 
  {
    this.setState({
      typeUser:value
    })
    if(value=='pasajero')
    {
      this.setState({
        enablePassengerText:true,
        enableDriverText:false,
      })
    }
    if(value=='conductor')
    {
      this.setState({
        enablePassengerText:false,
        enableDriverText:true,
      })
    }
  }
  
  render() {

    return (
      <View style={{flex:1,backgroundColor:'#fff'}}>
        <ScrollView>
          <View style={{padding:30}}>
                  <Display enable={this.state.isloading} style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                          <Progress.Circle size={30} indeterminate={true} animated={true} color='#F64648'/>
                  </Display>
                  <View style={{flex:.3,justifyContent:'center',alignItems:'center',marginBottom:30}}>
                      <Image source={require('../Images/Uride_logo.png')}style={{flex:1, height:100, width:100}} resizeMode="contain"/>
                  </View>
                  <View style={{marginTop:5}}>
                                    <Text style={{color:'#000',marginBottom:5}}>{strings.UserType}</Text>
                                    <CustomPicker
                                      defaultValue={itemUser[0]}
                                      options={itemUser}
                                      getLabel={item => item.label}
                                      fieldTemplate={this.renderFieldUser}
                                      optionTemplate={this.renderOption}
                                      onValueChange={value => {
                                        this.DisplayViews(value.value)
                                      }}
                                    />
                  </View>
                  
                  <View style={{marginVertical:10}}>
                          <Fumi
                            label={strings.InstitutionalMail}
                            labelStyle={{color:'#fff'}}
                            iconClass={FontAwesomeIcon}
                            iconName={'university'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                          />
                  </View>
                   <View style={{marginVertical:10}}>
                          <Fumi
                            label={strings.Password}
                            labelStyle={{color:'#fff'}}
                            iconClass={MaterialCommunityIcons}
                            iconName={'security'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                          />
                  </View>
                  <View style={{marginVertical:10}}>
                          <Fumi
                            label={strings.Name}
                            labelStyle={{color:'#fff'}}
                            iconClass={FontAwesomeIcon}
                            iconName={'user'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                          />
                  </View>


                  <Display enable={this.state.enableDriverText}enterDuration={500} 
                                          exitDuration={250}
                                          exit="fadeOutLeft"
                                          enter="fadeInLeft">
                  <View style={{marginVertical:10}}>
                          <Fumi
                            label={strings.Car}
                            labelStyle={{color:'#fff'}}
                            iconClass={MaterialCommunityIcons}
                            iconName={'car'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                          />
                  </View>
                  <View style={{marginVertical:10}}>
                          <Fumi
                            label={strings.CarColor}
                            labelStyle={{color:'#fff'}}
                            iconClass={MaterialIcons}
                            iconName={'color-lens'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                          />
                  </View>
                  <View style={{marginVertical:10}}>
                          <Fumi
                            label={strings.DepartureTime}
                            labelStyle={{color:'#fff'}}
                            iconClass={MaterialCommunityIcons}
                            iconName={'clock'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                          />
                  </View>
                  <View style={{marginVertical:10}}>
                          <Fumi
                            label={strings.NumberSeats}
                            labelStyle={{color:'#fff'}}
                            iconClass={MaterialCommunityIcons}
                            iconName={'seat-recline-extra'}
                            iconColor={'#fff'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                            style={{backgroundColor:'rgba(52, 52, 52, .9)'}}
                          />
                  </View>
                  </Display>
                  <View style={{flexDirection:'row',justifyContent:'center',marginTop:30}}>
                                <Button
                                    title={strings.Register}
                                    rounded
                                    titleStyle={{fontSize:14,color:'#fff'}}
                                    buttonStyle={{
                                        borderRadius: 10,
                                        backgroundColor:'#1985DF'
                                        
                                    }}
                                    containerStyle={{paddingHorizontal:5,paddingVertical:6, borderRadius:4,flex:.7}}
                                    onPress={() => this.props.navigation.navigate('App')}
                                />
                  </View>
                  
          </View>
        </ScrollView>
      </View>
      )
  }
  renderFieldUser(settings) {
    const { selectedItem, defaultText, getLabel, clear } = settings
    return (
      <View style={styles.container_type_user}>
        <View>
          {!selectedItem && <Text style={{color:'#000'}}>{defaultText}</Text>}
          {selectedItem && (
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{flexDirection:'row'}}>
                <View style={{marginLeft:5}}>
                  <Text style={{color:'white'}}>
                    {getLabel(selectedItem)}
                  </Text>
                </View>
              </View>
              <View>
                  <Icon2 size={25} color='#fff' name='keyboard-arrow-down'/>
              </View>
                
            </View>
          )}
        </View>
      </View>
    )
  }
  renderOption(settings) {
    const { item, getLabel } = settings
    return (
      <View style={{backgroundColor:'rgba(51, 52, 52, 0.99)'}}>
        <View style={{padding:10}}>
          <Text style={{ color: '#fff', alignSelf: 'flex-start'}}>{getLabel(item)}</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container_type_user: {
    flex: 1,
    borderWidth:1,
    paddingVertical:6,
    borderLeftColor:'transparent',
    borderRightColor:'transparent',
    borderTopColor:'transparent',
    borderBottomColor:'white',
    justifyContent:'flex-start',
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