// Mapeamento de grupos (home) → sub-categorias (planilha)
export const GROUP_CATEGORIES: Record<string, string[]> = {
  'Cafés': ['Cafés Quentes', 'Cafés Gelados'],
  'Comidas': ['Pra Matar a Fome', 'Pra Dividir', 'Tapioca e Cuscuz', 'Docinhos'],
  'Bebidas': ['Sucos Naturais', 'Refrescos'],
  'Bebidas Alcoólicas': ['Caipirinhas', 'Caipiroskas', 'Cervejas'],
};

// Retorna o grupo pai de uma sub-categoria, ou null se não encontrar
export function findParentGroup(categoryName: string): string | null {
  for (const [group, cats] of Object.entries(GROUP_CATEGORIES)) {
    if (cats.includes(categoryName)) return group;
  }
  return null;
}
