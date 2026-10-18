import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
import { getProducts } from '@/lib/sheets';
import { filterAvailableProducts, groupByCategory } from '@/lib/utils';

async function CategoryList() {
  await connection();
  const allProducts = await getProducts();
  const availableProducts = filterAvailableProducts(allProducts);
  const categories = groupByCategory(availableProducts);

  if (categories.length === 0) {
    return <p className="text-white text-center font-poppins">Nenhuma categoria encontrada.</p>;
  }

  return (
    <nav className="flex flex-col items-center gap-6 my-6">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/categoria/${encodeURIComponent(cat.name)}`}
          className="text-2xl sm:text-3xl font-black text-white font-poppins uppercase tracking-wider hover:text-[#004AAD] transition-colors text-center"
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FF8C00] flex flex-col justify-between items-center py-12 px-4 font-sans">
      {/* Topo / Logo */}
      <header className="text-center mt-6">
        <h1 className="text-4xl sm:text-5xl font-black text-white font-poppins uppercase tracking-widest mb-2">
          Smart Menu
        </h1>
        <div className="w-16 h-1.5 bg-[#004AAD] mx-auto rounded-full mb-6"></div>
        <p className="text-white/90 text-sm font-semibold uppercase tracking-wider font-poppins">
          Toque em uma categoria
        </p>
      </header>

      {/* Lista de Categorias Estilo Referência */}
      <main className="w-full max-w-md flex flex-col items-center">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            </div>
          }
        >
          <CategoryList />
        </Suspense>
      </main>

      {/* Rodapé */}
      <footer className="text-center text-white/80 text-xs font-poppins mt-auto pt-8">
        © Smart Menu - Cardápio Digital
      </footer>
    </div>
  );
}