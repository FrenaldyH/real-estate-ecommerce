package config

import (
	"log"

	"github.com/FrenaldyH/real-estate-ecommerce/backend/internal/model"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/hash"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/helper"
	"github.com/FrenaldyH/real-estate-ecommerce/backend/pkg/logger"
	"gorm.io/gorm"
)

func RunSeeder(db *gorm.DB) {
	seedUsers(db)
	seedAgencies(db)
	seedPropertyTypes(db)
	seedFacilityTypes(db)
	seedAgents(db)
	seedProperties(db)
	seedPropertyImages(db)
	seedPropertyFacilities(db)
	seedReviews(db)
	seedWishlists(db)
	log.Println("Seeder selesai!")
}

// 1. USERS

func seedUsers(db *gorm.DB) {
	users := []model.User{
		{
			NIK:         "3578123456789001",
			Username:    "budi_santoso",
			FullName:    "Budi Santoso",
			Email:       "budi@gmail.com",
			PhoneNumber: "081234567890",
			Password:    hash.MustHashPassword("password123"),
			Role:        model.RoleUser,
		},
		{
			NIK:         "3578123456789002",
			Username:    "siti_rahma",
			FullName:    "Siti Rahmawati",
			Email:       "siti@gmail.com",
			PhoneNumber: "081234567891",
			Password:    hash.MustHashPassword("password123"),
			Role:        model.RoleUser,
		},
		{
			NIK:         "3578123456789003",
			Username:    "andi_wijaya",
			FullName:    "Andi Wijaya",
			Email:       "andi@gmail.com",
			PhoneNumber: "081234567892",
			Password:    hash.MustHashPassword("password123"),
			Role:        model.RoleAgent,
		},
		{
			NIK:         "3578123456789004",
			Username:    "dewi_kusuma",
			FullName:    "Dewi Kusuma",
			Email:       "dewi@gmail.com",
			PhoneNumber: "081234567893",
			Password:    hash.MustHashPassword("password123"),
			Role:        model.RoleAgent,
		},
		{
			NIK:         "3578123456789005",
			Username:    "admin_properti",
			FullName:    "Admin Properti",
			Email:       "admin@properti.com",
			PhoneNumber: "081234567894",
			Password:    hash.MustHashPassword("password123"),
			Role:        model.RoleOwner,
		},
	}

	for _, u := range users {
		db.Where("nik = ?", u.NIK).FirstOrCreate(&u)
	}
	logger.Log.Debug("OK User seeded")
}

// 2. AGENCIES
func seedAgencies(db *gorm.DB) {
	agencies := []model.Agency{
		{
			AgencyName:  "PT Properti Nusantara",
			Address:     "Jl. Sudirman No. 1, Jakarta Pusat",
			PhoneNumber: "0211234567",
			Email:       "info@nusantara.com",
			NIB:         "1234567890123",
		},
		{
			AgencyName:  "CV Griya Sejahtera",
			Address:     "Jl. Diponegoro No. 45, Surabaya",
			PhoneNumber: "0317654321",
			Email:       "info@griyasejahtera.com",
			NIB:         "1234567890124",
		},
		{
			AgencyName:  "PT Rumah Impian",
			Address:     "Jl. Gatot Subroto No. 12, Bandung",
			PhoneNumber: "0229876543",
			Email:       "info@rumahimpian.com",
			NIB:         "1234567890125",
		},
		{
			AgencyName:  "CV Tanah Mas",
			Address:     "Jl. Ahmad Yani No. 88, Semarang",
			PhoneNumber: "0241122334",
			Email:       "info@tanahmas.com",
			NIB:         "1234567890126",
		},
		{
			AgencyName:  "PT Investasi Properti Indonesia",
			Address:     "Jl. Thamrin No. 5, Jakarta Selatan",
			PhoneNumber: "0215566778",
			Email:       "info@ipi.com",
			NIB:         "1234567890127",
		},
	}

	for _, a := range agencies {
		db.Where("nib = ?", a.NIB).FirstOrCreate(&a)
	}
	logger.Log.Debug("OK agencies seeded")
}

// 3. PROPERTY TYPES
func seedPropertyTypes(db *gorm.DB) {
	types := []model.PropertyType{
		{Name: "Rumah"},
		{Name: "Apartemen"},
		{Name: "Ruko"},
		{Name: "Tanah"},
		{Name: "Villa"},
	}

	for _, t := range types {
		db.Where("name = ?", t.Name).FirstOrCreate(&t)
	}
	logger.Log.Debug("OK PropertyTypes seeded")
}

