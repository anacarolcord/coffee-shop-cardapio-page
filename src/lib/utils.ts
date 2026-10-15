import { type ClassValue, clsx } from 'clsx';
import { Product, Category } from './types';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Formata preço em reais
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
}

// Agrupa produtos por categoria
export function groupByCategory(products: Product[]): Category[] {
  const grouped = products.reduce((acc, product) => {
    if (!acc[product.categoria]) {
      acc[product.categoria] = [];
    }
    acc[product.categoria].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Ordena produtos dentro de cada categoria
  Object.keys(grouped).forEach(categoryName => {
    grouped[categoryName].sort((a, b) => {
      if (a.ordem !== undefined && b.ordem !== undefined) {
        return a.ordem - b.ordem;
      }
      return a.nome.localeCompare(b.nome);
    });
  });

  return Object.entries(grouped).map(([name, products]) => ({
    name,
    products,
  }));
}

// Filtra apenas produtos disponíveis
export function filterAvailableProducts(products: Product[]): Product[] {
  return products.filter(p => p.disponivel);
}
