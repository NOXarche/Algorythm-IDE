'use client';

import Link from 'next/link';
import { Home, Code, Music2, Files, Paintbrush } from 'lucide-react';

const items = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/code', label: 'Code Room', icon: Code },
  { href: '/music', label: 'Music Hub', icon: Music2 },
  { href: '/resources', label: 'Resources', icon: Files },
  { href: '/themes', label: 'Themes', icon: Paintbrush }
];

export default function Sidebar() {
  return (
    <aside className="w-60 border-r border-white/10 bg-black/40 backdrop-blur hidden md:block">
      <div className="p-3 space-y-2">
        {items.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:shadow-glow hover:bg-white/5 transition"
          >
            <Icon size={18} className="text-accent" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
