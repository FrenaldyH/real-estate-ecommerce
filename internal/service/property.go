package service

import (
	"errors"
	"fmt"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
)

// Interface

type PropertyService interface {
	GetAll() ([]dto.PropertyListResponse, error)
	GetByID(id uint) (*dto.PropertyDetailResponse, error)
	GetImages(id uint) ([]dto.PropertyImageResponse, error)
	GetFacilities(id uint) ([]dto.PropertyFacilityResponse, error)
	GetByCity(city string) ([]dto.PropertyListResponse, error)
	GetByProvince(province string) ([]dto.PropertyListResponse, error)
	GetByType(typeName string) ([]dto.PropertyListResponse, error)
	GetByStatus(status string) ([]dto.PropertyListResponse, error)
	GetByListingType(listingType string) ([]dto.PropertyListResponse, error)
	GetByPriceRange(min, max float64) ([]dto.PropertyListResponse, error)
	CreatePropertyByAgent(username string, req dto.CreatePropertyRequest) (*dto.PropertyDetailResponse, error)
	UpdatePropertyByAgent(username string, propertyID uint, data map[string]any) (*dto.PropertyDetailResponse, error)
	DeletePropertyByAgent(username string, propertyID uint) error
	CreateImageByAgent(username string, propertyID uint, req dto.CreateImageRequest) (*dto.CreateImageResponse, error)
	DeleteImage(username string, propertyID uint, imageID uint) error
	AddFacility(username string, propertyID uint, req dto.CreatePropertyFacilityRequest) (*dto.PropertyFacilityResponse, error)
	UpdateFacility(username string, propertyID uint, facilityID uint, amount int) (*dto.PropertyFacilityResponse, error)
	RemoveFacility(username string, propertyID uint, facilityID uint) error
}

// Implement

type propertyService struct {
	repo         repository.PropertyRepository
	imageRepo    repository.PropertyImageRepository
	facilityRepo repository.PropertyFacilityRepository
	agentRepo    repository.AgentRepository
}

func NewPropertyService(
	repo repository.PropertyRepository,
	imageRepo repository.PropertyImageRepository,
	facilityRepo repository.PropertyFacilityRepository,
	agentRepo repository.AgentRepository,
) PropertyService {
	return &propertyService{
		repo:         repo,
		imageRepo:    imageRepo,
		facilityRepo: facilityRepo,
		agentRepo:    agentRepo,
	}
}

// Helpers

func mapToListResponse(p model.Property) dto.PropertyListResponse {
	res := dto.PropertyListResponse{
		ID:          p.ID,
		AgentID:     p.AgentID,
		Title:       p.Title,
		Price:       p.Price,
		City:        p.City,
		Province:    p.Province,
		ListingType: p.ListingType,
		Status:      p.Status,
		PropertyType: dto.PropertyTypeResponse{
			ID:   p.PropertyType.ID,
			Name: p.PropertyType.Name,
		},
	}

	// Ambil primary image jika ada
	for _, img := range p.Images {
		if img.IsPrimary {
			imgRes := dto.PropertyImageResponse{
				ID:        img.ID,
				ImageURL:  img.ImageURL,
				IsPrimary: img.IsPrimary,
				SortOrder: img.SortOrder,
			}
			res.PrimaryImage = &imgRes
			break
		}
	}

	// Facilities
	for _, f := range p.Facilities {
		res.Facilities = append(res.Facilities, dto.PropertyFacilityResponse{
			ID: f.ID,
			FacilityType: dto.FacilityTypeResponse{
				ID:   f.FacilityType.ID,
				Name: f.FacilityType.Name,
			},
			Amount: f.Amount,
		})
	}

	return res
}

func mapToListResponses(ps []model.Property) []dto.PropertyListResponse {
	result := make([]dto.PropertyListResponse, 0, len(ps))
	for _, p := range ps {
		result = append(result, mapToListResponse(p))
	}
	return result
}

