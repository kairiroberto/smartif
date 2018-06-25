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
import Mapa from './mapa/AppMapa';
import Home from './login/AppHome';
import Config from './login/AppConfig'
import Logout from './login/AppLogin';
import Login from './login/AppLogin';
import App from './App';

const MenuDrawer = DrawerNavigator(
    {
        Mapa: { screen: Mapa },
        Configuração: { screen: Config },
        Logout: { screen: Logout },
    }
);

const Menu = StackNavigator(
    {
        DrawerStack: { screen: MenuDrawer },
    },
    {
        headerMode: 'float',
        navigationOptions: ({navigation}) => ({
            title: 'SmartIF',
            headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
        })
    }
);

class App2 extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Menu />;
    }

}

export default App2;


