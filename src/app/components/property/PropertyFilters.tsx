// ============================================================================
// Property Filters Component
// Reusable filter controls for property listings
// ============================================================================

import { Input } from '../common';
import { PROPERTY_CATEGORIES, PRICE_RANGES } from '../../constants';
import type { PropertyFilters as PropertyFiltersType } from '../../types';

interface PropertyFiltersProps {
  filters: PropertyFiltersType;
  onFilterChange: (filters: PropertyFiltersType) => void;
}

export function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
  const handleChange = (key: keyof PropertyFiltersType, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Filter Properti</h3>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategori
        </label>
        <select
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value || undefined)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Semua Kategori</option>
          {PROPERTY_CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.icon} {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <Input
        label="Lokasi"
        placeholder="Cari lokasi..."
        value={filters.location || ''}
        onChange={(e) => handleChange('location', e.target.value || undefined)}
      />

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rentang Harga
        </label>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name="priceRange"
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onChange={() => {
                  handleChange('minPrice', range.min);
                  handleChange('maxPrice', range.max);
                }}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kamar Tidur (min)
        </label>
        <select
          value={filters.bedrooms || ''}
          onChange={(e) => handleChange('bedrooms', e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Semua</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      {/* Bathrooms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kamar Mandi (min)
        </label>
        <select
          value={filters.bathrooms || ''}
          onChange={(e) => handleChange('bathrooms', e.target.value ? parseInt(e.target.value) : undefined)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Semua</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => onFilterChange({})}
        className="w-full px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
      >
        Reset Filter
      </button>
    </div>
  );
}
