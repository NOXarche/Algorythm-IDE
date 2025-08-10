'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Music, Users, Plus } from 'lucide-react';

type Room = {
  id: string;
  name: string;
  type: 'code' | 'music' | 'mixed';
  users: number;
  created: string;
};

const mockRooms: Room[] = [
  { id: '1', name: 'JavaScript Study Group', type: 'code', users: 5, created: '2 hours ago' },
  { id: '2', name: 'Lo-fi Coding Session', type: 'mixed', users: 12, created: '1 hour ago' },
  { id: '3', name: 'Indie Rock Playlist', type: 'music', users: 8, created: '30 minutes ago' },
];

export default function RoomsPage() {
  const [rooms] = useState<Room[]>(mockRooms);
  const [filter, setFilter] = useState<'all' | 'code' | 'music' | 'mixed'>('all');

  const filteredRooms = rooms.filter(room => filter === 'all' || room.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case 'code': return <Code size={20} className="text-blue-400" />;
      case 'music': return <Music size={20} className="text-green-400" />;
      case 'mixed': return <Users size={20} className="text-purple-400" />;
      default: return <Users size={20} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-heading">Rooms</h1>
        <Link href="/code/create" className="btn-neon px-4 py-2 flex items-center gap-2">
          <Plus size={18} />
          Create Room
        </Link>
      </div>

      <div className="flex gap-2">
        {['all', 'code', 'music', 'mixed'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-4 py-2 rounded-md transition ${
              filter === type 
                ? 'btn-neon' 
                : 'glass hover:bg-white/10'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass p-4 rounded-lg hover:shadow-glow transition cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getIcon(room.type)}
                <span className="text-sm opacity-60 capitalize">{room.type}</span>
              </div>
              <div className="flex items-center gap-1 text-sm opacity-60">
                <Users size={14} />
                {room.users}
              </div>
            </div>
            
            <h3 className="font-poppins text-lg mb-2">{room.name}</h3>
            <p className="text-sm opacity-60 mb-3">Created {room.created}</p>
            
            <Link 
              href={`/code/room/${room.id}?name=${encodeURIComponent(room.name)}`}
              className="btn-neon px-3 py-1 text-sm inline-block"
            >
              Join Room
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12 opacity-60">
          <p>No rooms found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}