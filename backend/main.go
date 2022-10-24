package main

import (
	"expo/controller"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.POST("/todo",controller.RegistTodo)
	router.Run(":8080")
}
