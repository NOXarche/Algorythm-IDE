'use client';

import Link from 'next/link';
import { Bell, Settings, User, ShieldCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function Navigation() {
  const { data: session } = useSession();
  const isAdmin = false; // replace with role check

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-heading text-xl tracking-wide">
            Algo<span className="text-accent">Rhythm</span>
          </Link>
          <input
            className="glass px-3 py-1 rounded-md w-64"
            placeholder="Search rooms, songs, users"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="glass p-2 rounded-md" title="Notifications">
            <Bell size={18} />
          </button>
          {isAdmin && (
            <Link href="/admin" className="glass p-2 rounded-md" title="Admin">
              <ShieldCheck size={18} />
            </Link>
          )}
          <Link href="/settings" className="glass p-2 rounded-md" title="Settings">
            <Settings size={18} />
          </Link>
          <Link href="/profile" className="glass p-2 rounded-md" title="Profile">
            <User size={18} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
