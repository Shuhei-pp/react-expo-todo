import axios from "axios"
import { useContext, useEffect, useRef, useState } from "react"
import { GiftedChat } from "react-native-gifted-chat"
import { userContext } from "../App"

type Message = {
  _id: number
  text: string
  createdAt: Date
  user: {
    _id: number
    name: string
    avatar: string
  }
}

export const ChatRoom = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      _id: 1,
      text: "Hello developer",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
  ])
  
  const webSocketRef = useRef<WebSocket>()
  const resorceUserContext = useContext(userContext)

  useEffect(() => {
    // TODO: url env
    const socket = new WebSocket("ws://127.0.0.1:8080/ws")
    webSocketRef.current = socket
    console.log("Successfully Connected")
    // webSocketRef.current.send('Hi From the Client!')
    // socket.onmessage = (event) => {
    //   console.log(event.data)
    // }

    return () => socket.close()
  }, [])

  const onSend = (message: Message[]) => {
    // TODO: constant
    const url = "http://127.0.0.1:8080/message"
    axios.post(url, {
      // TODO: ?使わず
      user_id:resorceUserContext?.loginUser?.uid,
      content:message[message.length-1].text
    })

    setMessages([...message, ...messages])
    if (webSocketRef.current) {
      webSocketRef.current.send("message")
    }
  }

  if (webSocketRef.current) {
    webSocketRef.current.onmessage = () => {
      console.log("received messages!!")
    }
  }

  return (
    <GiftedChat
      messages={messages}
      placeholder="テキストを入力してください"
      onSend={(message) => onSend(message)}
      user={{
        _id: 1,
        name: "me",
      }}
      textInputProps={{
        borderColor: "white",
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 5,
        paddingTop: 7,
        backgroundColor: "white",
      }}
      messagesContainerStyle={{
        backgroundColor: "white",
      }}
    />
  )
}
