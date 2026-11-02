# Como adicionar imagens ao cardápio

Este tutorial explica como adicionar ou atualizar a foto de um produto no cardápio digital do Tragos Leves.

---

## Passo 1 — Acesse o ImgBB

Abra o site **[imgbb.com](https://imgbb.com)** no navegador.

---

## Passo 2 — Faça o upload da imagem

1. Clique no botão **"Start uploading"**
2. Selecione a foto do produto no seu computador
3. Aguarde o upload terminar

> Dica: use fotos em boa resolução e bem iluminadas. Formato JPG ou PNG funcionam bem.

---

## Passo 3 — Copie o link direto da imagem

Após o upload, uma tela de confirmação vai aparecer com vários links. Você precisa copiar **apenas o "Direct link"**:

1. Procure o campo chamado **"Direct link"**
2. Clique no botão **"Copy"** ao lado dele
3. O link copiado vai ter este formato:

```
https://i.ibb.co/XXXXXXX/nome-da-foto.jpg
```

⚠️ **Atenção:** não copie os outros campos (BBCode, HTML, Markdown). Copie **somente o Direct link**.

---

## Passo 4 — Cole o link na planilha

1. Abra a planilha **tragos-leves-cardapio** no Google Sheets
2. Encontre a linha do produto que deseja adicionar a foto
3. Clique na célula da coluna **F (Imagem)**
4. Cole o link copiado (Ctrl+V)
5. Salve a planilha (Ctrl+S)

A planilha deve ficar assim:

| A (Categoria) | B (Nome) | C (Descricao) | D (Preco) | E (Status) | F (Imagem) |
|---|---|---|---|---|---|
| Cafés Quentes | Café coado | Café coado... | 4 | Ativo | https://i.ibb.co/... |

---

## Passo 5 — Ver no cardápio

O cardápio atualiza automaticamente a cada hora. Se quiser ver a foto aparecer na hora, avise o responsável técnico para reiniciar o servidor.

---

## Dúvidas frequentes

**A imagem apareceu em branco ou deu erro. O que fazer?**
- Verifique se o link copiado começa com `https://i.ibb.co/` (com o `i.` no começo)
- Certifique-se de que copiou o **Direct link**, não a URL da página

**Posso usar foto do Google Fotos ou WhatsApp?**
- Salve a foto no seu computador primeiro, depois siga o tutorial do zero

**Posso usar qualquer tamanho de foto?**
- Sim, mas fotos muito pesadas (acima de 5MB) podem demorar mais para carregar
