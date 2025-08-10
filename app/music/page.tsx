'use client';

import Link from 'next/link';

export default function MusicIndex() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading">Music Hub</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Link className="glass p-4 rounded-lg hover:shadow-glow" href="/music/spotify">
          Connect Spotify
        </Link>
        <Link className="glass p-4 rounded-lg hover:shadow-glow" href="/music/upload">
          Upload Song
        </Link>
        <Link className="glass p-4 rounded-lg hover:shadow-glow" href="/music/playlist">
          Collaborative Playlist
        </Link>
      </div>
    </div>
  );
}
