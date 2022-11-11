import React from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Button, SafeAreaView, StyleSheet } from "react-native"
import { RootStackParamList } from "../App"

type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

type Props = {
  navigation: DetailScreenNavigationProp
}

export const Home = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        title="Todo"
        onPress={() => {
          navigation.navigate("Todo")
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Login")
        }}
      />
      <Button
        title="Signup"
        onPress={() => {
          navigation.navigate("Signup")
        }}
      />
      <Button
        title="ChatRoom"
        onPress={() => {
          navigation.navigate("ChatRoom")
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "2%",
    marginBottom: "2%",
  },
})
