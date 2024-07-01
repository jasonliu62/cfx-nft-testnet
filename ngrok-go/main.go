package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

type Metadata struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Image       string `json:"image"`
}

func saveMetadata(w http.ResponseWriter, r *http.Request) {
	tokenId := filepath.Base(r.URL.Path)
	var metadata Metadata
	err := json.NewDecoder(r.Body).Decode(&metadata)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	filePath := filepath.Join("metadata", tokenId+".json")
	file, err := os.Create(filePath)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	err = encoder.Encode(metadata)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"url": "https://3066-27-115-116-186.ngrok-free.app" + tokenId + ".json",
	})
}

func main() {
	http.HandleFunc("/metadata/", saveMetadata)
	fs := http.FileServer(http.Dir("metadata"))
	http.Handle("/metadata/", http.StripPrefix("/metadata", fs))

	log.Println("Starting server on :9998")
	log.Fatal(http.ListenAndServe(":9998", nil))
}
