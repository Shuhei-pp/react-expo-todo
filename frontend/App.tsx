import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { Home } from "./pages/Home"
import { Todo } from "./pages/Todo"

export type RootStackParamList = {
  Home: undefined
  Todo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Todo" component={Todo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
