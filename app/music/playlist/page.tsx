'use client';

import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';

type Track = { id: string; title: string; by: string };

export default function CollaborativePlaylist() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [title, setTitle] = useState('');
  const [by, setBy] = useState('Guest');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const s = io('/', { 
      path: '/api/socket/io',
      transports: ['websocket', 'polling']
    });
    
    s.on('connect', () => setIsConnected(true));
    s.on('disconnect', () => setIsConnected(false));
    
    s.emit('join', { roomId: 'playlist-global' });
    s.on('playlist:add', (t: Track) => setTracks((prev) => [...prev, t]));
    
    return () => {
      s.emit('leave', { roomId: 'playlist-global' });
      s.disconnect();
    };
  }, []);

  const add = useCallback(() => {
    if (!title.trim()) return;
    const t = { id: Date.now().toString(), title, by };
    const s = io('/', { 
      path: '/api/socket/io',
      transports: ['websocket', 'polling']
    });
    s.emit('playlist:add', { roomId: 'playlist-global', track: t });
    setTracks((prev) => [...prev, t]);
    setTitle('');
    setTimeout(() => s.disconnect(), 200);
  }, [title, by]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading">Collaborative Playlist</h1>
        <div className="text-sm">
          {isConnected ? (
            <span className="text-green-400">● Connected</span>
          ) : (
            <span className="text-red-400">● Disconnected</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <input
          className="glass p-2 rounded-md"
          placeholder="Track title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && add()}
        />
        <input
          className="glass p-2 rounded-md"
          placeholder="Added by"
          value={by}
          onChange={(e) => setBy(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && add()}
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
