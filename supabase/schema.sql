-- Tabela de Produtos: Centraliza as informações principais dos itens à venda
-- Armazena dados fixos do produto que mudam com pouca frequência
CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nome text NOT NULL,
    slug text UNIQUE NOT NULL, -- Identificador amigável para URL (SEO)
    categoria text NOT NULL CHECK (categoria IN ('iPhone Lacrado', 'iPhone Seminovos', 'Produtos Apple', 'Android', 'Eletrônicos', 'Acessórios')),
    condicao text NOT NULL CHECK (condicao IN ('Lacrado', 'Seminovo')),
    armazenamento text, -- Ex: 128GB, 256GB - Pode ser nulo para acessórios
    cor text, -- Ex: Preto, Branco
    bateria_percentual int, -- Importante para verificar saúde da bateria de seminovos
    estoque int NOT NULL DEFAULT 0,
    destaque boolean NOT NULL DEFAULT false, -- Se true, exibe em seções especiais da Home
    ativo boolean NOT NULL DEFAULT true, -- Controle de exibição (Soft Delete)
    descricao_curta text, -- Pequeno resumo exibido nos cards
    created_at timestamp with time zone DEFAULT now()
);

-- Índices básicos para otimização de queries comuns
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_categoria ON products(categoria);
CREATE INDEX idx_products_ativo ON products(ativo);
CREATE INDEX idx_products_destaque ON products(destaque);

-- Tabela de Preços: Histórico e valores atuais
-- Separado de products para permitir manter histórico de preços se necessário no futuro
CREATE TABLE prices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    avista numeric NOT NULL, -- Preço promocional (PIX/Dinheiro)
    doze_parcela numeric, -- Valor da parcela (Ex: 100,00)
    doze_total numeric, -- Valor total parcelado (Ex: 1200,00)
    ativo boolean NOT NULL DEFAULT true, -- Se é o preço vigente
    updated_at timestamp with time zone DEFAULT now()
);

-- Regra de integridade: Garante que um produto só tenha UM preço ATIVO por vez
CREATE UNIQUE INDEX idx_one_active_price_per_product ON prices(product_id) WHERE (ativo = true);

-- Tabela de Imagens: Galeria de fotos do produto
CREATE TABLE product_images (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    url text NOT NULL, -- Caminho da imagem (Supabase Storage ou URL externa)
    ordem int NOT NULL DEFAULT 0 -- Define a ordem de exibição no carrossel (menor aparece primeiro)
);

-- Tabela de Banners: Carrossel principal da Home
CREATE TABLE banners (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo text NOT NULL, -- Para acessibilidade e gestão interna
    imagem_desktop_url text NOT NULL, -- Imagem widescreen
    imagem_mobile_url text NOT NULL, -- Imagem otimizada para celular
    link text, -- Destino ao clicar (opcional)
    ordem int NOT NULL DEFAULT 0,
    ativo boolean NOT NULL DEFAULT true
);
