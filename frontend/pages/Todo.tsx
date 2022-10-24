import React,{ useState } from "react"
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from "react-native"

export const Todo = () => {
  const [text, setText] = useState<string>("")
  const [todos, setTodos] = useState<string[]>([])
  const handleSubmit = () => {
    const entityTodos = todos
    entityTodos.push(text)
    setTodos(entityTodos)
    setText("")
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, width: 200 }}
        onChangeText={(event) => setText(event)}
        value={text}
      />
      <Button
        title={"登録"}
        onPress={() => {
          handleSubmit()
        }}
      />
      {todos.map((todo, index) => {
        return (
          <Text key={index}>
            {index}:{todo}
          </Text>
        )
      })}
    </SafeAreaView>
  )
}
