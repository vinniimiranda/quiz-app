import * as React from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

export default function QuizScreen({
  navigation, route
}: StackScreenProps<RootStackParamList, 'Root'>) {
  const params = route.params as any
  React.useEffect(() => {
    const { name } = params
    const parent = navigation.dangerouslyGetParent();
    parent?.setOptions({
      tabBarVisible: false
    });
    return () =>
      parent?.setOptions({
        tabBarVisible: true
      });
  }, []);
  
  const { navigate } = useNavigation()
  const colorScheme = useColorScheme();
  const [selectedOption, setSelectedOption] = React.useState(0)

  const handleSelectOption = (index: number) => {
    setSelectedOption(index)
  }

  const handleNext = () => {
    navigate('Results')
  }

  const options = [
    "Math.round",
    "Math.floor",
    "Math.down",
    "Math.trunc"
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Text>
          {params.name} Quiz
      </Text>
        <Text style={styles.quizTitle}>Question 06/20</Text>
        <View style={styles.progress}>
          {[...Array(20).fill(0)].map((item, i) => <View
            key={i}
            style={[styles.dot, { backgroundColor: i < 6 ? '#3c9' : '#ccc', }]}></View>
          )}
        </View>

        <View style={styles.question}>
          <Text style={styles.questionText}>
            Qual a função da API de Math que arredonda o valor para baixo?
          </Text>
        </View>
        <View style={styles.answers}>
          {options.map((value, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectOption(index)}
              style={[styles.option, {
                borderColor: selectedOption === index ? Colors[colorScheme].successColor : Colors[colorScheme].inactiveTextColor
              }]}>
              <Text
                style={{
                  color: selectedOption === index ? Colors[colorScheme].successColor : Colors[colorScheme].inactiveTextColor,
                  fontWeight: 'bold'
                }}>{value}</Text>
              <View
                style={[styles.check, {
                  borderWidth: selectedOption === index ? 0 : 1
                }]}>
                {selectedOption === index && <Icon name="check-circle" color="#3c9" size={22} />}
              </View>
            </TouchableOpacity>
          ))}

        </View>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => navigation.replace('Root')}
          style={[styles.exitButton, {
            borderColor: Colors[colorScheme].errorColor
          }]}
        >
          <Text
            style={{
              color: Colors[colorScheme].errorColor,
              fontSize: 18
            }}
          >Sair do Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          style={[styles.nextButton, {
            backgroundColor: Colors[colorScheme].primaryColor
          }]}>
          <Text
            style={{
              color: Colors[colorScheme].background,
              fontSize: 18
            }}
          >Próximo</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between'
  },
  main: {
    padding: 30,
    flex: 1,
  },
  quizTitle: {
    marginTop: 15,
    fontSize: 25
  },
  progress: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  dot: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    marginRight: 2,
  },
  question: {
    marginTop: 30,
  },
  questionText: {
    fontSize: 18
  },
  answers: {
    marginTop: 50,
    flex: 1,
    maxHeight: 300,
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  option: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.light.inactiveTextColor,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#999',
    display: 'flex',
    alignItems: 'center'

  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    padding: 20,
    justifyContent: 'space-between'
  },
  exitButton: {
    padding: 15,
    width: '46%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 60,
    borderRadius: 10,
  },
  nextButton: {
    padding: 15,
    width: '46%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }


});
