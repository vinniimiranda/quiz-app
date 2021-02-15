import * as React from 'react';
import { StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import PlayAndWin from '../assets/images/play_and_win.png'
import { useNavigation } from '@react-navigation/native';
const topQuiz = [
  { name: 'Javascript', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png' },
  { name: 'Typescript', image: 'https://miro.medium.com/max/816/1*mn6bOs7s6Qbao15PMNRyOA.png' },
  { name: 'CSharp', image: 'https://pluralsight.imgix.net/paths/path-icons/csharp-e7b8fcd4ce.png' },
  { name: 'Java', image: 'data:image/png;base64,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' },
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
