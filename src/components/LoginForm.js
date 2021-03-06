import React, { Component } from 'react';
import { Text } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common';
import firebase from 'firebase';

class LoginForm extends Component{
  state = { email : '', password : '', error: '', loading: false};
  onButtonPress() {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
   this.setState({ error: 'Authentication Failed', loading: false });
 }

 onLoginSuccess() { //clear email and password in case of success
   this.setState({
     email: '',
     password: '',
     loading: false,
     error: ''
   });
 }

 renderButton(){
   if (this.state.loading){
     return <Spinner size = 'small' />;
   }
   return(
     <Button onPress={this.onButtonPress.bind(this)}>
         Log in!
     </Button>
   );
 }

  render(){
    return(
      <Card>
        <CardSection>
          <Input
          secureTextEntry = {false}
          placeholder= 'user@gmail.com'
          label = 'Email'
          value = {this.state.email} //initialize text as the current state
          onChangeText={email=> this.setState({ email })} //whenever the user modifies text the state is set again
          //aka the component rerenders
          //these props are passed to the Input component
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry = {true}
            placeholder = 'password'
            label = 'Password'
            value = {this.state.password}
            onChangeText={password=> this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles  = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    }

}


export default LoginForm;
