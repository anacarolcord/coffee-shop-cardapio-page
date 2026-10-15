Documento de Especificação: Cardápio Digital "Smart-Menu" (Versão Vitrine)
1. Objetivo do Projeto
Desenvolver uma aplicação web de cardápio digital responsiva (mobile-first), focada em alta performance, design moderno e facilidade de manutenção para o proprietário. O projeto funcionará como uma "vitrine digital" estática, sem carrinho de compras ou redirecionamento para WhatsApp.

2. Requisitos Funcionais
Visualização de Cardápio: Listagem de produtos organizada por categorias (ex: Sucos, Sanduíches, Sobremesas).
Foco em Vitrine: O cardápio é estritamente informativo. Não há botões de compra, carrinho ou links de ação. O objetivo é a exibição clara e elegante dos produtos e preços.
Gestão via Planilha (Google Sheets): O conteúdo do site (nome, preço, descrição, foto, categoria e status de disponibilidade) será extraído de uma planilha Google.
Controle de Disponibilidade: O sistema deve filtrar e exibir apenas os produtos marcados como "Ativo" na planilha.
Design Responsivo: Interface otimizada para navegadores móveis, garantindo leitura confortável e carregamento rápido.
3. Requisitos Técnicos
Frontend: Next.js (App Router) com Tailwind CSS.
Fonte de Dados: Integração com Google Sheets (via API ou SheetDB) para converter a planilha em JSON.
Imagens: Suporte a links externos de imagens.
Hospedagem: Vercel.
4. Diretrizes de Design e Estilo
Referência: O site deve seguir uma estética similar ao https://stacks.menu/ardillajuice/coffe. O visual deve ser 'premium', limpo e minimalista.
Paleta de Cores:
Cor Principal/Fundo: #FF751F (Laranja) - Nota: Aplicar de forma equilibrada para não sobrecarregar a leitura.
Cor de Texto e Detalhes: #004AAD (Azul).
Garanta que o contraste entre o fundo laranja e as letras azuis passe no teste de acessibilidade WCAG, ou sugira variações de tons se necessário para garantir uma leitura perfeita
Estilo Visual:
Formas: Uso de cantos arredondados nas imagens e nos cards (ex: rounded-2xl).
Tipografia: Fonte moderna e sem serifa (ex: Inter ou Poppins).
Espaçamento: Uso generoso de padding para garantir respiro e elegância entre os elementos.
Destaque: Preços devem ter destaque visual (negrito e cor azul ou laranja, conforme contraste).
Responsividade: Layout otimizado para mobile, utilizando uma coluna única de produtos que ocupa a largura total da tela.