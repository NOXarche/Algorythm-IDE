'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function SpotifyConnect() {
  const { data: session } = useSession();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading">Spotify</h1>
      {!session ? (
        <button className="btn-neon px-4 py-2" onClick={() => signIn('spotify')}>
          Connect Spotify
        </button>
      ) : (
        <div className="space-y-2">
          <div>Signed in as {session.user?.email || session.user?.name}</div>
          <button className="glass px-4 py-2 rounded-md" onClick={() => signOut()}>
            Disconnect
          </button>
          <div className="glass p-3 rounded-md">
            <p className="opacity-80 mb-2">Web Playback SDK/Embed placeholder</p>
            {/* You can embed or use the Web Playback SDK with the access token from NextAuth */}
            {/* For iframe embed of a playlist: */}
            {/* <iframe src="https://open.spotify.com/embed/playlist/{id}" width="100%" height="152" frameBorder="0" allow="encrypted-media" /> */}
          </div>
        </div>
      )}
    </div>
  );
}
