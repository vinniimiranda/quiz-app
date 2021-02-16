import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useFonts, Rubik_400Regular, Rubik_700Bold } from '@expo-google-fonts/rubik';
import Colors from './constants/Colors';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { UserProvider } from './context/UserContext';

export default function App() {
  let [fontsLoaded] = useFonts({
    'Rubik': Rubik_400Regular,
    'Rubik-bold': Rubik_700Bold
  });

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete && !fontsLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <UserProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar
            style={'light'}
            backgroundColor={Colors[colorScheme].headerColor}
          />
        </UserProvider>
      </SafeAreaProvider>
    );
  }
}
