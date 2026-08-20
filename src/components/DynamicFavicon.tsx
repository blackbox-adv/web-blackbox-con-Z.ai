'use client';

import { useEffect } from 'react';

interface DynamicFaviconProps {
  customIcon?: string | null;
}

export function DynamicFavicon({ customIcon }: DynamicFaviconProps) {
  useEffect(() => {
    // Check if custom icon passed or saved in localStorage
    const savedIcon = customIcon || (typeof window !== 'undefined' ? localStorage.getItem('blackbox_cached_icon') : null);
    const targetIcon = savedIcon || '/favicon.png';

    if (targetIcon) {
      // Update or create standard favicon link
      const links = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon'], link[rel='apple-touch-icon']");
      if (links.length > 0) {
        links.forEach(link => {
          link.href = targetIcon;
        });
      } else {
        const link = document.createElement('link');
        link.type = 'image/png';
        link.rel = 'shortcut icon';
        link.href = targetIcon;
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    }
  }, [customIcon]);

  return null;
}
