-- Limpa dados existentes (opcional, cuidado em produção)
-- TRUNCATE products, banners CASCADE;

-- === PRODUTO 1: iPhone 15 Pro Max (Lacrado) ===
INSERT INTO products (id, nome, slug, categoria, condicao, armazenamento, cor, estoque, destaque, ativo, descricao_curta)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', -- UUID Fixo para relacionamento
    'iPhone 15 Pro Max',
    'iphone-15-pro-max-natural',
    'iPhone Lacrado',
    'Lacrado',
    '256GB',
    'Titânio Natural',
    5,
    true,
    true,
    'O design em titânio aeroespacial deixa o iPhone mais leve e resistente.'
);

-- Preço para iPhone 15 Pro Max
INSERT INTO prices (product_id, avista, doze_parcela, doze_total, ativo)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    6899.00,
    641.58, -- 12x
    7699.00, -- Total Parcelado
    true
);

-- Imagens iPhone 15 Pro Max
INSERT INTO product_images (product_id, url, ordem)
VALUES 
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://placehold.co/600x600/e2e8f0/1e293b?text=iPhone+15+Pro+Max+Frente', 1),
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'https://placehold.co/600x600/cbd5e1/1e293b?text=iPhone+15+Pro+Max+Tras', 2);


-- === PRODUTO 2: iPhone 13 (Seminovo) ===
INSERT INTO products (id, nome, slug, categoria, condicao, armazenamento, cor, bateria_percentual, estoque, destaque, ativo, descricao_curta)
VALUES (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    'iPhone 13',
    'iphone-13-128gb-meia-noite-seminovo',
    'iPhone Seminovos',
    'Seminovo',
    '128GB',
    'Meia-noite',
    92, -- Saúde da bateria
    1,
    false,
    true,
    'Aparelho em excelente estado, bateria original com alta durabilidade.'
);

-- Preço para iPhone 13
INSERT INTO prices (product_id, avista, doze_parcela, doze_total, ativo)
VALUES (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    3299.00,
    308.25,
    3699.00,
    true
);

-- Imagens iPhone 13
INSERT INTO product_images (product_id, url, ordem)
VALUES 
    ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'https://placehold.co/600x600/1e293b/ffffff?text=iPhone+13+Seminovo', 1);


-- === PRODUTO 3: Samsung S24 Ultra (Android) ===
INSERT INTO products (id, nome, slug, categoria, condicao, armazenamento, cor, estoque, destaque, ativo, descricao_curta)
VALUES (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    'Samsung Galaxy S24 Ultra',
    'samsung-s24-ultra-cinza',
    'Android',
    'Lacrado',
    '512GB',
    'Cinza Titânio',
    3,
    true,
    true,
    'Com Galaxy AI, câmera de 200MP e processador Snapdragon 8 Gen 3 for Galaxy.'
);

-- Preço para S24 Ultra
INSERT INTO prices (product_id, avista, doze_parcela, doze_total, ativo)
VALUES (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
    7999.00,
    749.90,
    8998.80,
    true
);

-- Imagens S24 Ultra
INSERT INTO product_images (product_id, url, ordem)
VALUES 
    ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'https://placehold.co/600x600/fbbf24/1e293b?text=S24+Ultra', 1);


-- === BANNERS ===
INSERT INTO banners (titulo, imagem_desktop_url, imagem_mobile_url, link, ordem, ativo)
VALUES
    ('Lançamento iPhone 15', 'https://placehold.co/1920x600/1e293b/ffffff?text=O+Novo+iPhone+15+Pro', 'https://placehold.co/600x800/1e293b/ffffff?text=iPhone+15+Pro', '/catalogo', 1, true),
    ('Seminovos Garantidos', 'https://placehold.co/1920x600/3b82f6/ffffff?text=Seminovos+com+Garantia', 'https://placehold.co/600x800/3b82f6/ffffff?text=Seminovos', '/catalogo?categoria=seminovos', 2, true);
