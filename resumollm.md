Aqui está o resumo completo, estruturado e técnico de toda a nossa jornada de desenvolvimento. Você pode copiar este conteúdo e enviar para qualquer outro LLM (como Claude, GPT-4, Gemini) para retomar o trabalho exatamente de onde paramos.

---

# Documentação de Desenvolvimento: Projeto Cardápio Digital "Smart-Menu"

## 1. Visão Geral do Projeto
O objetivo é criar um cardápio digital de alta performance, estilo "vitrine premium" (foco em visual e legibilidade), utilizando **Next.js (App Router)** e **Tailwind CSS**. O sistema funciona como um CMS de baixo custo, onde a "base de dados" é uma planilha do Google Sheets, eliminando a necessidade de bancos de dados complexos ou painéis administrativos pesados.

## 2. Requisitos Funcionais e de Design
*   **Modelo de Negócio:** Vitrine estática de produtos. Não possui carrinho de compras, checkout ou links de redirecionamento para WhatsApp. Foco total em exibição de catálogo.
*   **Identidade Visual (Estilo "Tragos Leves"):**
    *   **Paleta:** Fundo Laranja (`#FF8C00`), Textos e detalhes em Azul Royal (`#004AAD`).
    *   **Tipografia:** Títulos em *Archivo Black* (ou similar Sans-Serif Bold), corpo em *Poppins*.
    *   **Layout:** Minimalista, mobile-first, com amplo uso de espaçamento (`padding`) e cantos arredondados (`rounded-2xl`).
*   **Gestão de Dados:** O proprietário gerencia o cardápio via Google Sheets. O sistema lê a planilha e renderiza os itens automaticamente.

## 3. Arquitetura Técnica
*   **Stack:** Next.js (Framework React), Tailwind CSS (Estilização), TypeScript (Linguagem).
*   **Dados:** Integração com Google Sheets API (ou alternativa como SheetDB).
*   **Hospedagem:** Vercel (Deploy automatizado).
*   **Configurações Especiais de Ambiente:**
    *   Uso de `NODE_TLS_REJECT_UNAUTHORIZED=0` necessário em ambientes corporativos para contornar bloqueios de certificados SSL em chamadas `fetch`.

## 4. Estado Atual do Desenvolvimento e Problemas Identificados
*   **Configuração de Ambiente:** O projeto foi iniciado no WSL (Linux), mas houve problemas de compatibilidade ao tentar rodar via caminhos do Windows (`/mnt/c`). O desenvolvimento deve preferencialmente ocorrer dentro do terminal do Ubuntu (WSL) ou via VS Code conectado ao WSL.
*   **Erros de Execução Resolvidos:**
    *   O comando `next` não era encontrado (resolvido com `npx next dev` e reinstalação de dependências).
    *   Erro de `revalidate` (removido do `page.tsx` por incompatibilidade com novas versões do Next.js).
    *   Erro de `tailwindcss` (resolvido migrando para Tailwind v4: `@import "tailwindcss";` no `globals.css` e instalação do `@tailwindcss/postcss`).
*   **Status Atual:** O sistema está configurado, mas apresenta erro de `Forbidden` (403) na busca da planilha, indicando que a planilha ainda não está pública ou a API Key não está autorizada.

## 5. Próximos Passos (Para o próximo LLM)
1.  **Finalização da Conexão com Sheets:**
    *   Validar se a planilha criada está com "Acesso Geral: Qualquer pessoa com o link".
    *   Verificar se a `GOOGLE_SHEETS_API_KEY` está ativa no Google Cloud Console e com permissão para o Google Sheets API.
    *   *Sugestão:* Se a API do Google persistir em erro, migrar a leitura para o **SheetDB.io** (que simplifica a URL da API).
2.  **Ajuste do Código `page.tsx`:**
    *   Implementar `Suspense` em torno da busca de produtos.
    *   Adicionar `export const dynamic = 'force-dynamic';` para garantir que o Next.js não tente pré-renderizar dados dinâmicos de forma incorreta.
3.  **Refinamento de UI:**
    *   Aplicar o CSS definido nas diretrizes de design (Laranja/Azul) sobre os componentes já estruturados.
    *   Garantir que a tipografia e os espaçamentos sigam o padrão solicitado.

## 6. Estrutura de Dados da Planilha (Definida)
A planilha deve conter as seguintes colunas para ser lida pelo sistema:
*   `id`, `nome`, `descricao`, `preco`, `categoria`, `status` (Ativo/Inativo), `imagem`.

---

### Dicas para o próximo LLM:
*   "Estou trabalhando em um projeto Next.js 16 com Tailwind v4."
*   "O projeto lê dados de uma planilha pública do Google Sheets."
*   "Já resolvemos os erros de instalação do Tailwind e de cache do Next.js."
*   "O foco agora é garantir que a função `getProducts` em `src/lib/sheets.ts` consiga fazer o `fetch` com sucesso e que a `page.tsx` renderize os dados sem erros de hidratação ou prerendering."

---
*Este resumo contém todo o contexto necessário para que qualquer assistente de IA compreenda o histórico, as decisões técnicas tomadas e o estado atual do seu ambiente de desenvolvimento.*