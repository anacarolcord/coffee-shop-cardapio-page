import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/sheets';
import { filterAvailableProducts, groupByCategory } from '@/lib/utils';
import { GROUP_CATEGORIES } from '@/lib/groups';

interface GrupoPageProps {
  params: Promise<{ slug: string }>;
}

// Ilustrações decorativas por sub-categoria
const SUBCATEGORY_ILLUSTRATIONS: Record<string, string> = {
  'Cafés Quentes': '/01_coador_e_xicaras.png',
  'Cafés Gelados': '/02_cafe_gelado.png',
  'Pra Matar a Fome': '/07_pessoa_bebendo.png',
  'Pra Dividir': '/10_ilustracao_paracube.png',
  'Tapioca e Cuscuz': '/08_tapioca_cuscuz.png',
  'Docinhos': '/09_brownie_e_mao.png',
  'Caipirinhas': '/12_copo_caipirinha.png',
  'Caipiroskas': '/05_frutas_tropicais.png',
  'Cervejas': '/11_garrafa_e_copo.png',
  'Sucos Naturais': '/03_banana_morango_liquidificador.png',
  'Refrescos': '/06_coco.png',
};

async function GrupoContent({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const groupName = decodeURIComponent(slug);

  const subCategoryNames = GROUP_CATEGORIES[groupName];
  if (!subCategoryNames) notFound();

  const allProducts = await getProducts();
  const availableProducts = filterAvailableProducts(allProducts);
  const allCategories = groupByCategory(availableProducts);
  const categoryMap = new Map(allCategories.map((c) => [c.name, c.products.length]));

  const subCategories = subCategoryNames.map((name) => ({
    name,
    itemCount: categoryMap.get(name) ?? 0,
    illustration: SUBCATEGORY_ILLUSTRATIONS[name] ?? null,
  }));

  const hasIllustrations = subCategories.some((c) => c.illustration);

  return (
    <div className="min-h-screen bg-[#1800AD] flex flex-col items-center font-sans">
      <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-sm px-4 py-12 gap-10">

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

        {hasIllustrations ? (
          /* Grid 2 colunas com ilustrações */
          <nav className="grid grid-cols-2 gap-6 w-full" aria-label={`Subcategorias de ${groupName}`}>
            {subCategories.map((cat, index) => {
              const isLastOdd = index === subCategories.length - 1 && subCategories.length % 2 !== 0;
              const isMany = subCategories.length > 2 || groupName === 'Bebidas';
              return (
              <Link
                key={cat.name}
                href={`/categoria/${encodeURIComponent(cat.name)}`}
                className={`group flex flex-col items-center gap-2 active:opacity-70 transition-all duration-300 hover:-translate-y-2 ${isLastOdd ? 'col-span-2 max-w-[calc(50%-12px)] mx-auto w-full' : ''}`}
              >
                {cat.illustration && (
                  <div className={`relative w-full illustration-white ${isMany ? 'h-32' : 'h-44'}`}>
                    <Image
                      src={cat.illustration}
                      alt=""
                      fill
                      className="object-contain"
                      aria-hidden="true"
                    />
                  </div>
                )}
                <p className={`text-white font-bebas leading-tight drop-shadow text-center group-hover:text-white/80 transition-colors duration-200 ${isMany ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl'}`}>
                  {cat.name}
                </p>
              </Link>
              );
            })}
          </nav>
        ) : (
          /* Lista vertical sem ilustrações */
          <nav className="flex flex-col items-center w-full text-center" aria-label={`Subcategorias de ${groupName}`}>
            {subCategories.map((cat) => (
              <Link
                key={cat.name}
                href={`/categoria/${encodeURIComponent(cat.name)}`}
                className="group block py-2 px-6 active:opacity-70 transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-white font-bebas text-4xl sm:text-5xl leading-tight drop-shadow group-hover:text-white/80 transition-colors duration-200">
                  {cat.name}
                </p>
              </Link>
            ))}
          </nav>
        )}

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
