
import axios from "axios"
import React,{ useEffect, useState } from "react"
import { ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native"

type TypeTodo = {
  text:string
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});


export const Todo = () => {
  const [text, setText] = useState<string>("")
  const [todos, setTodos] = useState<TypeTodo[]>([])
  const [isLoading, setIsLoading] =useState<boolean>(true)
  const handleSubmit = () => {
    // TODO: constant
    const url = "http://127.0.0.1:8080/todo"
    const entityTodos = todos
    entityTodos.push({ text })
    setTodos(entityTodos)
    axios.post(url, {
      text
    })
    setText("")
  }

  useEffect(() => {
    const url = "http://127.0.0.1:8080/todo"
    axios.get(url)
      .then((res) => {
        setTodos(res.data)
      }).then(()=>{setIsLoading(false)})
  }, [])
  

    // TODO: isLoading
  return (
  <>
    {
      isLoading?(
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>)
        :(
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
        </SafeAreaView>)
      }
    </>
  )
}
