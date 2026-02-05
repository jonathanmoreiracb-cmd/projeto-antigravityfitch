export interface Banner {
    id: string;
    titulo: string;
    imagem_desktop_url: string;
    imagem_mobile_url: string;
    link: string | null;
    ordem: number;
    ativo: boolean;
}

export type HighlightStyle = 'dark' | 'light' | 'blue';

export interface HomeHighlight {
    id: string;
    product_id: string;
    titulo_override: string | null;
    subtitulo_override: string | null;
    estilo: HighlightStyle;
    ordem: number;
    ativo: boolean;
    created_at: string;
    // Join
    product?: Product;
}

export interface ProductImage {
    id: string;
    product_id: string;
    url: string;
    ordem: number;
}

export interface Price {
    id: string;
    product_id: string;
    avista: number;
    doze_parcela: number | null;
    doze_total: number | null;
    ativo: boolean;
    updated_at: string;
}

export type Category = 'iPhone Lacrado' | 'iPhone Seminovos' | 'Produtos Apple' | 'Android' | 'Eletrônicos' | 'Acessórios';
export type Condition = 'Lacrado' | 'Seminovo';

export interface Product {
    id: string;
    nome: string;
    slug: string;
    categoria: Category;
    condicao: Condition;
    armazenamento: string | null;
    cor: string | null;
    bateria_percentual: number | null;
    estoque: number;
    destaque: boolean;
    ativo: boolean;
    descricao_curta: string | null;
    created_at: string;
    // Joins
    prices?: Price[];
    product_images?: ProductImage[];
}

export function getProductMainImage(product: Product): string {
    if (product.product_images && product.product_images.length > 0) {
        // Sort by order asc
        const sorted = [...product.product_images].sort((a, b) => a.ordem - b.ordem);
        return sorted[0].url;
    }
    return '/placeholder-image.jpg'; // Fallback
}

export function getProductActivePrice(product: Product): Price | null {
    if (product.prices && product.prices.length > 0) {
        // Return the first one (should be only one due to filter/logic)
        return product.prices[0];
    }
    return null;
}

export const CATEGORIES = [
    'iPhone Lacrado',
    'iPhone Seminovos',
    'Produtos Apple',
    'Android',
    'Eletrônicos',
    'Acessórios'
];
