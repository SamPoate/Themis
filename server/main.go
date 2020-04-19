package main

import (
	"fmt"
	"net/http"

	"./router"

	"github.com/gorilla/handlers"
)

func main() {
	r := router.Router()

	fmt.Println("Starting server on the port 8080...")
	fmt.Println("===================================")

	http.ListenAndServe(":8080", handlers.CORS()(r))
}
