import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { FontAwesome as Icon } from '@expo/vector-icons'
import { RootStackParamList } from '../types';
//@ts-ignore
import Trophy from '../assets/images/trophy.png'
//@ts-ignore
import Logo from '../assets/images/logo.png'
//@ts-ignore
import BG from '../assets/images/bg.png'

import * as Facebook from 'expo-facebook'
import API from '../services/api';
import { useUserUpdate } from '../context/UserContext';

export default function LoginScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const { setUserData } = useUserUpdate()

  const signUpFacebook = async () => {
    // return navigation.replace('Root')

    try {
      await Facebook.initializeAsync({ appId: '700740334174424', appName: 'Housi' })
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email']
      }) as any
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${token}`
        )
        const data = await response.json()
        const { name, email, id: password } = data
        const avatar = data.picture.data.url
        API.post('/auth/register', { name, email, password }).then(() => {
          API.post('/auth/login', { email, password }).then(({ data: login }) => {
            const { token, user } = login
            setUserData({ user: { ...user, avatar }, token })
            API.defaults.headers = {
              'Authorization': `Bearer ${token.accessToken}`
            }
            return  navigation.replace('Root')
          })
        }).catch((e) => {
          if (e.response.data.statusCode === 409) {
            API.post('/auth/login', { email, password }).then(({ data: login }) => {
              const { token, user } = login
              API.defaults.headers = {
                'Authorization': `Bearer ${token.accessToken}`
              }
              setUserData({ user: { ...user, avatar }, token })
              return navigation.replace('Root')
            })
          }
        })
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }


  return (
    <View style={styles.container}>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
        backgroundColor: '#1d2544'
      }}>
        <Image
          source={Logo}
          style={{
            width: 300,
            height: 180,
            resizeMode: 'contain'
          }}
        />

      </View>
      <TouchableOpacity style={{
        backgroundColor: '#fff',
        width: '80%',
        height: 48,
        borderRadius: 8,
        elevation: 4,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Image source={{
          uri: 'https://img2.gratispng.com/20180423/gkw/kisspng-google-logo-logo-logo-5ade7dc753b015.9317679115245306313428.jpg',
        }}
          style={{
            width: 25, height: 25
          }} />
        <Text style={{
          fontSize: 18,
          color: '#333',
          marginLeft: 30,
          flex: 1,
          alignSelf: 'center',
          fontFamily: 'Rubik',
        }}>Entrar com Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={signUpFacebook}
        style={{
          backgroundColor: '#1778f2',
          width: '80%',
          height: 52,
          borderRadius: 8,
          elevation: 4,
          marginTop: 10,
          marginBottom: 10,
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Icon name="facebook-square" color="#fff" size={25} />
        <Text style={{
          fontSize: 18,
          color: '#fff',
          marginLeft: 35,
          flex: 1,
          alignSelf: 'center',
          fontFamily: 'Rubik',
        }}>Entrar com Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d2544',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
