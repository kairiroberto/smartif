# SmartIF

## Arquivo AppMapa.js

O arquivo começa com importações da bibliotecas (pasta 'node_modules') utilizadas (nem todos os componentes.)

    // componentes do react:
    
    import React, { Component } from 'react';

    // componentes do react-native:
    
    import {
      StyleSheet, 
      Text, 
      View, 
      ImageBackground, //imagem de fundo
      TextInput, 
      Button, 
      TouchableOpacity, //para efeitos da função touchscreem
      AsyncStorage, //banco de dados
      Alert, //alertas na tela
      Dimensions 
      } from 'react-native';

    // componentes de navegação:
    import {
      StackNavigator, //navegação padrão em pilha (uma tela sobre a outra)
      DrawerNavigator, //navegação com menu lateral
      SwitchNavigator, //junção de outros meios de navegação
      DrawerActions, //ações para abrir ou fechar o menu lateral
    } from 'react-navigation';

    // componentes do mapa:
    import MapView, { 
    MAP_TYPES, //não foi utilizado
    Polygon, //não foi utilizado
    ProviderPropType //não foi utilizado
    } from 'react-native-maps';

Em seguida, são contruídas constantes:

    const { width, height } = Dimensions.get('window'); //pegar as dimensões da tela do dispositivo

    const ASPECT_RATIO = width / height; 
    const LATITUDE = -6.252939; //latitude do IFRN
    const LONGITUDE = -36.534274; //longitude do IFRN
    const LATITUDE_DELTA = 0.0050;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const USERNAME = 'username'; //constante para ser utilizada no AsyncStorage como parametro indentificador e recuperar a matrícula do usuário

O primeiro método da aplicação o construtor:

      constructor(props) {
        super(props);
        try {
          this.state = {
            matricula: "AsyncStorage.getItem(USERNAME)", //recupera do banco de dados a matrícula
            professoresString: "", //para pegar uma String com todos os dados do firebase
            professoresJson: {}, //para pegar o JSON do firebase
            professorString: "", //para pegar um único documento (registro) de professor no formato String
            professorJson: {}, //para pegar um único documento (registro) de professor no formato JSON
            figura: './ifrnicon.png',
            infoPosicaoAl: null, //para armazenar uma String que informa se o aluno está ou não no IFRN
            latitudeAl: 0.0, //latitude inicial do aluno
            longitudeAl: 0.0, //longitude inicial do aluno
            erro: null, //armazenar informações de erro quando for consultar a posição do aluno
            amount: 0,
            enableHack: false,
            region: { //dados iniciais para fazer um zoom em uma região do mapa
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            },
            coordinate: { //dados para posição da marca do IFRN
              latitude: LATITUDE,
              longitude: LONGITUDE,
            },
          };
        } catch (error) {
        }
      }
      
  Métdo de consulta (consultaPosicao()) que pega todos os registros (documentos) de professores no banco de dados firebase, os valores são atualizados sempre que o professor fizer login no sistema:
  
        consultarPosicao() {
              fetch("https://smartif-96d6d.firebaseio.com/professor.json",
              {
                  method: 'GET',                           // parâmetro que informa que a consulta irá recuperar dados
                  headers: {                               // informações de cabeçalho da consulta, no caso descreve o formato do arquivo (JSON)
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  }
              })
              .then((response) => response.json())         // caso o acesso acesso acima tenha sucesso, converte a resposta para um arquivo JSON
              .then((responseJson) => {                    // caso tenha dado tudo certo, atribui uma String e um JSON para os atributos 'professoresString' e 'professoresJSON' criados no construtor
                  this.setState({                          
                      professoresString: JSON.stringify(responseJson),
                      professoresJson: JSON.parse(JSON.stringify(responseJson)),
                  });
              })
              .catch((error) => {
                  console.error(error);
              });
          }
  
Obs.: "https://smartif-96d6d.firebaseio.com/professor.json" = caminho do banco de dados cujas regras estão públicas para não necessitar de autenticação da base de dados.

![alt text](https://github.com/kairiroberto/smartif/blob/master/Captura4.JPG)

O método 'consultaPosicacaoMatricula(matricula)' é indentico ao método anterior com a única diferença que recebe uma parametro de consulta que é passada na String do método 'fetch' e retorna o registro de apenas um usuário (conforme a matrícula do parametro).

Obs.: "https://smartif-96d6d.firebaseio.com/professor/" + matricula + ".json": no método anterior seria uma retornado um documento 'professor.json', agora o arquivo retornado é 'matricula.json', onde matricula é o login do usuário. Exemplo: 20151038060256.json, 20151038060100.json, etc.




  
