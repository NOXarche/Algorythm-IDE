'use client';

import Link from 'next/link';

export default function CodeIndex() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading">Code Rooms</h1>
      <div className="flex gap-3">
        <Link href="/code/create" className="btn-neon px-4 py-2">Create Room</Link>
        <Link href="/code/join" className="glass px-4 py-2 rounded-md">Join Room</Link>
      </div>
    </div>
  );
}
