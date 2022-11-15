package main

import (
	"expo/controller"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:19006"},
		AllowMethods: []string{
			"POST",
			"GET",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Access-Control-Allow-Credentials",
			"Access-Control-Allow-Headers",
			"Content-Type",
			"Content-Length",
			"Accept-Encoding",
			"Authorization",
		},
    AllowCredentials: true,
    MaxAge: 24 * time.Hour,
	}))

	router.POST("/todo",controller.RegistTodo)
	router.GET("/todo",controller.GetTodos)
	router.POST("/message",controller.SaveMessage)
	router.GET("/messages",controller.GetMessages)
	router.GET("/ws",func(c *gin.Context){controller.ServeWs(c ,c.Writer, c.Request)})
	router.Run(":8080")
}
