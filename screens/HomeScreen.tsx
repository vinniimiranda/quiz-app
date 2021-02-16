import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
//@ts-ignore
import PlayAndWin from '../assets/images/play_and_win.png'
import { useNavigation } from '@react-navigation/native';
import API from '../services/api';
import { useUser } from '../context/UserContext';

const { height } = Dimensions.get('window')

export default function HomeScreen() {
  const { navigate } = useNavigation()
  const [quizzes, setQuizzes] = useState([])
  const { user } = useUser()
  useEffect(() => {
    API.get('/categories').then(({ data }) => setQuizzes(data)).catch((e) =>
      console.log(e.response.data))
    return () => {

    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={{
        height: height / 4,
        backgroundColor: '#2a2b31',
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        zIndex: 1,
      }}>
        <View style={styles.title}>
          <Image
            source={{
              uri: user?.avatar
            }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>
            {user?.name}
        </Text>
        </View>
      </View>
      <View style={{
        backgroundColor: '#1d2544',
        height: '40%',
        margin: 20,
        position: 'relative',
        top: '-15%',
        marginBottom: 0,
        marginTop: 0,
        borderRadius: 10,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <Image source={PlayAndWin} style={{
          width: '48%',
          height: '100%',
          resizeMode: 'cover',
          borderRadius: 10,
        }} />
        <View style={{
          backgroundColor: "#1d2544",
          width: "48%", marginLeft: '4%'
        }}>
          <Text style={{
            color: '#FFF',
            fontFamily: 'Rubik-bold',
            fontSize: 25,
            textTransform: "uppercase"
          }}>
            Jogue &{'\n'}
            Ganhe
        </Text>
          <Text style={{
            color: '#999',
            marginTop: 10,
            fontFamily: 'Rubik'
          }}>
            As melhores perguntas para você testar seu conhecimento!
        </Text>
        </View>
      </View>
      <View style={{
        paddingLeft: 20,
        top: -50,
        minHeight: height / 3.5,
        marginBottom: 10,
        paddingBottom: 10,
        // flex: 1,
      }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingRight: 20,
        }}>
          <Text style={styles.quizTitle}>Top Quiz Categories</Text>
          <TouchableOpacity style={{
            backgroundColor: '#06d3f625',
            padding: 5,
            paddingRight: 15,
            paddingLeft: 15,
            borderRadius: 10
          }}>
            <Text style={{
              color: '#06d3f6',
              fontFamily: 'Rubik-bold'
            }}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} style={styles.quizList}>
          {quizzes.map(({ name, imageUrl }) => (
            <TouchableOpacity
              style={styles.quizCategory}
              key={name}
              onPress={() => {
                navigate('Quiz', { name })
              }}>
              <Image source={{ uri: imageUrl }} style={styles.quizImage} />
              <Text>{name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    fontFamily: 'Rubik',
    backgroundColor: '#2a2b31'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  userName: {
    fontSize: 20,
    marginLeft: 15,
    color: '#fff',
    fontFamily: 'Rubik'
  },
  quizTitle: {
    fontFamily: 'Rubik',
    fontSize: 22,
    marginBottom: 10
  },
  quizList: {
    display: 'flex',
    flexDirection: 'row',
  },
  quizCategory: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: 100,
    borderRadius: 10,
    marginRight: 35,
    marginBottom: 20,
    marginLeft: 0,
    elevation: 2,
  },
  quizImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 10
  }

});
