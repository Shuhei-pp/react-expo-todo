import React from "react"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { Button, SafeAreaView, StyleSheet, Text } from "react-native"
import { RootStackParamList } from "../App"

type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>

type Props = {
  navigation: DetailScreenNavigationProp
}

export const Home = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>apapaap</Text>
      <Button
        title="Todo"
        onPress={() => {
          navigation.navigate("Todo")
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
