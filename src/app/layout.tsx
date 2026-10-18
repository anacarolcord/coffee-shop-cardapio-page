import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Tragos Leves',
  description: 'Cardápio digital',
  openGraph: {
    title: 'Tragos Leves',
    description: 'Conheça nosso cardápio completo',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
