package controller

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type Message struct {
	Id         int    `json:"id"`
	UserId     int    `json:"user_id"`
	Content    string `json:"content"`
	created_at time.Time
}

func SaveMessage(c *gin.Context) {
	var message Message
	if err := c.ShouldBindJSON(&message); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	db, err := sql.Open("mysql", "test_user:password@(db:3306)/test_database")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	if _, err = db.Exec("INSERT  INTO messages (content, user_id )VALUE (?,?) ", message.Content, message.UserId); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, "ok")
}

func GetMessages(c *gin.Context) {
	db, err := sql.Open("mysql", "test_user:password@(db:3306)/test_database?parseTime=true")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	rows, err := db.Query("SELECT id, user_id, content,created_at FROM messages ")
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	var messages []Message
	for rows.Next() {
		var message Message
		if err := rows.Scan(&message.Id, &message.UserId, &message.Content, &message.created_at); err != nil {
			c.JSON(http.StatusInternalServerError, err.Error())
			return
		}
		messages = append(messages, message)
	}

	c.JSON(http.StatusOK, messages)
}
