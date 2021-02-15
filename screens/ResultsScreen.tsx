import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../types';
import Trophy from '../assets/images/trophy.png'
import Colors from '../constants/Colors';
import { Text, View } from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme';

export default function ResultsScreen({
  navigation,
}: StackScreenProps<RootStackParamList, 'NotFound'>) {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Result</Text>
      <View>
        <Image
          source={Trophy}
          style={{
            width: 200,
            height: 180,
          }}
        />
      </View>
      <Text style={{
        fontSize: 30
      }}>Parabéns!</Text>
      <Text>Você mandou muito bem e acertou todas!!!</Text>

      <View style={{
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 18,
          color: '#999'
        }}>SEU SCORE</Text>

        <View style={{
          flexDirection: 'row'
        }}>
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold',
            color: Colors.light.successColor
          }}>
            20
      </Text >
          <Text style={{
            fontSize: 30,
            fontWeight: 'bold'
          }}>/20</Text>
        </View>
      </View>
      <View style={{
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 18,
          color: '#999'
        }}>MOEDAS GANHAS</Text>
        <Text style={{
          fontSize: 30,
          fontWeight: 'bold',
        }}>500</Text>
      </View>
      <View style={{
        flexDirection: 'row',
        width: '100%',
        padding: 20,
        justifyContent: 'space-between'
      }}>
        <TouchableOpacity onPress={() => navigation.replace('Root')} style={[styles.share, {
          backgroundColor: Colors[colorScheme].errorColor
        }]}>
          <Text style={[styles.shareText, {
            color: Colors[colorScheme].background
          }]}>Compartilhar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.replace('Root')} style={[styles.newQuiz, {
          backgroundColor: Colors[colorScheme].primaryColor
        }]}>
          <Text style={[styles.shareText, {
            color: Colors[colorScheme].background
          }]}>Novo Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
  share: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    width: '46%',
    height: 60,
    borderRadius: 10,
  },
  shareText: {
    color: "#333",
    fontSize: 18,
  },
  newQuiz: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '46%',
    borderRadius: 10,
  }
});
