import { NextRequest } from 'next/server';
import { Server as NetServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { NextApiResponse } from 'next';

type SocketServer = {
  io?: IOServer;
};

const ioHandler = (req: NextRequest) => {
  return new Response(null, {
    status: 200
  });
};

export const GET = ioHandler;

export const config = {
  runtime: 'nodejs'
};

// Patch global to keep single io instance across hot reloads
let io: IOServer | undefined = (globalThis as unknown as SocketServer).io;

if (!io) {
  // @ts-ignore - Next.js exposes underlying server at globalThis
  const httpServer: NetServer | undefined = (global as any)?.server;

  // Fallback: create a detached server if not present (Vercel functions create ephemeral servers)
  io = new IOServer({
    path: '/api/socket/io',
    addTrailingSlash: false,
    cors: { origin: '*', methods: ['GET', 'POST'] }
  });

  io.on('connection', (socket) => {
    socket.on('join', ({ roomId }) => {
      socket.join(roomId);
    });

    socket.on('leave', ({ roomId }) => {
      socket.leave(roomId);
    });

    socket.on('code:update', ({ roomId, code }) => {
      socket.to(roomId).emit('code:update', code);
    });

    socket.on('chat:new', ({ roomId, user, text }) => {
      socket.to(roomId).emit('chat:new', { user, text });
    });

    socket.on('playlist:add', ({ roomId, track }) => {
      socket.to(roomId).emit('playlist:add', track);
    });
  });

  (globalThis as unknown as SocketServer).io = io;
}
