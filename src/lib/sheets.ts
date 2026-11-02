import { ProductsArraySchema } from './types';

const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY!;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID!;

// Colunas da planilha:
// A: Categoria | B: Nome | C: Descricao | D: Preco | E: Status | F: Imagem (URL)
const SHEET_RANGE = 'Produtos!A2:F1000';

export async function getProducts(revalidate: number = 3600) {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${SHEET_RANGE}?key=${GOOGLE_SHEETS_API_KEY}`;

    const response = await fetch(url, {
      next: { revalidate },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Detalhes do erro do Google:', errorBody);
      throw new Error(`Erro ao buscar planilha: ${response.statusText}`);
    }

    const data = await response.json();
    const rows: string[][] = data.values || [];

    if (rows.length === 0) return [];

    const products = rows.map((row, index) => {
      const categoria  = row[0]?.trim() || '';
      const nome       = row[1]?.trim() || '';
      const descricao  = row[2]?.trim();
      const preco      = parseFloat(String(row[3] || '0').replace(',', '.'));
      const statusStr  = row[4]?.trim() || 'Ativo';
      const rawImagem  = row[5]?.trim() || '';

      const disponivel = statusStr.toUpperCase() === 'ATIVO' || statusStr.toUpperCase() === 'TRUE';

      // Aceita URLs externas (http) ou caminhos locais do public/ (/)
      const imagem_url = (rawImagem.startsWith('http') || rawImagem.startsWith('/')) ? rawImagem : null;

      // Descrição "-" ou vazia → null
      const descricaoFinal = (!descricao || descricao === '-') ? null : descricao;

      return {
        id: `prod-${index + 1}`,
        nome,
        descricao: descricaoFinal,
        preco,
        categoria,
        imagem_url,
        disponivel,
        ordem: index + 1,
      };
    });

    return ProductsArraySchema.parse(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
}
