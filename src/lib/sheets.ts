import { ProductsArraySchema, Product } from './types';

const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY!;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_RANGE = 'Produtos!A2:H1000'; // Pula header


export async function getProducts(revalidate: number = 3600) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;

    const response = await fetch(url, {
      next: { revalidate }, // ISR - revalida a cada X segundos
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Detalhes do erro do Google:', errorBody);
      throw new Error(`Erro ao buscar planilha: ${response.statusText}`);
    }

    const data = await response.json();
    const rows: string[][] = data.values || [];

    if (rows.length === 0) {
      return [];
    }

    // Mapeamento baseado na ordem atual das colunas na sua planilha:
    // A: Categoria, B: Nome, C: Descricao, D: Preco, E: Status
    const products = rows.map((row, index) => {
      const categoria = row[0] || '';
      const nome = row[1] || '';
      const descricao = row[2] === '-' ? null : (row[2] || null);
      const preco = parseFloat(String(row[3] || '0').replace(',', '.'));
      const statusStr = row[4] || 'Ativo';
      
      const disponivel = statusStr.toUpperCase() === 'ATIVO' || statusStr.toUpperCase() === 'TRUE';

      return {
        id: `prod-${index + 1}`, // Gera um ID único baseado na linha
        nome,
        descricao,
        preco,
        categoria,
        imagem_url: null,
        disponivel,
        ordem: index + 1,
      };
    });

    // Valida com Zod
    const validatedProducts = ProductsArraySchema.parse(products);
    return validatedProducts;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}
