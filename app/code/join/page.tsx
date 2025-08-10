'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinCodeRoom() {
  const [code, setCode] = useState('');
  const router = useRouter();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading">Join Code Room</h1>
      <input
        className="glass p-2 rounded-md w-full"
        placeholder="Enter room code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="btn-neon px-4 py-2"
        onClick={() => router.push(`/code/room/${code}`)}
      >
        Join
      </button>
    </div>
  );
}
