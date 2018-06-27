/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, AsyncStorage, Alert, Dimensions } from 'react-native';
import {
  StackNavigator,
  DrawerNavigator,
  SwitchNavigator,
  DrawerActions,
} from 'react-navigation';

const MyApp = StackNavigator({
  AppLogout: {
    screen: './App',
  }
});

export default class Home extends Component {

  static navigationOptions = {
  };
  
  constructor(props) {
        super(props);
        this.props.navigation.navigate('AppLogout');
  }

  render() {
    return (
            <MyApp />
    );
  }

}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