func mapToDetailResponse(p model.Property) *dto.PropertyDetailResponse {
	res := &dto.PropertyDetailResponse{
		ID:              p.ID,
		AgentID:         p.AgentID,
		Title:           p.Title,
		Description:     p.Description,
		Price:           p.Price,
		Address:         p.Address,
		City:            p.City,
		Province:        p.Province,
		ListingType:     p.ListingType,
		Status:          p.Status,
		PaymentMethod:   p.PaymentMethod,
		IsNegotiable:    p.IsNegotiable,
		FacingDirection: p.FacingDirection,
		HasCarAccess:    p.HasCarAccess,
		ElectricalPower: p.ElectricalPower,
		LandSize:        p.LandSize,
		BuildingSize:    p.BuildingSize,
		Floors:          p.Floors,
		Certificate:     p.Certificate,
		Furnishing:      p.Furnishing,
		YearBuilt:       p.YearBuilt,
		IsFeatured:      p.IsFeatured,
		RentPeriod:      p.RentPeriod,
		ImbPbb:          p.ImbPbb,
	}

	// PropertyType
	pt := dto.PropertyTypeResponse{ID: p.PropertyType.ID, Name: p.PropertyType.Name}
	res.PropertyType = &pt

	// Images
	for _, img := range p.Images {
		res.Images = append(res.Images, dto.PropertyImageResponse{
			ID:        img.ID,
			ImageURL:  img.ImageURL,
			IsPrimary: img.IsPrimary,
			SortOrder: img.SortOrder,
		})
	}

	// Facilities
	for _, f := range p.Facilities {
		res.Facilities = append(res.Facilities, dto.PropertyFacilityResponse{
			ID: f.ID,
			FacilityType: dto.FacilityTypeResponse{
				ID:   f.FacilityType.ID,
				Name: f.FacilityType.Name,
			},
			Amount: f.Amount,
		})
	}

	return res
}

// Methods

func (s *propertyService) GetAll() ([]dto.PropertyListResponse, error) {
	ps, err := s.repo.FindAll()
	if err != nil {
		return nil, err
	}
	return mapToListResponses(ps), nil
}

func (s *propertyService) GetByID(id uint) (*dto.PropertyDetailResponse, error) {
	p, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}
	return mapToDetailResponse(*p), nil
}

func (s *propertyService) GetImages(id uint) ([]dto.PropertyImageResponse, error) {
	p, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	images := make([]dto.PropertyImageResponse, 0, len(p.Images))
	for _, img := range p.Images {
		images = append(images, dto.PropertyImageResponse{
			ID:        img.ID,
			ImageURL:  img.ImageURL,
			IsPrimary: img.IsPrimary,
			SortOrder: img.SortOrder,
		})
	}
	return images, nil
}

func (s *propertyService) GetFacilities(id uint) ([]dto.PropertyFacilityResponse, error) {
	p, err := s.repo.FindByID(id)
	if err != nil {
		return nil, err
	}

	facilities := make([]dto.PropertyFacilityResponse, 0, len(p.Facilities))
	for _, f := range p.Facilities {
		facilities = append(facilities, dto.PropertyFacilityResponse{
			ID: f.ID,
			FacilityType: dto.FacilityTypeResponse{
				ID:   f.FacilityType.ID,
				Name: f.FacilityType.Name,
			},
			Amount: f.Amount,
		})
	}
	return facilities, nil
}

func (s *propertyService) GetByCity(city string) ([]dto.PropertyListResponse, error) {
	ps, err := s.repo.FindByCity(city)
	if err != nil {
		return nil, err
	}
	return mapToListResponses(ps), nil
}

func (s *propertyService) GetByProvince(province string) ([]dto.PropertyListResponse, error) {
	ps, err := s.repo.FindByProvince(province)
	if err != nil {
		return nil, err
	}
	return mapToListResponses(ps), nil
}

func (s *propertyService) GetByType(typeName string) ([]dto.PropertyListResponse, error) {
	ps, err := s.repo.FindByPropertyTypeName(typeName)
	if ps == nil {
		logger.Log.Info(fmt.Sprintf("No property with type %s found", typeName))
		return nil, err
	}
	return mapToListResponses(ps), nil
}

func (s *propertyService) GetByStatus(status string) ([]dto.PropertyListResponse, error) {
	ps, err := s.repo.FindByStatus(model.PropertyStatus(status))
	if err != nil {
		return nil, err
	}
	return mapToListResponses(ps), nil
}

func (s *propertyService) GetByListingType(listingType string) ([]dto.PropertyListResponse, error) {
	ps, err := s.repo.FindByListingType(model.ListingType(listingType))
	if err != nil {
		return nil, err
	}
	return mapToListResponses(ps), nil
}

