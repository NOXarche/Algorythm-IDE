import { NextRequest, NextResponse } from 'next/server';
import { Server as IOServer } from 'socket.io';

// Global socket instance to prevent multiple instances
let io: IOServer | undefined;

export async function GET(req: NextRequest) {
  if (!io) {
    io = new IOServer({
      path: '/api/socket/io',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NODE_ENV === 'production' 
          ? ['https://algorhythm5.vercel.app'] 
          : ['http://localhost:3000'],
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('join', ({ roomId }) => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
      });

      socket.on('leave', ({ roomId }) => {
        socket.leave(roomId);
        console.log(`Socket ${socket.id} left room ${roomId}`);
      });

      socket.on('code:update', ({ roomId, code }) => {
        socket.to(roomId).emit('code:update', code);
      });

      socket.on('chat:new', ({ roomId, user, text }) => {
        const timestamp = new Date().toISOString();
        socket.to(roomId).emit('chat:new', { user, text, timestamp });
      });

      socket.on('playlist:add', ({ roomId, track }) => {
        socket.to(roomId).emit('playlist:add', track);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
      });
    });
  }

  return NextResponse.json({ message: 'Socket.IO server initialized' });
}

export const POST = GET;