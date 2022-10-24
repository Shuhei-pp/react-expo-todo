import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
import React,{ useState } from 'react'
import { Button, FlatList, SafeAreaView, StyleSheet, Text, TextInput } from 'react-native'
import { Home } from './pages/Home'
import { Todo } from './pages/Todo'

export type RootStackParamList = {
  Home: undefined
  Todo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Todo" component={Todo} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}
