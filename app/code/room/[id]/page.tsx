'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeSwitcher from '@/components/theme/theme-switcher';

const Monaco = dynamic(() => import('@/components/editor/monaco-editor'), { ssr: false });

let socket: Socket | null = null;

export default function CodeRoom({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const roomName = searchParams.get('name') || `Room ${id}`;

  const [code, setCode] = useState('// Start coding...');
  const [chat, setChat] = useState<{ user: string; text: string }[]>([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    socket = io('/', { path: '/api/socket/io' });
    socket.emit('join', { roomId: id });

    socket.on('code:update', (incoming: string) => setCode(incoming));
    socket.on('chat:new', (payload: { user: string; text: string }) =>
      setChat((c) => [...c, payload])
    );

    return () => {
      socket?.emit('leave', { roomId: id });
      socket?.disconnect();
    };
  }, [id]);

  const onCodeChange = (value: string) => {
    setCode(value);
    socket?.emit('code:update', { roomId: id, code: value });
  };

  const send = () => {
    if (!msg.trim()) return;
    const payload = { user: 'Guest', text: msg };
    socket?.emit('chat:new', { roomId: id, ...payload });
    setMsg('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-100px)]">
      <div className="lg:col-span-2 glass rounded-lg p-2 flex flex-col">
        <div className="flex items-center justify-between px-2 py-1">
          <h2 className="font-poppins">{roomName}</h2>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <button
              className="btn-neon px-3 py-1"
              onClick={() => navigator.clipboard.writeText(code)}
            >
              Copy
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-0 rounded-md overflow-hidden">
          <Monaco value={code} onChange={onCodeChange} />
        </div>
      </div>

      <div className="glass rounded-lg p-2 flex flex-col">
        <h3 className="font-poppins mb-2">Chat</h3>
        <div className="flex-1 min-h-0 overflow-auto space-y-2">
          {chat.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 rounded p-2"
            >
              <div className="text-sm text-accent">{c.user}</div>
              <div>{c.text}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            className="glass flex-1 rounded p-2"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message"
          />
          <button className="btn-neon px-3 py-2" onClick={send}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
