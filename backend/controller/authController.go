package controller

import (
	"context"
	"net/http"

	firebase "firebase.google.com/go/v4"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/option"

)

type Cokkie struct {
	UserId string `json:"id"`
	Token  string `json:"token"`
}

func SetCokkie(c *gin.Context) {
	var cokkie Cokkie

	if err := c.ShouldBindJSON(&cokkie); err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	c.SetCookie("user_id", cokkie.UserId, 3600, "/", "localhost", false, true)
	c.SetCookie("token", cokkie.Token, 3600, "/", "localhost", false, true)

}

func GetUser(c *gin.Context){

	uid :=c.Param("id")
	opt := option.WithCredentialsFile("./firebase/keyfile.json")
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	client ,err := app.Auth(context.Background())
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

	user,err :=client.GetUser(context.Background(),uid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, err.Error())
		return
	}

c.JSON(http.StatusOK,user)

}
