'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-heading"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to AlgoRhythm
      </motion.h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Link className="glass p-4 rounded-lg hover:shadow-glow transition" href="/code">
          <h2 className="font-poppins text-xl mb-2">Code Room</h2>
          <p>Collaborate in Monaco with live cursors and theme sync.</p>
        </Link>
        <Link className="glass p-4 rounded-lg hover:shadow-glow transition" href="/music">
          <h2 className="font-poppins text-xl mb-2">Music Hub</h2>
          <p>Spotify playback, uploads, collaborative playlists.</p>
        </Link>
        <Link className="glass p-4 rounded-lg hover:shadow-glow transition" href="/rooms">
          <h2 className="font-poppins text-xl mb-2">Rooms</h2>
          <p>Create or join Code, Music, or Mixed rooms.</p>
        </Link>
      </div>
    </div>
  );
}
