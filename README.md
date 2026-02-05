# Projeto Fitch Tecnologia

Este é o projeto do site da Fitch Tecnologia, construído com Next.js, React e Tailwind CSS.

## Pré-requisitos

- Node.js instalado (versão 18 ou superior).

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Estrutura do Projeto

- `app/`: Contém as rotas da aplicação (App Router).
  - `/`: Página inical.
  - `/catalogo`: Catálogo de produtos.
  - `/produto/[slug]`: Detalhe do produto.
  - `/contato`: Informações de contato.
- `components/`: Componentes reutilizáveis (Header, Footer, Botões).
- `public/`: Arquivos estáticos (imagens, fontes).

## Comandos

- `npm run dev`: Inicia o ambiente de desenvolvimento.
- `npm run build`: Cria a versão de produção.
- `npm run start`: Inicia o servidor de produção.
