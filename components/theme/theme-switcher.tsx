'use client';

import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
  const [mode, setMode] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  return (
    <button
      className="glass px-2 py-1 rounded-md"
      onClick={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))}
      title="Toggle theme"
    >
      {mode === 'dark' ? 'Dark' : 'Light'}
    </button>
  );
}
