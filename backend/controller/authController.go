package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
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
