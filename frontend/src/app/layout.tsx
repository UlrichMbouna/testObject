import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SocketProvider } from './contexts/socket-context';
import { Header } from './components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Heyama Objects Manager',
  description: 'Gestionnaire d\'objets Heyama',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <SocketProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </SocketProvider>
      </body>
    </html>
  );
}