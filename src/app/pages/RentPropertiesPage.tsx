import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function RentPropertiesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to unified properties page with rent filter
    navigate('/properties?type=rent', { replace: true });
  }, [navigate]);

  return null;
}