func (s *propertyService) GetByPriceRange(min, max float64) ([]dto.PropertyListResponse, error) {
	if min < 0 || max < 0 {
		return nil, errors.New("price cannot be negative")
	}
	if min > max {
		return nil, errors.New("min price cannot be greater than max price")
	}

	ps, err := s.repo.FindByPriceRange(min, max)
	if err != nil {
		return nil, err
	}
	return mapToListResponses(ps), nil
}

func (s *propertyService) CreatePropertyByAgent(username string, req dto.CreatePropertyRequest) (*dto.PropertyDetailResponse, error) {
	agentID, err := s.agentRepo.FindAgentIDByUsername(username)
	if err != nil {
		logger.Log.Info("agent id not found")
		return nil, err
	}

	rentPeriod := "-"
	if req.RentPeriod != nil {
		rentPeriod = *req.RentPeriod
	}

	newProperty := model.Property{
		AgentID:         agentID,
		PropertyTypeID:  req.PropertyTypeID,
		Title:           req.Title,
		Description:     req.Description,
		Price:           req.Price,
		Address:         req.Address,
		City:            req.City,
		Province:        req.Province,
		ListingType:     req.ListingType,
		Status:          model.StatusAvailable,
		PaymentMethod:   req.PaymentMethod,
		IsNegotiable:    req.IsNegotiable,
		FacingDirection: req.FacingDirection,
		HasCarAccess:    req.HasCarAccess,
		ElectricalPower: req.ElectricalPower,
		LandSize:        req.LandSize,
		BuildingSize:    req.BuildingSize,
		Floors:          req.Floors,
		Certificate:     req.Certificate,
		Furnishing:      req.Furnishing,
		YearBuilt:       req.YearBuilt,
		RentPeriod:      rentPeriod,
		ImbPbb:          req.ImbPbb,
	}

	if err := s.repo.Create(&newProperty); err != nil {
		logger.Log.Error(fmt.Sprintf("Failed to create property: %v", err))
		return nil, errors.New("failed to create property")
	}

	return s.GetByID(newProperty.ID)
}

func (s *propertyService) UpdatePropertyByAgent(username string, propertyID uint, data map[string]any) (*dto.PropertyDetailResponse, error) {
	agentID, err := s.agentRepo.FindAgentIDByUsername(username)
	if err != nil {
		logger.Log.Info("agent id not found")
		return nil, err
	}

	// [VERIFIKASI KEPEMILIKAN]
	p, err := s.repo.FindByID(propertyID)
	if err != nil {
		return nil, err
	}
	if p.AgentID != agentID {
		logger.Log.Warn(fmt.Sprintf("Agent %d attempted to update property %d which they do not own", agentID, propertyID))
		return nil, errors.New("unauthorized: you do not own this property")
	}

	// [UPDATE]
	if err := s.repo.Update(propertyID, data); err != nil {
		logger.Log.Error(fmt.Sprintf("Failed to update property %d: %v", propertyID, err))
		return nil, errors.New("failed to update property")
	}

	return s.GetByID(propertyID)
}

func (s *propertyService) DeletePropertyByAgent(username string, propertyID uint) error {
	agentID, err := s.agentRepo.FindAgentIDByUsername(username)
	if err != nil {
		logger.Log.Info("agent id not found")
		return err
	}

	// [VERIFIKASI KEPEMILIKAN]
	p, err := s.repo.FindByID(propertyID)
	if err != nil {
		return err
	}
	if p.AgentID != agentID {
		logger.Log.Warn(fmt.Sprintf("Agent %d attempted to delete property %d which they do not own", agentID, propertyID))
		return errors.New("unauthorized: you do not own this property")
	}

	// [DELETE]
	return s.repo.Delete(propertyID)
}

func (s *propertyService) CreateImageByAgent(username string, propertyID uint, req dto.CreateImageRequest) (*dto.CreateImageResponse, error) {
	agentID, err := s.agentRepo.FindAgentIDByUsername(username)
	if err != nil {
		logger.Log.Info("agent id not found")
		return nil, err
	}

	// [VERIFIKASI KEPEMILIKAN PROPERTI]
	p, err := s.repo.FindByID(propertyID)
	if err != nil {
		return nil, err
	}
	if p.AgentID != agentID {
		return nil, errors.New("unauthorized: you do not own this property")
	}

	img := model.PropertyImage{
		PropertyID: propertyID,
		ImageURL:   req.ImageURL,
		IsPrimary:  req.IsPrimary,
	}

	if err := s.imageRepo.Create(&img); err != nil {
		logger.Log.Error(fmt.Sprintf("Failed to save image for property %d: %v", propertyID, err))
		return nil, errors.New("failed to save image")
	}

	return &dto.CreateImageResponse{
		ID:         img.ID,
		PropertyID: img.PropertyID,
		ImageURL:   img.ImageURL,
		IsPrimary:  img.IsPrimary,
	}, nil
}

