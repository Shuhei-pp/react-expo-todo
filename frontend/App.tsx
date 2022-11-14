import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NativeBaseProvider } from "native-base"

import React from "react"
import { Button } from "native-base"
import { ChatRoom } from "./pages/ChatRoom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Logout } from "./pages/Logout"
import { Signup } from "./pages/Signup"
import { Todo } from "./pages/Todo"

// export const authContext = createContext({
//   loginUser: firebaseAuth.currentUser,
//   setLoginUser: ()=>{}
// })

export type RootStackParamList = {
  Home: undefined
  Todo: undefined
  Login: undefined
  Signup: undefined
  ChatRoom: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  // const [loginUser,setLoginUser]= useState(auth.currentUser)
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Todo" component={Todo} />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerRight: () => (
                <Button p="2" colorScheme="indigo" onPress={Logout}>
                  ログアウト
                </Button>
              ),
            }}
          />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="ChatRoom" component={ChatRoom} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
