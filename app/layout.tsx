import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';
import Toast from './toast';

export const metadata = {
  title: 'SOUND OFF',
  description:
    '#YUP'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
          <Suspense>
            <Nav />
          </Suspense>
          {children}
          <Analytics />
      </body>
    </html>
  );
}
