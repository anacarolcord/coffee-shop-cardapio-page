# Como Copiar o Projeto para o Windows

O projeto foi criado em `/home/claude/projects/coffee-shop-cardapio-page` (sistema de arquivos Linux) devido às restrições de read-only do `/mnt/c`.

## Opção 1: Copiar via Linha de Comando (Recomendado)

### No WSL (Terminal Linux):

```bash
# Copiar todo o projeto para o Windows
cp -r /home/claude/projects/coffee-shop-cardapio-page /mnt/c/MyProject/

# Ou se preferir outro local:
cp -r /home/claude/projects/coffee-shop-cardapio-page /mnt/c/Users/SeuUsuario/Desktop/
```

**Nota:** Se você receber erro de "read-only file system", significa que o `/mnt/c` está bloqueado. Neste caso, use a Opção 2.

---

## Opção 2: Usar o Explorador de Arquivos do Windows

### Passo a Passo:

1. Abra o **Explorador de Arquivos** do Windows

2. Na barra de endereço, digite:
   ```
   \\wsl$\Ubuntu\home\claude\projects\coffee-shop-cardapio-page
   ```
   (Substitua "Ubuntu" pelo nome da sua distribuição WSL se for diferente)

3. Selecione toda a pasta `coffee-shop-cardapio-page`

4. Copie (Ctrl+C)

5. Navegue até o destino desejado:
   ```
   C:\MyProject\
   ```

6. Cole (Ctrl+V)

---

## Opção 3: Via PowerShell (Windows)

### No PowerShell do Windows:

```powershell
# Copiar projeto para C:\MyProject\
Copy-Item -Path "\\wsl$\Ubuntu\home\claude\projects\coffee-shop-cardapio-page" -Destination "C:\MyProject\" -Recurse

# Ou para outro local:
Copy-Item -Path "\\wsl$\Ubuntu\home\claude\projects\coffee-shop-cardapio-page" -Destination "C:\Users\SeuUsuario\Desktop\" -Recurse
```

---

## Opção 4: Criar ZIP e Copiar

### No WSL:

```bash
cd /home/claude/projects
tar -czf coffee-shop-cardapio-page.tar.gz coffee-shop-cardapio-page/

# Depois no Windows, extraia o arquivo
```

---

## Após Copiar o Projeto

### 1. Abrir no VS Code

```bash
# Via terminal WSL:
cd /caminho/para/o/projeto/copiado
code .

# Ou pelo Windows:
# Abra o VS Code e arraste a pasta para dentro
```

### 2. Reinstalar Dependências (se necessário)

Se você copiou o `node_modules`, pode ter problemas de permissão. Neste caso:

```bash
# Deletar node_modules
rm -rf node_modules
rm -rf .next

# Reinstalar
npm install
```

### 3. Rodar o Projeto

```bash
npm run dev
```

---

## Verificando o Caminho WSL

Se não souber o caminho exato do WSL:

### No WSL:

```bash
# Ver o caminho completo
pwd

# Converter para formato Windows
wslpath -w $(pwd)
```

Isso mostrará algo como:
```
\\wsl$\Ubuntu\home\claude\projects\coffee-shop-cardapio-page
```

---

## Alternativa: Trabalhar Direto do WSL

Se preferir trabalhar direto do sistema Linux (recomendado para desenvolvimento):

1. Mantenha o projeto em `/home/claude/projects/`
2. Abra o VS Code do WSL:
   ```bash
   code /home/claude/projects/coffee-shop-cardapio-page
   ```
3. Desenvolva normalmente
4. Faça deploy diretamente para Vercel via Git

**Vantagens:**
- Melhor performance
- Sem problemas de permissão
- Line endings corretos (LF vs CRLF)
- Compatível com ferramentas Linux

---

## Importante: Configuração WSL

Se quiser habilitar escrita em `/mnt/c`, você precisará:

1. Editar `/etc/wsl.conf` (requer sudo, que está bloqueado)
2. Remover a opção `ro` (read-only)
3. Reiniciar o WSL

**Mas atenção:** Essa configuração foi feita por segurança corporativa. Consulte seu administrador de TI antes de modificar.

---

## Resumo das Opções

| Opção | Prós | Contras |
|-------|------|---------|
| **Explorador de Arquivos** | Simples, visual | Manual |
| **PowerShell** | Rápido, scriptável | Requer PowerShell |
| **Trabalhar no WSL** | Melhor performance | Não fica em C:\ |
| **Git** | Versionamento | Requer configuração |

---

## Recomendação Final

💡 **Melhor abordagem:**

1. Inicialize um repositório Git:
   ```bash
   cd /home/claude/projects/coffee-shop-cardapio-page
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Crie um repo no GitHub

3. Push:
   ```bash
   git remote add origin https://github.com/seu-usuario/coffee-shop-cardapio-page.git
   git push -u origin main
   ```

4. Clone em qualquer lugar (Windows ou Linux):
   ```bash
   git clone https://github.com/seu-usuario/coffee-shop-cardapio-page.git
   ```

**Vantagens:**
- Versionamento
- Backup automático
- Deploy fácil na Vercel
- Trabalhe de qualquer máquina

---

Se tiver dúvidas, consulte: `IMPLEMENTACAO_RESUMO.md`
