package models

type Donation struct {
	ID      string `gorm:"primaryKey" json:"id"`
	Name    string `json:"name" binding:"required"`
	Message string `json:"message" binding:"required"`
	Amount  int64  `json:"amount" binding:"required,gt=0"`
	Status  string `json:"status"`
}
