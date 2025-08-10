'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { nanoid } from 'nanoid';

export default function CreateCodeRoom() {
  const [name, setName] = useState('');
  const router = useRouter();

  const create = () => {
    const id = nanoid(8);
    router.push(`/code/room/${id}?name=${encodeURIComponent(name || 'Untitled')}`);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading">Create Code Room</h1>
      <input
        className="glass p-2 rounded-md w-full"
        placeholder="Room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button className="btn-neon px-4 py-2" onClick={create}>Create</button>
    </div>
  );
}
