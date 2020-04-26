package router

import (
	"net/http"

	"../middleware"
	"github.com/gorilla/mux"
)

// Router is exported and used in main.go
func Router() *mux.Router {
	router := mux.NewRouter()

	// Handle API routes
	api := router.PathPrefix("/api/").Subrouter()
	api.HandleFunc("/users", middleware.GetUsers).Methods("GET", "OPTIONS")
	api.HandleFunc("/user", middleware.CreateUser).Methods("POST", "OPTIONS")
	// api.HandleFunc("/undoTask/{id}", middleware.UndoTask).Methods("PUT", "OPTIONS")
	// api.HandleFunc("/deleteAllTask", middleware.DeleteAllTask).Methods("DELETE", "OPTIONS")

	// Serve static files
	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("../frontend/dist/"))))

	// Serve index page on all unhandled routes
	router.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "../frontend/dist/index.html")
	})

	return router
}