// 4. FACILITY TYPES
func seedFacilityTypes(db *gorm.DB) {
	types := []model.FacilityType{
		{Name: "Kamar Tidur"},
		{Name: "Kamar Mandi"},
		{Name: "Garasi"},
		{Name: "Kolam Renang"},
		{Name: "Taman"},
	}

	for _, t := range types {
		db.Where("name = ?", t.Name).FirstOrCreate(&t)
	}
	logger.Log.Debug("OK FacilityTypes seeded")
}

// 5. AGENTS
func seedAgents(db *gorm.DB) {
	// Ambil user dengan role agent (ID 3 dan 4)
	var userAndi, userDewi model.User
	db.Where("username = ?", "andi_wijaya").First(&userAndi)
	db.Where("username = ?", "dewi_kusuma").First(&userDewi)

	// Ambil agency
	var agency1, agency2 model.Agency
	db.Where("nib = ?", "1234567890123").First(&agency1)
	db.Where("nib = ?", "1234567890124").First(&agency2)

	agents := []model.Agent{
		{
			UserID:              userAndi.ID,
			BioDescription:      helper.Ptr("Agen properti berpengalaman 5 tahun di Jakarta"),
			AgencyID:            &agency1.ID,
			SIUP4:               helper.Ptr("SIUP4-001-JKT-2024"),
			TotalPropertiesSold: 10,
		},
		{
			UserID:              userDewi.ID,
			BioDescription:      helper.Ptr("Spesialis properti mewah Surabaya dan sekitarnya"),
			AgencyID:            &agency2.ID,
			SIUP4:               helper.Ptr("SIUP4-002-SBY-2024"),
			TotalPropertiesSold: 1,
		},
	}

	for _, a := range agents {
		db.Where("user_id = ?", a.UserID).FirstOrCreate(&a)
	}
	logger.Log.Debug("OK Agents seeded")
}

// 6. PROPERTIES
func seedProperties(db *gorm.DB) {
	var userAndi, userDewi model.User
	db.Where("username = ?", "andi_wijaya").First(&userAndi)
	db.Where("username = ?", "dewi_kusuma").First(&userDewi)

	var agent1, agent2 model.Agent
	db.Where("user_id = ?", userAndi.ID).First(&agent1)
	db.Where("user_id = ?", userDewi.ID).First(&agent2)

	var typeRumah, typeApartemen, typeRuko, typeTanah, typeVilla model.PropertyType
	db.Where("name = ?", "Rumah").First(&typeRumah)
	db.Where("name = ?", "Apartemen").First(&typeApartemen)
	db.Where("name = ?", "Ruko").First(&typeRuko)
	db.Where("name = ?", "Tanah").First(&typeTanah)
	db.Where("name = ?", "Villa").First(&typeVilla)

	properties := []model.Property{
		{
			AgentID:         agent1.ID,
			PropertyTypeID:  typeRumah.ID,
			Title:           "Rumah Mewah BSD City Tangerang",
			Description:     "Rumah 2 lantai dengan desain modern minimalis di BSD City. Lokasi strategis dekat dengan sekolah dan pusat perbelanjaan.",
			Price:           2500000000,
			Address:         "Jl. Pahlawan No. 12, BSD City",
			City:            "Tangerang",
			Province:        "Banten",
			ListingType:     model.ListingTypeSell,
			Status:          model.StatusAvailable,
			PaymentMethod:   model.PaymentAll,
			IsNegotiable:    true,
			FacingDirection: helper.Ptr("Timur"),
			HasCarAccess:    true,
			ElectricalPower: 2200,
			IMB_PBB:         true,
		},
		{
			AgentID:         agent1.ID,
			PropertyTypeID:  typeApartemen.ID,
			Title:           "Apartemen Studio Sudirman Jakarta Pusat",
			Description:     "Apartemen studio fully furnished di pusat bisnis Jakarta. Cocok untuk profesional muda.",
			Price:           8500000,
			Address:         "Jl. Sudirman No. 55, Jakarta Pusat",
			City:            "Jakarta",
			Province:        "DKI Jakarta",
			ListingType:     model.ListingTypeRent,
			Status:          model.StatusAvailable,
			PaymentMethod:   model.PaymentCash,
			IsNegotiable:    false,
			FacingDirection: helper.Ptr("Barat"),
			HasCarAccess:    true,
			ElectricalPower: 1300,
			IMB_PBB:         true,
		},
		{
			AgentID:         agent2.ID,
			PropertyTypeID:  typeRuko.ID,
			Title:           "Ruko Strategis Gubeng Surabaya",
			Description:     "Ruko 3 lantai di lokasi premium Gubeng Surabaya. Cocok untuk berbagai jenis usaha.",
			Price:           3800000000,
			Address:         "Jl. Gubeng Raya No. 33, Surabaya",
			City:            "Surabaya",
			Province:        "Jawa Timur",
			ListingType:     model.ListingTypeSell,
			Status:          model.StatusAvailable,
			PaymentMethod:   model.PaymentKPR,
			IsNegotiable:    true,
			HasCarAccess:    true,
			ElectricalPower: 5500,
			IMB_PBB:         true,
		},
		{
			AgentID:         agent2.ID,
			PropertyTypeID:  typeTanah.ID,
			Title:           "Tanah Kavling Citraland Surabaya Barat",
			Description:     "Tanah kavling siap bangun di perumahan premium Citraland. Lingkungan aman dan nyaman.",
			Price:           1200000000,
			Address:         "Citraland Blok G No. 7, Surabaya Barat",
			City:            "Surabaya",
			Province:        "Jawa Timur",
			ListingType:     model.ListingTypeSell,
			Status:          model.StatusAvailable,
			PaymentMethod:   model.PaymentCashBertahap,
			IsNegotiable:    true,
			HasCarAccess:    true,
			ElectricalPower: 0,
			IMB_PBB:         false,
		},
		{
			AgentID:         agent1.ID,
			PropertyTypeID:  typeVilla.ID,
			Title:           "Villa Pemandangan Sawah Ubud Bali",
			Description:     "Villa eksklusif dengan pemandangan sawah hijau di Ubud Bali. Cocok untuk investasi properti wisata.",
			Price:           45000000,
			Address:         "Jl. Raya Ubud No. 99, Ubud",
			City:            "Gianyar",
			Province:        "Bali",
			ListingType:     model.ListingTypeRent,
			Status:          model.StatusAvailable,
			PaymentMethod:   model.PaymentCash,
			IsNegotiable:    false,
			FacingDirection: helper.Ptr("Selatan"),
			HasCarAccess:    false,
			ElectricalPower: 4400,
			IMB_PBB:         true,
		},
	}

	for _, p := range properties {
		db.Where("title = ?", p.Title).FirstOrCreate(&p)
	}
	logger.Log.Debug("OK Properties seeded")
}

