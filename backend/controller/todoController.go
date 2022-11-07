package controller

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/websocket"
)

type Todo struct {
	// Id int `json:"id"`
	Text string `json:"text"`
}

func RegistTodo(c *gin.Context) {
	var todo Todo

	if err := c.ShouldBindJSON(&todo);err!= nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	db, err := sql.Open("mysql", "test_user:password@(db:3306)/test_database")
	defer db.Close()
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	if _, err = db.Exec("INSERT INTO todos (text) VALUES (?)",todo.Text); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, 111111)
}

func GetTodos(c *gin.Context) {

	db, err := sql.Open("mysql", "test_user:password@(db:3306)/test_database")
	defer db.Close()
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	rows, err := db.Query("SELECT text FROM todos")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	var todos []Todo

	for rows.Next(){
		var todo Todo
		if err = rows.Scan(&todo.Text);err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		todos = append(todos, todo)
	}

	c.JSON(http.StatusOK, todos)
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func ServeWs(c *gin.Context, w http.ResponseWriter, r *http.Request){
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }
	ws,err :=upgrader.Upgrade(w,r,nil)
	
	if err != nil {
		fmt.Print(err.Error())
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}
	log.Println("Client Connected")

	err = ws.WriteMessage(1, []byte("Hi Client!"))
	if err != nil {
			log.Println(err)
	}
	// defer ws.Close()

	for {
		_, msg, err := ws.ReadMessage()
		if err != nil {
			c.Error(err)
			break
		}
		fmt.Println(string(msg))

		c.JSON(http.StatusOK,msg)
	}
	return
}
