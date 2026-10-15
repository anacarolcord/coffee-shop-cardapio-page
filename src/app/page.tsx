import { getProducts } from '@/lib/sheets';
import { filterAvailableProducts, groupByCategory } from '@/lib/utils';
import { ProductCard } from '@/components/ProductCard';

export default async function HomePage() {
  let allProducts;
  let error = null;

  try {
    allProducts = await getProducts();
  } catch (e) {
    error = e instanceof Error ? e.message : 'Erro desconhecido';
    allProducts = [];
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm py-6">
          <div className="container-custom">
            <h1 className="text-3xl font-bold text-secondary">Smart Menu</h1>
          </div>
        </header>
        <main className="flex-1 container-custom section-spacing">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Erro ao carregar cardápio
            </h2>
            <p className="text-red-700">{error}</p>
            <p className="text-sm text-red-600 mt-4">
              Verifique se as variáveis de ambiente GOOGLE_SHEETS_API_KEY e
              GOOGLE_SHEET_ID estão configuradas corretamente.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const availableProducts = filterAvailableProducts(allProducts);
  const categories = groupByCategory(availableProducts);

  if (categories.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm py-6">
          <div className="container-custom">
            <h1 className="text-3xl font-bold text-secondary">Smart Menu</h1>
          </div>
        </header>
        <main className="flex-1 container-custom section-spacing">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-neutral-600 mb-4">
              Nenhum produto disponível
            </h2>
            <p className="text-neutral-500">
              Adicione produtos na planilha Google Sheets e marque-os como
              disponíveis.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-6">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-secondary font-display">
            Smart Menu
          </h1>
          <p className="text-neutral-600 mt-1">Cardápio Digital</p>
        </div>
      </header>

      {/* Listagem por categoria */}
      <main className="flex-1">
        {categories.map((category, categoryIndex) => (
          <section key={category.name} className="section-spacing">
            <div className="container-custom">
              <h2 className="text-2xl font-bold text-secondary mb-8 font-display">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {category.products.map((product, productIndex) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={categoryIndex === 0 && productIndex < 3}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8">
        <div className="container-custom text-center">
          <p className="text-neutral-600 text-sm">
            © 2024 Smart Menu - Cardápio Digital
          </p>
        </div>
      </footer>
    </div>
  );
}
