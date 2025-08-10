'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';

type Track = { id: string; title: string; by: string };

export default function CollaborativePlaylist() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState('');
  const [by, setBy] = useState('Guest');

  useEffect(() => {
    const s = io('/', { path: '/api/socket/io' });
    s.emit('join', { roomId: 'playlist-global' });
    s.on('playlist:add', (t: Track) => setTracks((p) => [...p, t]));
    return () => {
      s.emit('leave', { roomId: 'playlist-global' });
      s.disconnect();
    };
  }, []);

  const add = () => {
    if (!title.trim()) return;
    const t = { id: Date.now().toString(), title, by };
    const s = io('/', { path: '/api/socket/io' });
    s.emit('playlist:add', { roomId: 'playlist-global', track: t });
    setTitle('');
    setTimeout(() => s.disconnect(), 200);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading">Collaborative Playlist</h1>
      <div className="flex gap-2">
        <input
          className="glass p-2 rounded-md"
          placeholder="Track title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="glass p-2 rounded-md"
          placeholder="Added by"
          value={by}
          onChange={(e) => setBy(e.target.value)}
        />
        <button className="btn-neon px-4 py-2" onClick={add}>Add</button>
      </div>
      <div className="space-y-2">
        {tracks.map((t) => (
          <div key={t.id} className="glass p-2 rounded-md flex justify-between">
            <div>{t.title}</div>
            <div className="text-accent">{t.by}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
