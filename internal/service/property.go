package service

import (
	"errors"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/dto"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/repository"
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
	Delete(id uint) error
}

// Implement

type propertyService struct {
	repo repository.PropertyRepository
}

func NewPropertyService(repo repository.PropertyRepository) PropertyService {
	return &propertyService{repo: repo}
}

// Helpers

func mapToListResponse(p model.Property) dto.PropertyListResponse {
	res := dto.PropertyListResponse{
		ID:          p.ID,
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
	if err != nil {
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

func (s *propertyService) Delete(id uint) error {
	// Pastikan property ada sebelum dihapus
	_, err := s.repo.FindByID(id)
	if err != nil {
		return errors.New("property not found")
	}
	return s.repo.Delete(id)
}
