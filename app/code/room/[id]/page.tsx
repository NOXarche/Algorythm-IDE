'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import ThemeSwitcher from '@/components/theme/theme-switcher';

const Monaco = dynamic(() => import('@/components/editor/monaco-editor'), { ssr: false });

type ChatMessage = { 
  user: string; 
  text: string; 
  timestamp?: string; 
};

export default function CodeRoom({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchParams = useSearchParams();
  const roomName = searchParams.get('name') || `Room ${id}`;

  const [code, setCode] = useState('// Start coding...');
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [msg, setMsg] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const socketRef = useRef<Socket | null>(null);

  const onCodeChange = useCallback((value: string) => {
    setCode(value);
    socketRef.current?.emit('code:update', { roomId: id, code: value });
  }, [id]);
  useEffect(() => {
    socketRef.current = io('/', { 
      path: '/api/socket/io',
      transports: ['websocket', 'polling']
    });
    
    const socket = socketRef.current;
    
    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('join', { roomId: id });
    });
    
    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('code:update', (incoming: string) => {
      setCode(incoming);
    });
    
    socket.on('chat:new', (payload: ChatMessage) =>
      setChat((prev) => [...prev, payload])
    );

    return () => {
      socket.emit('leave', { roomId: id });
      socket.disconnect();
    };
  }, [id]);

  const send = useCallback(() => {
    if (!msg.trim()) return;
    const payload = { user: 'Guest', text: msg };
    socketRef.current?.emit('chat:new', { roomId: id, ...payload });
    setChat((prev) => [...prev, { ...payload, timestamp: new Date().toISOString() }]);
    setMsg('');
  }, [msg, id]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-100px)]">
      <div className="lg:col-span-2 glass rounded-lg p-2 flex flex-col">
        <div className="flex items-center justify-between px-2 py-1">
          <div>
            <h2 className="font-poppins">{roomName}</h2>
            <div className="text-xs opacity-60">
              {isConnected ? (
                <span className="text-green-400">● Connected</span>
              ) : (
                <span className="text-red-400">● Disconnected</span>
              )}
            </div>
          </div>
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
                {c.timestamp && (
                  <span className="text-xs opacity-50">
                    {new Date(c.timestamp).toLocaleTimeString()}
                  </span>
                )}
            </motion.div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            className="glass flex-1 rounded p-2"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && send()}
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
