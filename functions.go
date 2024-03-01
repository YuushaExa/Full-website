package main

import (
	"math/rand"
	"time"
)

func RandomNumber(seed int64, max int) int {
	rand.Seed(time.Now().UnixNano() + seed)
	return rand.Intn(max)
}
