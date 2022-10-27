
import axios from "axios"
import React,{ useEffect, useState } from "react"
import { Button, SafeAreaView, StyleSheet, Text, TextInput } from "react-native"

type TypeTodo = {
  text:string
}

export const Todo = () => {
  const [text, setText] = useState<string>("")
  const [todos, setTodos] = useState<TypeTodo[]>([])
  const handleSubmit = () => {
    const url = "http://127.0.0.1:8080/todo"
    const entityTodos = todos
    entityTodos.push({ text })
    setTodos(entityTodos)
    axios.post(url, {
      text
    })
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

  useEffect(() => {
    const url = "http://127.0.0.1:8080/todo"
    axios.get(url)
      .then((res) => {
        setTodos(res.data)
      })
  },[])

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
            {index}:{todo.text}
          </Text>
        )
      })}
    </SafeAreaView>
  )
}
