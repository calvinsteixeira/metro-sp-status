//UTILS
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MetroSP Status',
  description: 'Sistema para acompanhamento do status das linhas de metro em SP.',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="pt" className='light'>
        <body className={inter.className}>{children}</body>
      </html>
    </QueryProvider>
  );
}
