'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics 4 tracking
export function GoogleAnalytics({ GA_MEASUREMENT_ID }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();

    // Load gtag script
    if (typeof window !== 'undefined' && !window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      const configScript = document.createElement('script');
      configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', {
          page_path: '${url}',
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
      `;
      document.head.appendChild(configScript);
      
      window.gtag = function(){window.dataLayer.push(arguments);};
    } else if (window.gtag) {
      // Track page view
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, GA_MEASUREMENT_ID]);

  return null;
}

// Event tracking functions
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackDownload = (filename) => {
  trackEvent('download', 'engagement', filename);
};

export const trackExternalLink = (url) => {
  trackEvent('click', 'external_link', url);
};

export const trackPublication = (publicationTitle) => {
  trackEvent('view', 'publication', publicationTitle);
};