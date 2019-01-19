import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {  Header } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm.js';


class App extends Component {
  componentWillMount (){
    firebase.initializeApp(
      {
    apiKey: 'AIzaSyCoXu2yys6vsaJ0lwZnqtD4iJL3Omrm7cA',
    authDomain: 'auth-9a661.firebaseapp.com',
    databaseURL: 'https://auth-9a661.firebaseio.com',
    projectId: 'auth-9a661',
    storageBucket: 'auth-9a661.appspot.com',
    messagingSenderId: '388585115940'
    });
  }

  render() {
    return(
      <View>
          <Header headerText = 'Authentication' />
          <LoginForm />
      </View>
    );
  }
}

export default App;
