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
      throw new Error(`Erro ao buscar planilha: ${response.statusText}`);
    }

    const data = await response.json();
    const rows: string[][] = data.values || [];

    if (rows.length === 0) {
      return [];
    }

    // Converte linhas para objetos Product
    const products = rows.map(row => {
      // Normaliza disponivel
      const disponivel =
        row[6]?.toUpperCase() === 'TRUE' ||
        row[6]?.toUpperCase() === 'ATIVO';

      return {
        id: row[0] || '',
        nome: row[1] || '',
        descricao: row[2] || null,
        preco: parseFloat(String(row[3] || '0').replace(',', '.')),
        categoria: row[4] || '',
        imagem_url: row[5] || null,
        disponivel,
        ordem: row[7] ? parseInt(row[7], 10) : null,
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
