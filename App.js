import React from 'react';
import { ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Text, View, Button, Image, Dimensions, TextInput } from 'react-native';
import axios from 'axios';
import insta from './assets/insta.png';
import Gallery from './components/Gallery/Gallery';
import Error from './components/Error/Error';
import Bar from './components/Bar/Bar';
import UserChoice from './components/UserChoice/UserChoice'
import Expo from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';

const { height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    loading: false,
    login: '',
    error: false,
    errorMessage: '',
    photos: [],
    success: false,
    choice: '',
    chosen: false
  };

  loginChangeHandler = (event) => {
    this.setState({
      login: event
    });
  }

  cancelEverything = () => {
    this.setState({
      loading: false,
      error: false,
      errorMessage: '',
      photos: [],
      success: false,
      choice: '',
      chosen: false
    });
  }

  getMedia = () => {
    this.setState({
      loading: true
    });   

    const login = this.state.login; 
    axios.get('https://apinsta.herokuapp.com/u/' + login)
      .then(response => {
        const photos = response.data.graphql.user.edge_owner_to_timeline_media.edges;
        this.setState({
          loading: false, 
          photos: photos,
          success: true
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true,
          errorMessage: error.response,
          success: false
        });
      })
  }

  itemChoice = (link) => {
    this.setState({
      choice: link,
      chosen: true
    });
  }

  cancelChoice = () => {
    this.setState({
      choice: '',
      chosen: false
    });
  }

  render() {
    if (this.state.chosen) {
      return (
        <UserChoice
          link={this.state.choice}
          cancelChoice={this.cancelChoice}
          currentName={this.state.login}
        />
      );
    }
    
    if (this.state.loading) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      );
    }

    if (this.state.success) {
      return (
        <Gallery 
          photos={this.state.photos}
          cancelEverything={this.cancelEverything}
          itemChoice={this.itemChoice}
          currentName={this.state.login}
        />
      );
    }

    if (this.state.error) {
      return (
        <Error 
          errorMessage={this.state.errorMessage}
          currentName={this.state.login}
          cancelEverything={this.cancelEverything}
        />
      );
    }
  
    return (
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
        <Bar>
          <Text style={{fontSize: 18, fontWeight: '500'}}>
            Instagram
          </Text>
        </Bar>
        <Image
          style={styles.photo}
          source={insta}
        />
        <View style={styles.wrapper}>            
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            placeholder="Instagram Login"
            value={this.state.login}
            onChangeText={this.loginChangeHandler}
          />
        </View>
        <TouchableOpacity
          style={styles.button} 
          disabled={this.state.login.length === 0}
          onPress={this.getMedia}
        >
          <View style={{flexDirection: 'row', width: "100%", justifyContent: 'center'}}>
            <Text style={styles.buttonText}>
              Search
            </Text>
            <Icon name="search" size={14} color="#fff" style={{marginLeft: 5, paddingTop: 3}}/>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: Expo.Constants.statusBarHeight
  },
  photo: {
    width: 100,
    height: 100,
    marginTop: 40
  },
  textInput: {
    padding: 8
  },
  wrapper: {
    width: "80%",
    borderWidth: 1,
    borderRadius: 7,
    marginTop: 25
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: 'tomato',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    width: "80%"
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
