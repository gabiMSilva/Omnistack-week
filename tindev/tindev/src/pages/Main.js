import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default function Main({navigation}) {
  const id = navigation.getParam('user');
  // seria o state, mas a primeira eh a variavel e a segunda a função para atualizar esse estado
  const [devs, setDevs] = useState([]);

  // React hooks
  useEffect(() => {
    async function loadUsers() {
      const response = await api.get('/devs', {
        headers: {
          user: id,
        },
      });

      setDevs(response.data);
    }

    loadUsers();
  }, [id]);

  const handleLike = async dev_id => {
    await api.post(`dev/${dev_id}/likes`, null, {
      headers: {
        user: id,
      },
    });

    setDevs(devs.filter(dev => dev._id !== dev_id));
  };

  const handleDislike = async dev_id => {
    await api.post(`dev/${dev_id}/dislikes`, null, {
      headers: {
        user: id,
      },
    });

    setDevs(devs.filter(dev => dev._id !== dev_id));
  };

  async function handleLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleLogout}>
        <Image source={logo} style={styles.logo} onPress={handleLogout}/>
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        {devs.length === 0 ? (
          <Text style={styles.empty}>Acabou :(</Text>
          )
          : (
            devs.map((dev, index) => (
              <View key={dev._id} style={[styles.card, {zIndex: devs.length - index}]}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: dev.avatar,
                  }}
                />
                <View style={styles.footer}>
                  <Text style={styles.name}>{dev.name}</Text>
                  <Text style={styles.bio} numberOfLines={3}>{dev.bio}</Text>
                </View>
              </View>
            ))
         )}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={dislike} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={like} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  logo: {
    marginTop: 30,
  },

  empty: {
    alignSelf: 'center',
    color: '#999',
    fontSize: 24,
    fontWeight: 'bold',
  },

  cardContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },

  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  avatar: {
    flex: 1,
    height: 300,
  },

  footer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18,
  },

  buttonsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
