import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from '@/lib/sheets';
import { filterAvailableProducts, groupByCategory } from '@/lib/utils';
import { findParentGroup } from '@/lib/groups';
import { ProductCard } from '@/components/ProductCard';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function CategoryContent({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const decodedCategory = decodeURIComponent(slug);

  const parentGroup = findParentGroup(decodedCategory);
  const backHref = parentGroup ? `/grupo/${encodeURIComponent(parentGroup)}` : '/';
  const backLabel = parentGroup ?? 'Cardápio';

  const allProducts = await getProducts();
  const availableProducts = filterAvailableProducts(allProducts);
  const categories = groupByCategory(availableProducts);

  const currentCategory = categories.find(
    (c) => c.name.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-[#1800AD] flex flex-col font-sans">

      {/* Header: logo miniatura + botão voltar */}
      <header className="sticky top-0 z-20 bg-[#1800AD]/95 backdrop-blur-sm border-b border-white/10">
        <div className="relative flex items-center justify-center py-3 px-4 max-w-lg mx-auto h-14">
          <Link
            href={backHref}
            className="absolute left-4 flex items-center gap-1 text-white/60 text-xs font-poppins uppercase tracking-widest hover:text-white transition-colors"
            aria-label={`Voltar para ${backLabel}`}
          >
            ← {backLabel}
          </Link>

          {/* Logo miniatura centralizado */}
          <div className="relative w-28 h-7">
            <Image
              src="/logo.png"
              alt="Tragos Leves"
              fill
              sizes="112px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </header>

      {/* Título da categoria */}
      <div className="text-center pt-8 pb-4 px-4">
        <h1 className="text-white font-bebas text-3xl tracking-wide drop-shadow">
          {decodedCategory}
        </h1>
        <div className="w-8 h-px bg-white/25 mx-auto mt-3" />
      </div>

      {/* Lista de produtos */}
      <main className="flex-1 py-4 px-4 pb-10">
        {!currentCategory || currentCategory.products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/50 text-sm font-poppins">Nenhum produto encontrado.</p>
            <Link href={backHref} className="inline-block mt-4 text-white/60 text-xs font-poppins uppercase tracking-widest hover:text-white">
              ← Voltar
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {currentCategory.products.map((product, index) => (
              <ProductCard key={product.id} product={product} priority={index < 3} />
            ))}
          </div>
        )}
      </main>

      <footer className="py-5 text-center">
        <p className="text-white/25 text-xs font-poppins tracking-widest uppercase">
          Tragos Leves · Cardápio Digital
        </p>
      </footer>
    </div>
  );
}

export default function Page({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#1800AD] flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-white" />
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
