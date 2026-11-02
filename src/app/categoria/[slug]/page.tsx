import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
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

  const itemCount = currentCategory?.products.length ?? 0;

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex flex-col font-sans">

      <header className="sticky top-0 z-20 bg-[#004AAD] shadow-lg">
        <div className="relative flex items-center justify-center py-4 px-4 max-w-lg mx-auto">
          <Link
            href={backHref}
            className="absolute left-4 flex items-center gap-1.5 text-white/90 font-semibold text-sm font-poppins hover:text-white transition-colors"
            aria-label={`Voltar para ${backLabel}`}
          >
            <span aria-hidden="true">←</span>
            {backLabel}
          </Link>

          <div className="text-center px-20">
            <h1 className="text-base sm:text-lg font-extrabold text-white font-poppins uppercase tracking-wider leading-tight">
              {decodedCategory}
            </h1>
            {itemCount > 0 && (
              <p className="text-white/60 text-xs font-poppins mt-0.5">
                {itemCount} {itemCount === 1 ? 'item' : 'itens'}
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 py-6 px-4">
        {!currentCategory || currentCategory.products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-400 text-base font-poppins">
              Nenhum produto encontrado.
            </p>
            <Link
              href={backHref}
              className="inline-block mt-4 text-[#004AAD] font-semibold text-sm font-poppins hover:underline"
            >
              ← Voltar
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-lg mx-auto flex flex-col gap-3">
            {currentCategory.products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                priority={index < 3}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="py-5 text-center border-t border-orange-100 mt-auto">
        <p className="text-neutral-400 text-xs font-poppins">
          © Tragos Leves · Cardápio Digital
        </p>
      </footer>
    </div>
  );
}

export default function Page({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF8F3] flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#004AAD]" />
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
