
import { useState } from "react"
import { GiftedChat } from "react-native-gifted-chat"

type Message = 
  {
    _id: number,
    text: string,
    createdAt: Date,
    user: 
    {
      _id: number,
      name: string,
      avatar: string,
    },
  }

export const ChatRoom = () => {
  const [messages,setMessages] = useState<Message[]>(
    [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: 
          {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
    ],)

  const socket = new WebSocket("ws://127.0.0.1:8080/ws")

  const onSend = (message:Message[]) => {
    setMessages([...messages,...message])
  }

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
    <GiftedChat
          messages={messages}
          placeholder="テキストを入力してください"
          onSend={message => onSend(message)}
          user={{
              _id: 1,
              name: 'me',
          }}
          textInputProps={{
            borderColor: "white",
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 5,
            paddingTop: 7,
            backgroundColor: "white"
          }}
          // containerStyle={{backgroundColor: 'hsl(0, 0%, 90%)'}}
        />
  )
}
