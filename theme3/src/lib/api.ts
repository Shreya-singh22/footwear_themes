"use client";
import { useState, useEffect } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/storefront/public';

class StorefrontAPI {
  // Automatically extracts the subdomain from the URL
  static get subdomain(): string {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const parts = hostname.split('.');
      if (hostname.includes('localhost') && parts.length >= 2 && parts[0] !== 'localhost') {
        return parts[0];
      } else if (parts.length > 2) {
        return parts[0];
      }
    }
    return process.env.NEXT_PUBLIC_SUBDOMAIN || 'preview';
  }

  static async getStoreCustomization() {
    try {
      const res = await fetch(`${API_BASE_URL}/${this.subdomain}/customization`);
      const data = await res.json();
      return data.success ? data.data : null;
    } catch {
      return null;
    }
  }
}

// React Hook used to pull and auto-update data
export function useStore() {
  const [customization, setCustomization] = useState<any>(null);

  // 1. Fetch initial live data on load
  useEffect(() => {
    StorefrontAPI.getStoreCustomization().then(data => data && setCustomization(data));
  }, []);

  // 2. Listen for 'postMessage' from the Admin Dashboard for instant live-preview
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'ORBIT_CUSTOMIZATION_UPDATE') {
        setCustomization((prev: any) => ({ ...prev, ...e.data.data }));
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return { customization };
}
