'use client';

import { useState } from 'react';

export default function CopyButton({ text, label = 'Copy' }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    } catch (e) {
      setDone(false);
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="focus-ring rounded-sm border border-rule px-2.5 py-1 text-[13px] text-ink2 hover:text-ink"
      aria-live="polite"
    >
      {done ? 'Copied' : label}
    </button>
  );
}
