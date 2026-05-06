// Shared property data for the entire application

export interface Property {
  id: number;
  image: string;
  price: number;
  priceType: 'sale' | 'rent';
  rentPeriod?: 'bulan' | 'tahun';
  title: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  buildingSize: number;
  certificate?: string;
  yearBuilt?: number;
  furnishing?: string;
  floors?: number;
  type: string;
  featured?: boolean;
  agent?: {
    name: string;
    image: string;
    responseTime?: string;
  };
}

// All properties (both for sale and for rent)
export const allProperties: Property[] = [
  // Properties for SALE
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1706808849803-f61304e024ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 2450000000,
    priceType: 'sale',
    title: 'Rumah Modern Minimalis di Menteng',
    location: 'Menteng, Jakarta Pusat',
    bedrooms: 4,
    bathrooms: 3,
    landSize: 180,
    buildingSize: 250,
    certificate: 'SHM',
    yearBuilt: 2020,
    furnishing: 'Semi Furnished',
    floors: 2,
    type: 'rumah',
    featured: true,
    agent: {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 1850000000,
    priceType: 'sale',
    title: 'Villa Mewah dengan Taman Luas',
    location: 'Pondok Indah, Jakarta Selatan',
    bedrooms: 5,
    bathrooms: 4,
    landSize: 300,
    buildingSize: 400,
    certificate: 'SHM',
    yearBuilt: 2019,
    furnishing: 'Fully Furnished',
    floors: 2,
    type: 'villa',
    agent: {
      name: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      responseTime: 'Respon < 10 menit'
    }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 3200000000,
    priceType: 'sale',
    title: 'Rumah Kolam Renang Premium',
    location: 'BSD City, Tangerang',
    bedrooms: 4,
    bathrooms: 3,
    landSize: 250,
    buildingSize: 300,
    certificate: 'SHM',
    yearBuilt: 2021,
    furnishing: 'Semi Furnished',
    floors: 2,
    type: 'rumah',
    featured: true,
    agent: {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 2750000000,
    priceType: 'sale',
    title: 'Rumah Tropis Modern 2 Lantai',
    location: 'Kemang, Jakarta Selatan',
    bedrooms: 4,
    bathrooms: 4,
    landSize: 200,
    buildingSize: 280,
    certificate: 'SHM',
    yearBuilt: 2020,
    furnishing: 'Unfurnished',
    floors: 2,
    type: 'rumah',
    agent: {
      name: 'Dewi Santika',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',
      responseTime: 'Respon < 15 menit'
    }
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1706808849802-8f876ade0d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 1950000000,
    priceType: 'sale',
    title: 'Rumah Kontemporer Elegant',
    location: 'Bintaro, Tangerang Selatan',
    bedrooms: 3,
    bathrooms: 2,
    landSize: 120,
    buildingSize: 160,
    certificate: 'SHM',
    yearBuilt: 2022,
    furnishing: 'Semi Furnished',
    floors: 2,
    type: 'rumah',
    agent: {
      name: 'Lisa Wijaya',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1706808849780-7a04fbac83ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 4500000000,
    priceType: 'sale',
    title: 'Villa Luxury Resort Style',
    location: 'Sentul, Bogor',
    bedrooms: 5,
    bathrooms: 5,
    landSize: 500,
    buildingSize: 600,
    certificate: 'SHM',
    yearBuilt: 2021,
    furnishing: 'Fully Furnished',
    floors: 2,
    type: 'villa',
    featured: true,
    agent: {
      name: 'Rina Permata',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1628744448968-bf7a32f8dd33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 2150000000,
    priceType: 'sale',
    title: 'Rumah Skandinavia Modern',
    location: 'Serpong, Tangerang Selatan',
    bedrooms: 4,
    bathrooms: 3,
    landSize: 150,
    buildingSize: 195,
    certificate: 'SHM',
    yearBuilt: 2021,
    furnishing: 'Semi Furnished',
    floors: 2,
    type: 'rumah',
    agent: {
      name: 'Ahmad Rizki',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      responseTime: 'Respon < 10 menit'
    }
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1628744448839-170bf324f27e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 1650000000,
    priceType: 'sale',
    title: 'Rumah Klasik Elegan',
    location: 'Cipete, Jakarta Selatan',
    bedrooms: 3,
    bathrooms: 2,
    landSize: 110,
    buildingSize: 150,
    certificate: 'SHM',
    yearBuilt: 2018,
    furnishing: 'Unfurnished',
    floors: 2,
    type: 'rumah',
    agent: {
      name: 'David Tan',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
      responseTime: 'Respon < 15 menit'
    }
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 950000000,
    priceType: 'sale',
    title: 'Apartemen Modern 2 Kamar Premium',
    location: 'Sudirman, Jakarta Pusat',
    bedrooms: 2,
    bathrooms: 1,
    landSize: 65,
    buildingSize: 65,
    certificate: 'Strata Title',
    yearBuilt: 2022,
    furnishing: 'Fully Furnished',
    floors: 1,
    type: 'apartemen',
    agent: {
      name: 'Kevin Hartono',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 3800000000,
    priceType: 'sale',
    title: 'Rumah Mewah dengan View Gunung',
    location: 'Bandung Utara',
    bedrooms: 5,
    bathrooms: 4,
    landSize: 400,
    buildingSize: 450,
    certificate: 'SHM',
    yearBuilt: 2020,
    furnishing: 'Semi Furnished',
    floors: 2,
    type: 'rumah',
    featured: true,
    agent: {
      name: 'Siti Nurhaliza',
      image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 1200000000,
    priceType: 'sale',
    title: 'Apartemen Premium 3 Kamar',
    location: 'Kuningan, Jakarta Selatan',
    bedrooms: 3,
    bathrooms: 2,
    landSize: 95,
    buildingSize: 95,
    certificate: 'Strata Title',
    yearBuilt: 2021,
    furnishing: 'Fully Furnished',
    floors: 1,
    type: 'apartemen',
    agent: {
      name: 'Sarah Johnson',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
      responseTime: 'Respon < 10 menit'
    }
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 850000000,
    priceType: 'sale',
    title: 'Tanah Kavling Siap Bangun',
    location: 'Cibubur, Jakarta Timur',
    bedrooms: 0,
    bathrooms: 0,
    landSize: 200,
    buildingSize: 0,
    certificate: 'SHM',
    yearBuilt: 2023,
    type: 'tanah',
    agent: {
      name: 'Michael Chen',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      responseTime: 'Respon < 15 menit'
    }
  },
  // Properties for RENT
  {
    id: 101,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 15000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Apartemen Modern 2BR Fully Furnished',
    location: 'Sudirman, Jakarta Pusat',
    bedrooms: 2,
    bathrooms: 1,
    landSize: 65,
    buildingSize: 65,
    certificate: 'Strata Title',
    yearBuilt: 2022,
    furnishing: 'Fully Furnished',
    floors: 1,
    type: 'apartemen',
    featured: true,
    agent: {
      name: 'Jessica Tanoto',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 102,
    image: 'https://images.unsplash.com/photo-1706808849803-f61304e024ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 45000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Rumah Mewah Menteng Fully Furnished',
    location: 'Menteng, Jakarta Pusat',
    bedrooms: 4,
    bathrooms: 3,
    landSize: 180,
    buildingSize: 250,
    certificate: 'SHM',
    yearBuilt: 2020,
    furnishing: 'Fully Furnished',
    floors: 2,
    type: 'rumah',
    featured: true,
    agent: {
      name: 'Michael Wijaya',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 103,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 22000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Apartemen 3BR Premium Kuningan',
    location: 'Kuningan, Jakarta Selatan',
    bedrooms: 3,
    bathrooms: 2,
    landSize: 95,
    buildingSize: 95,
    certificate: 'Strata Title',
    yearBuilt: 2021,
    furnishing: 'Fully Furnished',
    floors: 1,
    type: 'apartemen',
    agent: {
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 10 menit'
    }
  },
  {
    id: 104,
    image: 'https://images.unsplash.com/photo-1706808849777-96e0d7be3bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 60000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Villa Mewah Pondok Indah',
    location: 'Pondok Indah, Jakarta Selatan',
    bedrooms: 5,
    bathrooms: 4,
    landSize: 300,
    buildingSize: 400,
    certificate: 'SHM',
    yearBuilt: 2019,
    furnishing: 'Fully Furnished',
    floors: 2,
    type: 'villa',
    featured: true,
    agent: {
      name: 'David Lim',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 105,
    image: 'https://images.unsplash.com/photo-1628744448968-bf7a32f8dd33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 35000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Rumah Skandinavia Serpong',
    location: 'Serpong, Tangerang Selatan',
    bedrooms: 4,
    bathrooms: 3,
    landSize: 150,
    buildingSize: 195,
    certificate: 'SHM',
    yearBuilt: 2021,
    furnishing: 'Semi Furnished',
    floors: 2,
    type: 'rumah',
    agent: {
      name: 'Linda Susanto',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 15 menit'
    }
  },
  {
    id: 106,
    image: 'https://images.unsplash.com/photo-1706808849802-8f876ade0d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 28000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Rumah Kontemporer Bintaro',
    location: 'Bintaro, Tangerang Selatan',
    bedrooms: 3,
    bathrooms: 2,
    landSize: 120,
    buildingSize: 160,
    certificate: 'SHM',
    yearBuilt: 2022,
    furnishing: 'Semi Furnished',
    floors: 2,
    type: 'rumah',
    agent: {
      name: 'Amanda Putri',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 10 menit'
    }
  },
  {
    id: 107,
    image: 'https://images.unsplash.com/photo-1628744448839-170bf324f27e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 25000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Rumah Klasik Cipete',
    location: 'Cipete, Jakarta Selatan',
    bedrooms: 3,
    bathrooms: 2,
    landSize: 110,
    buildingSize: 150,
    certificate: 'SHM',
    yearBuilt: 2018,
    furnishing: 'Unfurnished',
    floors: 2,
    type: 'rumah',
    agent: {
      name: 'William Hartono',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 15 menit'
    }
  },
  {
    id: 108,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 240000000,
    priceType: 'rent',
    rentPeriod: 'tahun',
    title: 'Villa View Gunung Bandung',
    location: 'Bandung Utara',
    bedrooms: 5,
    bathrooms: 4,
    landSize: 400,
    buildingSize: 450,
    certificate: 'SHM',
    yearBuilt: 2020,
    furnishing: 'Fully Furnished',
    floors: 2,
    type: 'villa',
    featured: true,
    agent: {
      name: 'Diana Kusuma',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 109,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 12000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Apartemen Studio Premium Thamrin',
    location: 'Thamrin, Jakarta Pusat',
    bedrooms: 1,
    bathrooms: 1,
    landSize: 45,
    buildingSize: 45,
    certificate: 'Strata Title',
    yearBuilt: 2023,
    furnishing: 'Fully Furnished',
    floors: 1,
    type: 'apartemen',
    agent: {
      name: 'Kevin Wijaya',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 110,
    image: 'https://images.unsplash.com/photo-1706808849827-7366c098b317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 50000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Rumah Kolam Renang BSD',
    location: 'BSD City, Tangerang',
    bedrooms: 4,
    bathrooms: 3,
    landSize: 250,
    buildingSize: 300,
    certificate: 'SHM',
    yearBuilt: 2021,
    furnishing: 'Semi Furnished',
    floors: 2,
    type: 'rumah',
    featured: true,
    agent: {
      name: 'Robert Tan',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 5 menit'
    }
  },
  {
    id: 111,
    image: 'https://images.unsplash.com/photo-1706855203772-c249b75fe016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 40000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Rumah Tropis Kemang',
    location: 'Kemang, Jakarta Selatan',
    bedrooms: 4,
    bathrooms: 4,
    landSize: 200,
    buildingSize: 280,
    certificate: 'SHM',
    yearBuilt: 2020,
    furnishing: 'Fully Furnished',
    floors: 2,
    type: 'rumah',
    agent: {
      name: 'Steven Gunawan',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 10 menit'
    }
  },
  {
    id: 112,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    price: 32000000,
    priceType: 'rent',
    rentPeriod: 'bulan',
    title: 'Rumah Industrial Kelapa Gading',
    location: 'Kelapa Gading, Jakarta Utara',
    bedrooms: 3,
    bathrooms: 3,
    landSize: 175,
    buildingSize: 175,
    certificate: 'SHM',
    yearBuilt: 2021,
    furnishing: 'Semi Furnished',
    floors: 2,
    type: 'rumah',
    agent: {
      name: 'Richard Salim',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200',
      responseTime: 'Respon < 15 menit'
    }
  }
];

// Helper functions to filter properties
export const getSaleProperties = () => allProperties.filter(p => p.priceType === 'sale');
export const getRentProperties = () => allProperties.filter(p => p.priceType === 'rent');
export const getFeaturedProperties = () => allProperties.filter(p => p.featured);