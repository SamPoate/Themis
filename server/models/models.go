package models

import "go.mongodb.org/mongo-driver/bson/primitive"

// Rounds : Returns the current rounds
type Rounds struct {
	ID     primitive.ObjectID
	Name   string
	Status bool
}