// 7. PROPERTY IMAGES
func seedPropertyImages(db *gorm.DB) {
	var properties []model.Property
	db.Find(&properties)

	for _, p := range properties {
		images := []model.PropertyImage{
			{
				PropertyID: p.ID,
				ImageURL:   "https://storage.properti.com/" + p.Title + "/main.jpg",
				IsPrimary:  true,
				SortOrder:  1,
			},
			{
				PropertyID: p.ID,
				ImageURL:   "https://storage.properti.com/" + p.Title + "/ruang-tamu.jpg",
				IsPrimary:  false,
				SortOrder:  2,
			},
			{
				PropertyID: p.ID,
				ImageURL:   "https://storage.properti.com/" + p.Title + "/kamar-utama.jpg",
				IsPrimary:  false,
				SortOrder:  3,
			},
		}
		for _, img := range images {
			db.Where("property_id = ? AND image_url = ?", img.PropertyID, img.ImageURL).FirstOrCreate(&img)
		}
	}
	logger.Log.Debug("OK PropertyImgages seeded")
}

// 8. PROPERTY FACILITIES
func seedPropertyFacilities(db *gorm.DB) {
	var properties []model.Property
	db.Find(&properties)

	var ftKamarTidur, ftKamarMandi, ftGarasi, ftKolam, ftTaman model.FacilityType
	db.Where("name = ?", "Kamar Tidur").First(&ftKamarTidur)
	db.Where("name = ?", "Kamar Mandi").First(&ftKamarMandi)
	db.Where("name = ?", "Garasi").First(&ftGarasi)
	db.Where("name = ?", "Kolam Renang").First(&ftKolam)
	db.Where("name = ?", "Taman").First(&ftTaman)

	facilitiesPerProperty := [][]model.PropertyFacility{
		// Rumah BSD
		{
			{FacilityTypeID: ftKamarTidur.ID, Amount: 4},
			{FacilityTypeID: ftKamarMandi.ID, Amount: 3},
			{FacilityTypeID: ftGarasi.ID, Amount: 2},
			{FacilityTypeID: ftKolam.ID, Amount: 1},
			{FacilityTypeID: ftTaman.ID, Amount: 1},
		},
		// Apartemen Studio
		{
			{FacilityTypeID: ftKamarTidur.ID, Amount: 1},
			{FacilityTypeID: ftKamarMandi.ID, Amount: 1},
		},
		// Ruko Gubeng
		{
			{FacilityTypeID: ftKamarMandi.ID, Amount: 3},
			{FacilityTypeID: ftGarasi.ID, Amount: 1},
		},
		// Tanah Kavling (tidak ada fasilitas)
		{},
		// Villa Ubud
		{
			{FacilityTypeID: ftKamarTidur.ID, Amount: 3},
			{FacilityTypeID: ftKamarMandi.ID, Amount: 3},
			{FacilityTypeID: ftKolam.ID, Amount: 1},
			{FacilityTypeID: ftTaman.ID, Amount: 1},
		},
	}

	for i, p := range properties {
		if i >= len(facilitiesPerProperty) {
			break
		}
		for _, f := range facilitiesPerProperty[i] {
			f.PropertyID = p.ID
			db.Where("property_id = ? AND facility_type_id = ?", f.PropertyID, f.FacilityTypeID).
				FirstOrCreate(&f)
		}
	}
	logger.Log.Debug("OK UsePropertyFacility seeded")
}

