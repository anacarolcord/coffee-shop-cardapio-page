import Image from 'next/image';
import { ProductCardProps } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { id, nome, descricao, preco, imagem_url } = product;

  return (
    <article
      className="w-full bg-white rounded-2xl overflow-hidden shadow-lg"
      aria-labelledby={`product-${id}`}
    >
      {/* Imagem do produto (quando disponível) */}
      {imagem_url && (
        <div className="relative w-full h-56">
          <Image
            src={imagem_url}
            alt={`Foto de ${nome}`}
            fill
            sizes="(max-width: 384px) 100vw, 384px"
            className="object-cover"
            priority={priority}
          />
        </div>
      )}

      {/* Informações do produto */}
      <div className="px-5 py-4 flex items-start justify-between gap-4 bg-[#FF751F]">
        <div className="flex-1 min-w-0">
          <h3
            id={`product-${id}`}
            className="font-bold text-[#1800AD] uppercase text-sm sm:text-base leading-snug font-poppins"
          >
            {nome}
          </h3>
          {descricao && (
            <p className="text-xs text-[#1800AD]/70 mt-1 leading-relaxed line-clamp-2">
              {descricao}
            </p>
          )}
        </div>

        <span className="text-[#1800AD] font-extrabold font-poppins text-base whitespace-nowrap shrink-0 pt-0.5">
          {formatPrice(preco)}
        </span>
      </div>
    </article>
  );
}
