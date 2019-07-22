import React, { Component } from 'react';

import { SafeAreaView, Text, TouchableOpacity, AsyncStorage, TextInput, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../services/api';

export default class New extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        newTweet: ''
    };

    goBack = () => {
        this.props.navigation.pop(); // back to Timeline (button back)
    }

    handlerTweet = async () => {
        const content = this.state.newTweet;
        const author = await AsyncStorage.getItem('@Oministack:username');

        await api.post('tweets', {author, content});

        this.goBack();
    }

    handlerInputChange = (newTweet) => {
        this.setState({ newTweet });
    }

  //Safeareaview is just a safe area for iphone X and another cell phones who there is the screen till top, and the screen start down of this part of screen
  render() {
    return ( 
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={this.goBack}>
                    <Icon name="close" size={24} color="#4BB0EE"></Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={this.handlerTweet}>
                    <Text style={styles.buttonText}>Tweetar</Text>
                </TouchableOpacity>
            </View>

            <TextInput 
                style={styles.input}
                multiline
                placeholder="O que está acontencendo?"
                placeholderTextColor="#999"
                value={this.state.newTweet}
                onChangeText={this.handlerInputChange}
                returnKeyType="send"
                onSubmitEditing={this.handlerTweet}
            />
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    header: {
      paddingTop: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
  
    button: {
      height: 32,
      paddingHorizontal: 20,
      borderRadius: 16,
      backgroundColor: "#4BB0EE",
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    },
  
    input: {
      margin: 20,
      fontSize: 16,
      color: "#333"
    }
  });
