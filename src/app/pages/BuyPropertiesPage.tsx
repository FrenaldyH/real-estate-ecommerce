import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function BuyPropertiesPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to unified properties page with buy filter
    navigate('/properties?type=buy', { replace: true });
  }, [navigate]);

  return null;
}
