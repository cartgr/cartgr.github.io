'use client';

import { useEffect, useState } from 'react';

// Light/dark switch. The initial theme is set before paint by the inline script in the layout, so this only
// reads and flips the class; it never renders theme-dependent markup on the server.
export default function ThemeToggle() {
  const [dark, setDark] = useState(null);
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);
  const flip = () => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('lb-theme', next ? 'dark' : 'light');
    } catch (e) {
      /* storage unavailable: the choice lasts for this page view only */
    }
    setDark(next);
  };
  return (
    <button
      type="button"
      onClick={flip}
      className="focus-ring rounded-sm px-1.5 py-1 text-[13px] text-ink2 hover:text-ink"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {dark === null ? 'Theme' : dark ? 'Light' : 'Dark'}
    </button>
  );
}
