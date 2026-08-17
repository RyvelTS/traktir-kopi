package main

import (
	"log"
	"os"
	"traktir-backend/internal/config"
	"traktir-backend/internal/handlers"
	"traktir-backend/internal/services"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Initialize Database
	config.InitDatabase()

	// 2. Initialize Services and Handlers
	paymentService := services.NewPaymentService()
	donationHandler := handlers.NewDonationHandler(paymentService)

	// 3. Setup Router
	r := gin.Default()

	// Disable untrusted proxy header spoofing
	r.SetTrustedProxies(nil)

	r.Use(cors.Default())

	api := r.Group("/api")
	{
		api.GET("/donations", donationHandler.GetDonations)
		api.POST("/donate", donationHandler.CreateDonation)
		api.POST("/webhook", donationHandler.HandleWebhook)
		api.POST("/donate/success", donationHandler.ManualSuccess)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server running on :%s\n", port)
	r.Run(":" + port)
}
