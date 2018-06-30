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

Em seguida, são contruídas algumas constantes:

    const { width, height } = Dimensions.get('window'); //pegar as dimensões da tela do dispositivo

    const ASPECT_RATIO = width / height; 
    const LATITUDE = -6.252939; //latitude do IFRN
    const LONGITUDE = -36.534274; //longitude do IFRN
    const LATITUDE_DELTA = 0.0050;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

    const USERNAME = 'username'; //constante para ser utilizada no AsyncStorage como parâmetro indentificador e recuperar a matrícula do usuário

O primeiro método da aplicação:

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
  
Agora vamos começar a trabalhar com o banco de dados do firebase da aplicação, usando a API REST do google:
  
  ![alt text](https://github.com/kairiroberto/smartif/blob/master/Captura1.JPG)
  
O Método de consulta (consultaPosicao()) pega todos os registros (documentos) de professores no banco de dados firebase, os valores são atualizados sempre que o professor fizer login no sistema:
  
  ![alt text](https://github.com/kairiroberto/smartif/blob/master/Captura2.JPG)
  
  
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
  
Obs.: "https://smartif-96d6d.firebaseio.com/professor.json" = caminho do banco de dados cujas regras estão públicas para não necessitar de autenticação na base de dados.

![alt text](https://github.com/kairiroberto/smartif/blob/master/Captura4.JPG)

O método 'consultaPosicacaoMatricula(matricula)' é indentico ao método anterior com a única diferença que recebe um parâmetro de consulta passado na String do método 'fetch' e retorna o registro de apenas um usuário (conforme a matrícula do parâmetro).

![alt text](https://github.com/kairiroberto/smartif/blob/master/Captura3.JPG)

Obs.: "https://smartif-96d6d.firebaseio.com/professor/" + matricula + ".json": no método anterior houve o retorno de um documento 'professor.json', agora o arquivo retornado é 'matricula.json', onde matricula é o login do usuário. Exemplo: 20151038060256.json, 20151038060100.json, etc.

Agora vamos ver o método responsável por pegar os dados do usuário no dispositivo e salvar no firebase, o método 'enviarPosicao(matricula, latitude, longitude)'.

    enviarPosicao(matricula, latitude, longitude) {
        fetch("https://smartif-96d6d.firebaseio.com/professor/"+matricula+".json",
        {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({latitude: latitude, longitude: longitude, matricula: matricula})
        });
    }

A principal diferença são no segundo e terceiro parâmetro. No segundo foi utilizado o método PUT que irar ALTERAR (caso a matricula já exista) ou ADICIONAR os dados recebidos no método 'enviarPosicao', lembrando que será adicionado um novo nó em professores referente a 'matricula' informada e esse nó vai ter três valores de matricula, latitude e longitude, conforme a imagem a baixo.

![alt text](https://github.com/kairiroberto/smartif/blob/master/Captura3.JPG)

Para passar os parametros recebidos: matricula, latitude e longitude, e salvá-los no novo nó, essas informações são passadas no terceiro parâmetro do método 'fetch', no 'body' da requisição. Esse 'body' recebe uma String, por isso foi usado o método 'JSON.stringify', que converte um objeto JSON em String.


  
