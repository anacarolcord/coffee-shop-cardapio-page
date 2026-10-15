import { z } from 'zod';

// Schema Zod para validação
export const ProductSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  nome: z.string().min(1).max(100),
  descricao: z.string().max(250).optional().nullable(),
  preco: z.number().positive(),
  categoria: z.string().min(1),
  imagem_url: z.string().url().optional().nullable(),
  disponivel: z.boolean(),
  ordem: z.number().int().nonnegative().optional().nullable(),
});

export const ProductsArraySchema = z.array(ProductSchema);

// Tipos TypeScript
export type Product = z.infer<typeof ProductSchema>;

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export interface Category {
  name: string;
  products: Product[];
}
