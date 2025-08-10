import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/layout/navigation';
import Sidebar from '@/components/layout/sidebar';

export const metadata = {
  title: 'AlgoRhythm',
  description: 'Collaborative Code + Music Rooms'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4">{children}</main>
          </div>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