// 9. REVIEWS
func seedReviews(db *gorm.DB) {
	var userBudi, userSiti model.User
	db.Where("username = ?", "budi_santoso").First(&userBudi)
	db.Where("username = ?", "siti_rahma").First(&userSiti)

	var properties []model.Property
	db.Find(&properties)

	if len(properties) < 3 {
		log.Println("⚠️ Tidak cukup properties untuk seed reviews")
		return
	}

	reviews := []model.Review{
		{
			UserID:     userBudi.ID,
			PropertyID: properties[0].ID,
			Rating:     5,
			Comment:    helper.Ptr("Properti sangat bagus, sesuai dengan deskripsi. Agen sangat profesional dan ramah!"),
		},
		{
			UserID:     userSiti.ID,
			PropertyID: properties[0].ID,
			Rating:     4,
			Comment:    helper.Ptr("Lokasi strategis dan lingkungan nyaman. Harga sedikit tinggi tapi sebanding dengan fasilitas."),
		},
		{
			UserID:     userBudi.ID,
			PropertyID: properties[1].ID,
			Rating:     4,
			Comment:    helper.Ptr("Apartemen bersih dan nyaman. Akses transportasi mudah. Recommended!"),
		},
		{
			UserID:     userSiti.ID,
			PropertyID: properties[2].ID,
			Rating:     3,
			Comment:    helper.Ptr("Ruko cukup bagus tapi perlu renovasi di beberapa bagian. Harga masih bisa dinegosiasi."),
		},
		{
			UserID:     userBudi.ID,
			PropertyID: properties[4].ID,
			Rating:     5,
			Comment:    helper.Ptr("Villa luar biasa! Pemandangan sawah yang indah dan suasana tenang. Pasti akan kembali lagi."),
		},
	}

	for _, r := range reviews {
		db.Where("user_id = ? AND property_id = ?", r.UserID, r.PropertyID).FirstOrCreate(&r)
	}
	logger.Log.Debug("OK Reviews seeded")
}

// 10. WISHLISTS

func seedWishlists(db *gorm.DB) {
	var userBudi, userSiti model.User
	db.Where("username = ?", "budi_santoso").First(&userBudi)
	db.Where("username = ?", "siti_rahma").First(&userSiti)

	var properties []model.Property
	db.Find(&properties)

	if len(properties) < 5 {
		log.Println("⚠️ Tidak cukup properties untuk seed wishlists")
		return
	}

	wishlists := []model.Wishlist{
		{UserID: userBudi.ID, PropertyID: properties[0].ID},
		{UserID: userBudi.ID, PropertyID: properties[2].ID},
		{UserID: userBudi.ID, PropertyID: properties[4].ID},
		{UserID: userSiti.ID, PropertyID: properties[1].ID},
		{UserID: userSiti.ID, PropertyID: properties[3].ID},
	}

	for _, w := range wishlists {
		db.Where("user_id = ? AND property_id = ?", w.UserID, w.PropertyID).FirstOrCreate(&w)
	}
	logger.Log.Debug("OK Wishlists seeded")
}
