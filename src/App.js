import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {  Header, Button, Spinner, CardSection } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm.js';


class App extends Component {
  state = { loggedIn:null }


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
    //check Auth status
    firebase.auth().onAuthStateChanged((user)=>{ //if the user is present we are signed in
      if(user){
        this.setState({ loggedIn:true });
      } else{
        this.setState({ loggedIn:false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
