import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NativeBaseProvider } from "native-base"

import React, { createContext, useEffect, useState } from "react"
import { Button } from "native-base"
import { ChatRoom } from "./pages/ChatRoom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { Logout } from "./pages/Logout"
import { Signup } from "./pages/Signup"
import { Todo } from "./pages/Todo"
import { User } from "firebase/auth"
import { firebaseAuth } from "./utils/firebase"
import axios from "axios"

export type RootStackParamList = {
  Home: undefined
  Todo: undefined
  Login: undefined
  Signup: undefined
  ChatRoom: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

type TypeUserContext = {
  loginUser: undefined | User
  setLoginUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const userContext = createContext<TypeUserContext | undefined>(undefined)

export default function App() {
  const [loginUser, setLoginUser] = useState<User>()

  useEffect(() => {
    if (firebaseAuth.currentUser) setLoginUser(firebaseAuth.currentUser)
  }, [])

  const getUserInfo = () => {
    const user = loginUser
    const url = "http://127.0.0.1:8080/api/user/" + user?.uid

    axios.get(url).then((res) => {
      console.log(res)
    })
  }

  return (
    <userContext.Provider value={{ loginUser, setLoginUser }}>
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
                  <>
                    <Button p="2" colorScheme="indigo" onPress={getUserInfo}>
                      until
                    </Button>
                    <Button p="2" colorScheme="indigo" onPress={Logout}>
                      ログアウト
                    </Button>
                  </>
                ),
              }}
            />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </userContext.Provider>
  )
}
