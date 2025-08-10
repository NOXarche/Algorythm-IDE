'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Check } from 'lucide-react';

const themes = [
  {
    name: 'AlgoRhythm Dark',
    id: 'algorhythm-dark',
    colors: {
      primary: '#FF8C32',
      secondary: '#FFA63F',
      background: '#0E0E10',
      surface: '#1E1E2E'
    }
  },
  {
    name: 'Ocean Blue',
    id: 'ocean-blue',
    colors: {
      primary: '#0EA5E9',
      secondary: '#38BDF8',
      background: '#0F172A',
      surface: '#1E293B'
    }
  },
  {
    name: 'Forest Green',
    id: 'forest-green',
    colors: {
      primary: '#10B981',
      secondary: '#34D399',
      background: '#064E3B',
      surface: '#065F46'
    }
  },
  {
    name: 'Purple Haze',
    id: 'purple-haze',
    colors: {
      primary: '#8B5CF6',
      secondary: '#A78BFA',
      background: '#1E1B4B',
      surface: '#312E81'
    }
  }
];

export default function ThemesPage() {
  const [selectedTheme, setSelectedTheme] = useState('algorhythm-dark');

  const applyTheme = (theme: typeof themes[0]) => {
    const root = document.documentElement;
    root.style.setProperty('--accent', theme.colors.primary);
    root.style.setProperty('--accent-light', theme.colors.secondary);
    root.style.setProperty('--bg', theme.colors.background);
    setSelectedTheme(theme.id);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <Palette size={28} className="text-accent" />
        <h1 className="text-3xl font-heading">Themes</h1>
      </motion.div>

      <p className="opacity-70">
        Customize the appearance of your AlgoRhythm experience with these beautiful themes.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {themes.map((theme, index) => (
          <motion.div
            key={theme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass p-4 rounded-lg cursor-pointer transition ${
              selectedTheme === theme.id ? 'ring-2 ring-accent' : 'hover:shadow-glow'
            }`}
            onClick={() => applyTheme(theme)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-poppins">{theme.name}</h3>
              {selectedTheme === theme.id && (
                <Check size={18} className="text-accent" />
              )}
            </div>

            <div className="flex gap-2 mb-3">
              <div 
                className="w-6 h-6 rounded-full border border-white/20"
                style={{ backgroundColor: theme.colors.primary }}
              />
              <div 
                className="w-6 h-6 rounded-full border border-white/20"
                style={{ backgroundColor: theme.colors.secondary }}
              />
              <div 
                className="w-6 h-6 rounded-full border border-white/20"
                style={{ backgroundColor: theme.colors.surface }}
              />
            </div>

            <div className="text-xs space-y-1 opacity-60">
              <div>Primary: {theme.colors.primary}</div>
              <div>Secondary: {theme.colors.secondary}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-4 rounded-lg">
        <h3 className="font-poppins mb-2">Custom Theme</h3>
        <p className="text-sm opacity-70 mb-3">
          Want to create your own theme? Contact us or contribute to our open-source project!
        </p>
        <button className="btn-neon px-4 py-2">
          Request Custom Theme
        </button>
      </div>
    </div>
  );
}