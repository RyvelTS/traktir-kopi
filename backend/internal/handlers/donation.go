package handlers

import (
	"fmt"
	"log"
	"net/http"
	"traktir-backend/internal/config"
	"traktir-backend/internal/models"
	"traktir-backend/internal/services"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type DonationHandler struct {
	paymentService *services.PaymentService
}

func NewDonationHandler(ps *services.PaymentService) *DonationHandler {
	return &DonationHandler{paymentService: ps}
}

func (h *DonationHandler) GetDonations(c *gin.Context) {
	var donations []models.Donation
	config.DB.Where("status = ?", "PAID").Order("id desc").Find(&donations)
	c.JSON(http.StatusOK, donations)
}

func (h *DonationHandler) CreateDonation(c *gin.Context) {
	var req models.Donation
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	req.ID = fmt.Sprintf("ORDER-%s", uuid.New().String()[:8])
	req.Status = "PENDING"

	token, err := h.paymentService.CreateSnapToken(req.ID, req.Amount, req.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	config.DB.Create(&req)

	c.JSON(http.StatusOK, gin.H{
		"token":    token,
		"order_id": req.ID,
	})
}

func (h *DonationHandler) HandleWebhook(c *gin.Context) {
	var notification struct {
		OrderID           string `json:"order_id"`
		StatusCode        string `json:"status_code"`
		GrossAmount       string `json:"gross_amount"`
		SignatureKey      string `json:"signature_key"`
		TransactionStatus string `json:"transaction_status"`
	}

	if err := c.ShouldBindJSON(&notification); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid body"})
		return
	}

	isValid := h.paymentService.VerifySignature(
		notification.OrderID,
		notification.StatusCode,
		notification.GrossAmount,
		notification.SignatureKey,
	)

	if !isValid {
		log.Printf("Unauthorized webhook signature for order: %s", notification.OrderID)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid signature"})
		return
	}

	if notification.TransactionStatus == "settlement" || notification.TransactionStatus == "capture" {
		config.DB.Model(&models.Donation{}).Where("id = ?", notification.OrderID).Update("status", "PAID")
		log.Printf("Payment confirmed for order: %s", notification.OrderID)
	} else if notification.TransactionStatus == "expire" || notification.TransactionStatus == "cancel" {
		config.DB.Model(&models.Donation{}).Where("id = ?", notification.OrderID).Update("status", "FAILED")
	}

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}

func (h *DonationHandler) ManualSuccess(c *gin.Context) {
	var req struct {
		OrderID string `json:"order_id"`
	}
	if err := c.ShouldBindJSON(&req); err == nil {
		config.DB.Model(&models.Donation{}).Where("id = ?", req.OrderID).Update("status", "PAID")
	}
	c.JSON(http.StatusOK, gin.H{"status": "updated"})
}
