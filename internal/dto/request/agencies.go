package request

type CreateAgenciesRequest struct {
	AgencyName  string `json:"agency_name"  binding:"required,min=3,max=100"`
	Address     string `json:"address"      binding:"required,min=10,max=255"`
	PhoneNumber string `json:"phone_number" binding:"required,min=7,max=20"`
	Email       string `json:"email"        binding:"required,email,max=255"`
	NIB         string `json:"nib"          binding:"required,max=255"`
}
