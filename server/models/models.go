package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Rounds : Returns the current rounds
type Rounds struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name   string
	Status bool
}

// User : user Object
type User struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	DisplayName string             `json:"display_name,omitempty"`
	Username    string             `json:"username,omitempty"`
	Password    byte               `json:"password,omitempty"`
}
