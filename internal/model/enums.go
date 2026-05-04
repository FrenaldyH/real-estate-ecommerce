package model

type (
	ListingType    string
	PropertyStatus string
	PaymentMethod  string
	UserRole       string
)

const (
	// ListingType
	ListingTypeSell ListingType = "dijual"
	ListingTypeRent ListingType = "disewa"

	// PropertyStatus
	StatusAvailable PropertyStatus = "available"
	StatusSold      PropertyStatus = "sold"
	StatusRented    PropertyStatus = "rented"
	StatusInactive  PropertyStatus = "inactive"

	// PaymentMethod
	PaymentCash         PaymentMethod = "cash"
	PaymentKPR          PaymentMethod = "kpr"
	PaymentCashBertahap PaymentMethod = "cash_bertahap"
	PaymentAll          PaymentMethod = "all"

	// UserRole
	RoleUser  UserRole = "user"
	RoleAgent UserRole = "agent"
	RoleOwner UserRole = "owner"
)