func (s *propertyService) DeleteImage(username string, propertyID uint, imageID uint) error {
	agentID, err := s.agentRepo.FindAgentIDByUsername(username)
	if err != nil {
		logger.Log.Info("agent id not found")
		return err
	}

	// [VERIFIKASI KEPEMILIKAN PROPERTI]
	p, err := s.repo.FindByID(propertyID)
	if err != nil {
		return err
	}
	if p.AgentID != agentID {
		return errors.New("unauthorized: you do not own this property")
	}

	// [VERIFIKASI KEPEMILIKAN GAMBAR PADA PROPERTI]
	_, err = s.imageRepo.FindByPropertyIDAndPropertyImageID(propertyID, imageID)
	if err != nil {
		return errors.New("image not found for this property")
	}

	if err := s.imageRepo.Delete(imageID); err != nil {
		logger.Log.Error(fmt.Sprintf("Failed to delete image %d: %v", imageID, err))
		return errors.New("failed to delete image")
	}

	return nil
}

func (s *propertyService) AddFacility(username string, propertyID uint, req dto.CreatePropertyFacilityRequest) (*dto.PropertyFacilityResponse, error) {
	agentID, err := s.agentRepo.FindAgentIDByUsername(username)
	if err != nil {
		return nil, errors.New("agent not found")
	}

	p, err := s.repo.FindByID(propertyID)
	if err != nil {
		return nil, errors.New("property not found")
	}
	if p.AgentID != agentID {
		return nil, errors.New("unauthorized: you do not own this property")
	}

	pf := &model.PropertyFacility{
		PropertyID:     propertyID,
		FacilityTypeID: req.FacilityTypeID,
		Amount:         req.Amount,
	}
	if err := s.facilityRepo.Create(pf); err != nil {
		return nil, errors.New("failed to add facility")
	}

	pf, err = s.facilityRepo.FindByID(pf.ID)
	if err != nil {
		return nil, errors.New("failed to fetch created facility")
	}

	return &dto.PropertyFacilityResponse{
		ID:     pf.ID,
		Amount: pf.Amount,
		FacilityType: dto.FacilityTypeResponse{
			ID:   pf.FacilityType.ID,
			Name: pf.FacilityType.Name,
		},
	}, nil
}

func (s *propertyService) UpdateFacility(username string, propertyID uint, facilityID uint, amount int) (*dto.PropertyFacilityResponse, error) {
	agentID, err := s.agentRepo.FindAgentIDByUsername(username)
	if err != nil {
		return nil, errors.New("agent not found")
	}

	p, err := s.repo.FindByID(propertyID)
	if err != nil {
		return nil, errors.New("property not found")
	}
	if p.AgentID != agentID {
		return nil, errors.New("unauthorized: you do not own this property")
	}

	pf, err := s.facilityRepo.FindByID(facilityID)
	if err != nil || pf.PropertyID != propertyID {
		return nil, errors.New("facility not found for this property")
	}

	if err := s.facilityRepo.Update(facilityID, map[string]any{"amount": amount}); err != nil {
		return nil, errors.New("failed to update facility")
	}

	pf, _ = s.facilityRepo.FindByID(facilityID)
	return &dto.PropertyFacilityResponse{
		ID:     pf.ID,
		Amount: pf.Amount,
		FacilityType: dto.FacilityTypeResponse{
			ID:   pf.FacilityType.ID,
			Name: pf.FacilityType.Name,
		},
	}, nil
}

func (s *propertyService) RemoveFacility(username string, propertyID uint, facilityID uint) error {
	agentID, err := s.agentRepo.FindAgentIDByUsername(username)
	if err != nil {
		return errors.New("agent not found")
	}

	p, err := s.repo.FindByID(propertyID)
	if err != nil {
		return errors.New("property not found")
	}
	if p.AgentID != agentID {
		return errors.New("unauthorized: you do not own this property")
	}

	pf, err := s.facilityRepo.FindByID(facilityID)
	if err != nil || pf.PropertyID != propertyID {
		return errors.New("facility not found for this property")
	}

	return s.facilityRepo.Delete(facilityID)
}
