package controller

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type Client struct {
	WebSocket *websocket.Conn
}

type Room struct {
	Clients []*Client
}

var room = Room{}

func (room *Room) AddClient(client *Client) {
	room.Clients = append(room.Clients, client)
}

func (room *Room)RemoveClient(removeClient *Client){
	var newRoom Room
	for _, client:= range room.Clients {
		if client.WebSocket != removeClient.WebSocket{
			newRoom.Clients = append(newRoom.Clients,client)
		}
	}
	room.Clients = newRoom.Clients
}

func (room *Room) publish(messageType int, msg []byte) error {
	for _, client := range room.Clients {
		if err := client.WebSocket.WriteMessage(messageType, msg); err != nil {
			return err
		}
	}
	return nil
}

func ServeWs(c *gin.Context, w http.ResponseWriter, r *http.Request) {
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws, err := upgrader.Upgrade(w, r, nil)
	defer ws.Close()
	if err != nil {
		log.Println(1, err.Error())
		return
	}
	log.Println("Client Connected")

	if err = ws.WriteMessage(1, []byte("Hi Client!")); err != nil {
		log.Println(2, err.Error())
		return
	}

	client := &Client{WebSocket: ws}

	room.AddClient(client)

	for {
		messageType, msg, err := ws.ReadMessage()
		if err != nil {
			log.Println(3, err.Error())
			break
		}

		if err = room.publish(messageType, msg); err != nil {
			log.Println(4, err.Error())
			break
		}
	}

	room.RemoveClient(client)
	return
}
