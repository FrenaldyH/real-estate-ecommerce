package response

type AgencyResponse struct {
	ID          uint   `json:"id"`
	AgencyName  string `json:"agency_name"`
	Address     string `json:"address"`
	PhoneNumber string `json:"phone_number"`
	Email       string `json:"email"`
	NIB         string `json:"nib"`
}
