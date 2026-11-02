import Image from 'next/image';
import { ProductCardProps } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { id, nome, descricao, preco, imagem_url } = product;

  return (
    <article
      className="w-full bg-white rounded-2xl shadow-sm border border-orange-100/70 flex items-center gap-4 px-5 py-4 hover:shadow-md transition-shadow duration-200"
      aria-labelledby={`product-${id}`}
    >
      {/* Imagem opcional */}
      {imagem_url && (
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
          <Image
            src={imagem_url}
            alt={`Foto de ${nome}`}
            fill
            sizes="80px"
            className="object-cover"
            priority={priority}
          />
        </div>
      )}

      {/* Nome e descrição */}
      <div className="flex-1 min-w-0">
        <h3
          id={`product-${id}`}
          className="text-sm sm:text-base font-bold text-[#004AAD] font-poppins leading-snug"
        >
          {nome}
        </h3>
        {descricao && (
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed line-clamp-2">
            {descricao}
          </p>
        )}
      </div>

      {/* Preço alinhado à direita */}
      <div className="shrink-0 text-right self-center pl-2">
        <span className="text-[#FF751F] font-extrabold font-poppins text-base sm:text-lg whitespace-nowrap">
          {formatPrice(preco)}
        </span>
      </div>
    </article>
  );
}
