import Image from 'next/image';
import { ProductCardProps } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { id, nome, descricao, preco, imagem_url } = product;

  return (
    <article
      className="w-full max-w-lg bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-orange-100 flex flex-col sm:flex-row items-center"
      aria-labelledby={`product-${id}`}
    >
      {/* Container de Imagem (Opcional caso venha imagem da planilha) */}
      {imagem_url && (
        <div className="relative w-full sm:w-40 h-48 sm:h-auto bg-neutral-100 shrink-0">
          <Image
            src={imagem_url}
            alt={`Imagem de ${nome}`}
            fill
            sizes="(max-width: 640px) 100vw, 160px"
            className="object-cover"
            priority={priority}
          />
        </div>
      )}

      {/* Conteúdo do Card */}
      <div className="p-5 sm:p-6 space-y-2 flex-1 text-center sm:text-left w-full">
        {/* Nome do Produto em Azul Royal */}
        <h3
          id={`product-${id}`}
          className="text-lg sm:text-xl font-bold text-[#004AAD] font-poppins"
        >
          {nome}
        </h3>

        {/* Descrição (Oculta se for apenas um traço "-") */}
        {descricao && descricao !== '-' && (
          <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
            {descricao}
          </p>
        )}

        {/* Preço em Destaque Laranja */}
        <div className="pt-2">
          <span className="inline-block bg-[#FF8C00] text-white font-extrabold font-poppins px-3.5 py-1 rounded-xl text-base shadow-sm">
            {formatPrice(preco)}
          </span>
        </div>
      </div>
    </article>
  );
}