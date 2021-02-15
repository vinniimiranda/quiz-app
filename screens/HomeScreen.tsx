import * as React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import PlayAndWin from '../assets/images/play_and_win.png'
import { useNavigation } from '@react-navigation/native';
const topQuiz = [
  { name: 'Javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png' },
  { name: 'Typescript', image: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png' },
  { name: 'CSharp', image: 'https://pluralsight.imgix.net/paths/path-icons/csharp-e7b8fcd4ce.png' },
  { name: 'Java', image: 'https://www.ifpe.edu.br/campus/palmares/noticias/curso-de-extensao-em-java/javalogo.png'},
  { name: 'Python', image: 'https://camo.githubusercontent.com/888e388801f947dec7c3d843942c277af25fe2b1aed1821542c4e711f210312a/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f632f63332f507974686f6e2d6c6f676f2d6e6f746578742e7376672f37363870782d507974686f6e2d6c6f676f2d6e6f746578742e7376672e706e67' },
  { name: 'HTML', image: 'https://mestresdaweb.com.br/wp-content/uploads/2020/05/600px-HTML5_Badge.svg.png' },
]

const { height } = Dimensions.get('window')

export default function HomeScreen() {
  const { navigate } = useNavigation()
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
              uri: 'http://github.com/vinniimiranda.png'
            }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>
            Vinicius Miranda
        </Text>
        </View>
      </View>
      <View style={{
        backgroundColor: '#000',
        height: height / 3.75,
        margin: 20,
        position: 'relative',
        top: -60,
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
          backgroundColor: "#000",
          width: "48%", marginLeft: '4%'
        }}>
          <Text style={{
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 25,
            textTransform: "uppercase"
          }}>
            Jogue &{'\n'}
            Ganhe
        </Text>
          <Text style={{
            color: '#999',
            marginTop: 10
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
        <Text style={styles.quizTitle}>Top Quiz Categories</Text>
        <ScrollView horizontal={true} style={styles.quizList}>
          {topQuiz.map(({ name, image }) => (
            <TouchableOpacity
              style={styles.quizCategory}
              key={name}
              onPress={() => {
                navigate('Quiz', { name })
              }}>
              <Image source={{ uri: image }} style={styles.quizImage} />
              <Text>{name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView horizontal={true}  >
          {topQuiz.reverse().map(({ name, image }) => (
            <TouchableOpacity style={styles.quizCategory} key={name}>
              <Image source={{ uri: image }} style={styles.quizImage} />
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
    backgroundColor: '#2a2b31'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#fff'
  },
  quizTitle: {
    fontWeight: 'bold',
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
