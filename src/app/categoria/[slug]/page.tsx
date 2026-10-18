import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
import { getProducts } from '@/lib/sheets';
import { filterAvailableProducts, groupByCategory } from '@/lib/utils';
import { ProductCard } from '@/components/ProductCard';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Componente interno assíncrono que lê os params e busca os produtos
async function CategoryProducts({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const decodedCategory = decodeURIComponent(slug);
  
  const allProducts = await getProducts();
  const availableProducts = filterAvailableProducts(allProducts);
  const categories = groupByCategory(availableProducts);

  const currentCategory = categories.find(
    (c) => c.name.toLowerCase() === decodedCategory.toLowerCase()
  );

  if (!currentCategory || currentCategory.products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-white text-lg font-poppins">Nenhum produto encontrado nesta categoria.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4 items-center">
      {currentCategory.products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 3}
        />
      ))}
    </div>
  );
}

export default async function Page({ params }: CategoryPageProps) {
  // Resolvemos o slug de forma segura para exibir no cabeçalho
  const resolvedParams = await params;
  const categoryName = decodeURIComponent(resolvedParams.slug);

  return (
    <div className="min-h-screen bg-[#FF8C00] flex flex-col font-sans">
      {/* Header com botão de voltar */}
      <header className="bg-white shadow-md py-6 px-4 text-center border-b-4 border-[#004AAD] relative flex items-center justify-center">
        <Link
          href="/"
          className="absolute left-6 text-[#004AAD] font-bold font-poppins text-sm hover:underline flex items-center gap-1 bg-orange-100 px-3 py-1.5 rounded-xl transition-colors hover:bg-orange-200"
        >
          ← Voltar
        </Link>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#004AAD] font-poppins uppercase tracking-wider">
          {categoryName}
        </h1>
      </header>

      {/* Lista de Produtos Centralizados envolvida em Suspense */}
      <main className="flex-1 py-8 px-4">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
            </div>
          }
        >
          <CategoryProducts params={params} />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 text-center border-t border-orange-200 mt-auto">
        <p className="text-[#004AAD] font-semibold text-xs font-poppins">
          © Tragos Leves Original - Cardápio Digital
        </p>
      </footer>
    </div>
  );
}