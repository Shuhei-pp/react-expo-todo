
import { useEffect } from "react"
import {  Button, SafeAreaView, StyleSheet, Text } from "react-native"



export const ChatRoom = () => {
  const socket = new WebSocket("ws://127.0.0.1:8080/ws")
  useEffect(() => {
    // const url = "ws://127.0.0.1:8080/ws"
    // axios.get(url)
    //   .then((res) => {
    //   console.log(res)
    // })
  }, [])

  socket.onopen = () => {
    console.log('Successfully Connected')
    socket.send('Hi From the Client!')
  }
  socket.onclose = (event) => {
    console.log('Socket Closed Connection: ', event)
    socket.send('Client Closed!')
  }

  socket.onmessage = (event) => {
    console.log(event.data)
  }

  socket.onerror = (error) => {
    console.log('Socket Error: ', error)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>apapaap</Text>
      <Button onPress={()=>socket.send("aaaa")}title="aaaa"/>
      
    
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
