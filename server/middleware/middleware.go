package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"../models"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const databaseName = "test"

// collection object/instance
var usersCollection *mongo.Collection
var teamsCollection *mongo.Collection
var roundsCollection *mongo.Collection

func init() {
	// loads values from .env into the system
	if err := godotenv.Load(); err != nil {
		log.Print("No .env file found")
	}

	//Set connection string
	connectionString, exists := os.LookupEnv("CONNECTION_STRING")

	if exists {
		clientOptions := options.Client().ApplyURI(connectionString)

		client, err := mongo.Connect(context.Background(), clientOptions)

		if err != nil {
			log.Fatal(err)
		}

		// Check the connection
		err = client.Ping(context.Background(), nil)

		if err != nil {
			log.Fatal(err)
		}

		fmt.Println("Connected to MongoDB!")

		usersCollection = client.Database(databaseName).Collection("users")
		teamsCollection = client.Database(databaseName).Collection("teams")
		roundsCollection = client.Database(databaseName).Collection("rounds")

		fmt.Printf("%v Collection instance created!\n", strings.Title(usersCollection.Name()))
		fmt.Printf("%v Collection instance created!\n", strings.Title(teamsCollection.Name()))
		fmt.Printf("%v Collection instance created!\n", strings.Title(roundsCollection.Name()))
	}
}

// CreateUser Creates a user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	user := &models.User{}

	err := json.NewDecoder(r.Body).Decode(user)

	if err != nil {
		log.Println(err.Error())
		http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		return
	}

	fmt.Println(user)

	// hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 8)

	if err != nil {
		log.Fatal(err)
	}

	// user.Password = hashedPassword

	insertResult, err := usersCollection.InsertOne(context.Background(), user)

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Inserted User", insertResult)

	json.NewEncoder(w).Encode(user)
}

// GetUsers gets all users
func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/x-www-form-urlencoded")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	payload := getUsers()
	json.NewEncoder(w).Encode(payload)
}

func getUsers() []primitive.M {
	cur, err := usersCollection.Find(context.Background(), bson.D{{}})
	if err != nil {
		log.Fatal(err)
	}

	var results []primitive.M
	for cur.Next(context.Background()) {
		var result bson.M

		e := cur.Decode(&result)

		if e != nil {
			log.Fatal(e)
		}

		results = append(results, result)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	return results
}
