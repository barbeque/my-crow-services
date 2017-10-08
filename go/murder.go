package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
)

type cawResponse struct {
	Noises []string `json:"noises"`
}

func handleCaw(w http.ResponseWriter, r *http.Request) {
	parts := strings.Split(r.URL.Path, "/")
	cawCount, err := strconv.Atoi(parts[len(parts)-1])
	if err != nil || cawCount < 1 {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(err.Error()))
	} else {
		var noises []string
		for i := 0; i < cawCount; i++ {
			noises = append(noises, "caw")
		}
		rawResp := cawResponse{noises}
		asJSON, err := json.Marshal(rawResp)
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			w.Write([]byte(err.Error()))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(asJSON)
	}
}

func main() {
	http.HandleFunc("/caw/", handleCaw)
	http.ListenAndServe(":8080", nil)
}
