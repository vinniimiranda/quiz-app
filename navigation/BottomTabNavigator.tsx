import { MaterialIcons as Icon } from '@expo/vector-icons';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Dimensions, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import { BottomTabParamList } from '../types';
import QuizScreen from '../screens/QuizScreen';
import ResultsScreen from '../screens/ResultsScreen'

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const { width } = Dimensions.get('window')

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <BottomTabBar  {...props}
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          borderTopColor: '#fff',
          height: 70
        }} />}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarButton: ({ onPress, }) => {
            const isFocused = useIsFocused();
            return <TouchableOpacity onPress={onPress} style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              flex: 1,
              paddingLeft: 10,
              paddingRight: 10,
              width: width / 3

            }}>
              <View style={{
                backgroundColor: isFocused ? '#06d3f625' : 'transparent',
                padding: 35,
                paddingTop: 5,
                paddingBottom: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
                <Icon name="home" color={isFocused ? '#06d3f6' : '#666'} size={25} />
                <Text style={{
                  color: isFocused ? '#06d3f6' : '#333',
                  fontSize: 10,
                  fontWeight: 'bold'
                }}>Home</Text>
              </View>
            </TouchableOpacity>
          }
        }}
      />
      <BottomTab.Screen
        name="Notify"
        component={NotifyNavigator}
        options={{
          tabBarButton: ({ onPress }) => {
            const isFocused = useIsFocused();
            return <TouchableOpacity onPress={onPress} style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              flex: 1,
              paddingLeft: 10,
              paddingRight: 10,
              width: width / 3
            }}>
              <View style={{
                backgroundColor: isFocused ? '#06d3f625' : 'transparent',
                padding: 25,
                paddingTop: 5,
                paddingBottom: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
                <Icon name="notifications" color={isFocused ? '#06d3f6' : '#666'} size={25} />
                <Text style={{
                  color: isFocused ? '#06d3f6' : '#666',

                  fontSize: 10,
                  fontWeight: 'bold'
                }}>Notificações</Text>
              </View>
            </TouchableOpacity>
          }
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarVisible: true,
          tabBarButton: ({ onPress }) => {
            const isFocused = useIsFocused();
            return <TouchableOpacity onPress={onPress} style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              flex: 1,
              paddingLeft: 12,
              paddingRight: 10,
              width: width / 3
            }}>
              <View style={{
                backgroundColor: isFocused ? '#06d3f625' : 'transparent',
                padding: 20,
                paddingTop: 5,
                paddingBottom: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
                <Icon name="settings" color={isFocused ? '#06d3f6' : '#666'} size={25} />
                <Text style={{
                  color: isFocused ? '#06d3f6' : '#666',

                  fontSize: 10,
                  fontWeight: 'bold'
                }}>Configurações</Text>
              </View>
            </TouchableOpacity>
          }
        }}
      />
    </BottomTab.Navigator>
  );
}


// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Quiz"
        component={QuizScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const NotifyStack = createStackNavigator();
const NotifyScreen = () => <View style={{ flex: 1, padding: 30 }}><Text style={{
  color: '#333'
}}>Notifications</Text></View>
function NotifyNavigator() {
  return (
    <NotifyStack.Navigator>
      <NotifyStack.Screen
        name="Notify"
        component={NotifyScreen}

        options={{ headerShown: false, }}
      />
    </NotifyStack.Navigator>
  );
}


const SettingsSTack = createStackNavigator()
const SettingsScreen = () => <View style={{ flex: 1, padding: 30 }}><Text>Settings</Text></View>

function SettingsNavigator() {
  return (
    <SettingsSTack.Navigator>
      <SettingsSTack.Screen
        name="Settings"
        component={SettingsScreen}

        options={{ headerShown: false, }}
      />
    </SettingsSTack.Navigator>
  );
}
