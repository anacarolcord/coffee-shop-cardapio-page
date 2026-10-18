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
    return (
      <p className="text-white text-center font-poppins">
        Nenhuma categoria encontrada.
      </p>
    );
  }

  return (
    <nav className="flex flex-col items-center gap-4 my-2">
      {categories.map((cat) => (
        <Link
          key={cat.name}
          href={`/categoria/${encodeURIComponent(cat.name)}`}
          className="text-xl sm:text-2xl font-extrabold text-white font-poppins uppercase tracking-wider hover:text-[#004AAD] transition-all transform hover:scale-105 text-center drop-shadow-md"
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between items-center font-sans overflow-x-hidden bg-[#FF8C00]">
      
      {/* 1. Imagem de Fundo (Sem alterações no gradiente ou imagem) */}
      <div 
        className="absolute top-0 left-0 right-0 h-[80vh] z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/bg-cardapio.jpg')` }}
      />

      {/* 2. Camada de Gradiente (Mantido exatamente igual) */}
      <div className="absolute top-0 left-0 right-0 h-[80vh] z-1 bg-gradient-to-b from-black/20 via-transparent via-60% to-[#FF8C00]" />

      {/* 3. Contêiner de Conteúdo - Texto posicionado exatamente no início do gradiente laranja (60vh) */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center pt-[60vh] pb-8 px-4 my-auto">
        
        {/* Título e Subtítulo */}
        <header className="text-center mb-6">
          <h1 className="text-3xl sm:text-5xl font-black text-white font-poppins uppercase tracking-wider drop-shadow-lg">
            TRAGOS LEVES
          </h1>
          <div className="w-20 h-1.5 bg-[#004AAD] mx-auto rounded-full mt-1.5 mb-2 shadow-md"></div>
          <p className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-widest font-poppins drop-shadow">
            COFFEE & SURF • TOQUE EM UMA CATEGORIA
          </p>
        </header>

        {/* Lista de Categorias */}
        <main className="w-full flex flex-col items-center">
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
      </div>

      {/* Rodapé */}
      <footer className="relative z-10 text-center text-white/90 text-xs font-poppins pb-6 pt-2 drop-shadow font-semibold">
        Tragos Leves Original - Cardápio Digital
      </footer>
    </div>
  );
}