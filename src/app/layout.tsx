import type { Metadata, Viewport } from 'next';
import { Inter, Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const stayWithMe = localFont({
  src: '../../public/fonts/Blackrush.ttf',
  variable: '--font-bebas',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#1800AD',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Tragos Leves | Cardápio Digital',
  description: 'Cardápio completo do Tragos Leves. Cafés, caipirinhas, sucos, petiscos e muito mais.',
  openGraph: {
    title: 'Tragos Leves | Cardápio Digital',
    description: 'Cardápio completo do Tragos Leves. Cafés, caipirinhas, sucos, petiscos e muito mais.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable} ${stayWithMe.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
