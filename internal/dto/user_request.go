package dto

type CreateUserRequest struct {
	NIK         string `json:"nik" binding:"required,numeric,len=16"`
	Username    string `json:"username"     binding:"required,min=3,max=50"`
	FullName    string `json:"full_name"    binding:"required,min=1,max=100"`
	Email       string `json:"email"        binding:"required,email,max=255"`
	PhoneNumber string `json:"phone_number" binding:"required,min=7,max=20"`
	Password    string `json:"password" binding:"required,min=8,max=255"`
}

type LoginRequest struct {
	Email    string `json:"email"    binding:"required,email,max=255"`
	Password string `json:"password" binding:"required,max=255"`
}

type GetUserRequest struct {
	Username string `json:"username" binding:"required,max=50"`
}

type GetUsersRequest struct{}

type ModifyUserRequest struct {
	NIK         string `json:"nik" binding:"required,numeric,len=16"`
	FullName    string `json:"full_name"    binding:"required,min=1,max=100"`
	Email       string `json:"email"        binding:"required,email,max=255"`
	PhoneNumber string `json:"phone_number" binding:"required,min=7,max=20"`
	Password    string `json:"password" binding:"required,min=8,max=255"`
}

type RoleUserRequst struct {
	Username string `json:"username"     binding:"required,min=3,max=50"`
}

type DeleteUserRequst struct {
	Username string `json:"username"     binding:"required,min=3,max=50"`
}
