import { useEffect, useState } from 'react';

export type Region = 'BR' | 'EU' | 'OTHER';
export type Currency = 'BRL' | 'EUR' | 'USD';

const EU_COUNTRIES = new Set([
  'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT',
  'LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE',
  // Common adjacent countries that use EUR or are in Europe (treat as EU for EUR)
  'IS','LI','NO','CH','GB','MC','SM','VA','AD'
]);

interface GeoState {
  region: Region;
  currency: Currency;
  countryCode: string | null;
  loading: boolean;
}

const STORAGE_KEY = 'geo-region-v1';

export const useGeolocation = (): GeoState => {
  const [state, setState] = useState<GeoState>(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return { ...parsed, loading: false };
      }
    } catch {}
    return { region: 'BR', currency: 'BRL', countryCode: null, loading: true };
  });

  useEffect(() => {
    if (!state.loading) return;
    let cancelled = false;

    const detect = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        if (!res.ok) throw new Error('geo failed');
        const data = await res.json();
        const country: string = (data.country_code || '').toUpperCase();
        let region: Region = 'OTHER';
        let currency: Currency = 'USD';
        if (country === 'BR') {
          region = 'BR'; currency = 'BRL';
        } else if (EU_COUNTRIES.has(country)) {
          region = 'EU'; currency = 'EUR';
        }
        const next = { region, currency, countryCode: country, loading: false };
        if (!cancelled) {
          setState(next);
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
        }
      } catch {
        if (!cancelled) setState(s => ({ ...s, loading: false }));
      }
    };
    detect();
    return () => { cancelled = true; };
  }, [state.loading]);

  return state;
};
