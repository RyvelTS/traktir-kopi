package services

import (
	"crypto/sha512"
	"encoding/hex"
	"os"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

type PaymentService struct {
	snapClient snap.Client
	serverKey  string
}

func NewPaymentService() *PaymentService {
	serverKey := os.Getenv("MIDTRANS_SERVER_KEY")
	var client snap.Client
	client.New(serverKey, midtrans.Sandbox)

	return &PaymentService{
		snapClient: client,
		serverKey:  serverKey,
	}
}

// Calls Midtrans to generate a transaction popup token
func (s *PaymentService) CreateSnapToken(orderID string, amount int64, customerName string) (string, error) {
	snapReq := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  orderID,
			GrossAmt: amount,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: customerName,
		},
	}

	resp, err := s.snapClient.CreateTransaction(snapReq)
	if err != nil {
		return "", err
	}

	return resp.Token, nil
}

// Validates that a webhook genuinely came from Midtrans
func (s *PaymentService) VerifySignature(orderID, statusCode, grossAmount, signatureKey string) bool {
	payload := orderID + statusCode + grossAmount + s.serverKey
	hasher := sha512.New()
	hasher.Write([]byte(payload))
	calculated := hex.EncodeToString(hasher.Sum(nil))

	return calculated == signatureKey
}
