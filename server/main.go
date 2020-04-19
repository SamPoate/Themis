package main

import (
	"fmt"
	"log"
	"net/http"

	"./router"

	"github.com/rs/cors"
)

func main() {
	r := router.Router()

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://127.0.0.1:5500"},
		AllowCredentials: true,
	})

	handler := c.Handler(r)

	fmt.Println("Starting server on the port 8080...")
	fmt.Println("===================================")

	log.Fatal(http.ListenAndServe(":8080", handler))
}
