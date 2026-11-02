import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/sheets';
import { filterAvailableProducts, groupByCategory } from '@/lib/utils';
import { GROUP_CATEGORIES } from '@/lib/groups';
import { ScrollReveal } from '@/components/ScrollReveal';

async function GroupList() {
  await connection();
  const allProducts = await getProducts();
  const availableProducts = filterAvailableProducts(allProducts);
  const categories = groupByCategory(availableProducts);

  const categoryMap = new Map(categories.map((c) => [c.name, c.products.length]));

  const groups = Object.entries(GROUP_CATEGORIES).map(([groupName, catNames]) => {
    const totalItems = catNames.reduce((sum, cat) => sum + (categoryMap.get(cat) ?? 0), 0);
    return { name: groupName, totalItems };
  });

  return (
    <nav className="flex flex-col items-center w-full text-center" aria-label="Categorias do cardápio">
      {groups.map((group, index) => (
        <ScrollReveal key={group.name} delay={index * 70}>
          <Link
            href={`/grupo/${encodeURIComponent(group.name)}`}
            className="group block py-0.5 px-6 active:opacity-70 transition-opacity"
          >
            <p className="text-[#FF751F] font-bebas text-5xl sm:text-5xl leading-tight drop-shadow group-hover:text-[#FF751F]/80 transition-colors duration-200">
              {group.name}
            </p>
          </Link>
        </ScrollReveal>
      ))}
    </nav>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center font-sans overflow-x-hidden bg-[#1800AD]">

      {/* Imagem de fundo */}
      <div
        className="absolute top-0 left-0 right-0 h-[65vh] z-0 bg-cover bg-[center_25%] bg-no-repeat"
        style={{ backgroundImage: `url('/bg-cardapio.jpg')` }}
      />

      {/* Gradiente: foto → cor sólida */}
      <div className="absolute top-0 left-0 right-0 h-[65vh] z-[1] bg-gradient-to-b from-black/50 via-black/30 via-40% to-[#1800AD]" />

      {/* Conteúdo centralizado na tela */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center justify-center min-h-screen py-12 px-4 gap-8">

        <ScrollReveal>
          <header className="text-center flex flex-col items-center">
            <div className="relative w-72 h-[67px] sm:w-80 sm:h-[74px]">
              <Image
                src="/logo.png"
                alt="Tragos Leves"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </header>
        </ScrollReveal>

        <main className="w-full">
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
              </div>
            }
          >
            <GroupList />
          </Suspense>
        </main>

        <footer className="text-white/35 text-xs font-poppins tracking-widest uppercase">
          Tragos Leves · Cardápio Digital
        </footer>
      </div>
    </div>
  );
}
