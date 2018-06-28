/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React, { Component } from 'react';
import { StyleSheet, FlatList, Text, View, ImageBackground, TextInput, Button, TouchableOpacity, AsyncStorage, Alert, Dimensions } from 'react-native';
import {
StackNavigator,
        DrawerNavigator,
        SwitchNavigator,
        DrawerActions,
        } from 'react-navigation';

const ACCESS_TOKEN = 'access_token';

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
          dados: [],
          professoresJson: {},
        }
    }
    
    gerarArrayJS() {
	professoresIds = Object.keys(this.state.professoresJson);
        var result = [];
	for (var i = 0; i < professoresIds.length; i++) {
	    //result.push(this.state.professoresJson[professoresIds[i]]);
            this.state.dados.push({key: i});
	}
    }
    
    consultarPosicao() {
        fetch("https://smartif-96d6d.firebaseio.com/professor.json",
        {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                //dados: JSON.parse(JSON.stringify(responseJson)),
                professoresJson: JSON.parse(JSON.stringify(responseJson)),
            });
            this.gerarArrayJS();
        })
        .catch((error) => {
            console.error(error);
        });
    }
    
    componentDidMount() {
        this.consultarPosicao();
    }
    
    render() {
        return (
                <View style={styles.container}>
                    <Text> {this.state.result}</Text>
                    <FlatList 
                        data={this.state.dados}
                        renderItem={
                            ({item}) => 
                                <Text style={styles.item}> 
                                    {item.key} 
                                </Text> 
                        }
                    />
                </View>
        );
    }
    
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})