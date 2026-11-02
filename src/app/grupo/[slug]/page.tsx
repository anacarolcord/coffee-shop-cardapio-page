import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/sheets';
import { filterAvailableProducts, groupByCategory } from '@/lib/utils';
import { GROUP_CATEGORIES } from '@/lib/groups';

interface GrupoPageProps {
  params: Promise<{ slug: string }>;
}

async function GrupoContent({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const groupName = decodeURIComponent(slug);

  const subCategoryNames = GROUP_CATEGORIES[groupName];
  if (!subCategoryNames) {
    notFound();
  }

  const allProducts = await getProducts();
  const availableProducts = filterAvailableProducts(allProducts);
  const allCategories = groupByCategory(availableProducts);
  const categoryMap = new Map(allCategories.map((c) => [c.name, c.products.length]));

  const subCategories = subCategoryNames.map((name) => ({
    name,
    itemCount: categoryMap.get(name) ?? 0,
  }));

  return (
    <div className="min-h-screen bg-[#1800AD] flex flex-col items-center font-sans">

      {/* Conteúdo centralizado */}
      <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-sm px-4 py-12 gap-8">

        {/* Botão voltar + título do grupo */}
        <header className="text-center flex flex-col items-center gap-2">
          <Link
            href="/"
            className="text-white/50 text-xs font-poppins uppercase tracking-widest hover:text-white/80 transition-colors"
            aria-label="Voltar ao cardápio"
          >
            ← Voltar
          </Link>
          <h1 className="text-white font-bebas text-3xl sm:text-4xl tracking-wide drop-shadow leading-none">
            {groupName}
          </h1>
          <div className="w-8 h-px bg-white/30" />
        </header>

        {/* Sub-categorias */}
        <nav className="flex flex-col items-center w-full text-center">
          {subCategories.map((cat) => (
            <Link
              key={cat.name}
              href={`/categoria/${encodeURIComponent(cat.name)}`}
              className="group block py-2 px-6 active:opacity-70 transition-opacity"
            >
              <p className="text-white font-bebas text-4xl sm:text-5xl leading-tight drop-shadow group-hover:text-white/80 transition-colors duration-200">
                {cat.name}
              </p>
            </Link>
          ))}
        </nav>

        <footer className="text-white/30 text-xs font-poppins tracking-widest uppercase">
          Tragos Leves · Cardápio Digital
        </footer>
      </div>
    </div>
  );
}

export default function GrupoPage({ params }: GrupoPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1800AD] flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white" />
        </div>
      }
    >
      <GrupoContent params={params} />
    </Suspense>
  );
}
