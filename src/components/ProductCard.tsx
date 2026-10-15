import Image from 'next/image';
import { ProductCardProps } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { id, nome, descricao, preco, imagem_url } = product;

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      aria-labelledby={`product-${id}`}
    >
      {/* Container de Imagem */}
      <div className="relative w-full h-48 sm:h-56 bg-neutral-100">
        {imagem_url ? (
          <Image
            src={imagem_url}
            alt={`Imagem de ${nome}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200">
            <span className="text-neutral-400 text-sm">Sem imagem</span>
          </div>
        )}
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 sm:p-6 space-y-3">
        {/* Nome do Produto */}
        <h3
          id={`product-${id}`}
          className="text-xl sm:text-2xl font-bold text-secondary line-clamp-2"
        >
          {nome}
        </h3>

        {/* Descrição */}
        {descricao && (
          <p className="text-sm sm:text-base text-neutral-600 line-clamp-3 leading-relaxed">
            {descricao}
          </p>
        )}

        {/* Preço */}
        <div className="pt-2 border-t border-neutral-100">
          <p className="text-2xl sm:text-3xl font-bold text-primary">
            {formatPrice(preco)}
          </p>
        </div>
      </div>
    </article>
  );
}
