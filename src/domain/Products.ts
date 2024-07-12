export interface Products {
    id: string;
    title: string;
    condition: string;
    thumbnail_id: string;
    catalog_product_id: string | null;
    listing_type_id: string;
    permalink: string;
    buying_mode: string;
    site_id: string;
    category_id: string;
    domain_id: string;
    thumbnail: string;
    currency_id: string;
    order_backend: number;
    price: number;
    original_price: number | null;
    sale_price: {
        price_id: string;
        amount: number;
        conditions: {
            eligible: boolean;
            context_restrictions: string[];
            start_time: string | null;
            end_time: string | null;
        };
        currency_id: string;
        exchange_rate: any; // Puede ser cualquier tipo, aquí no está especificado
        payment_method_prices: any[]; // Puede ser cualquier tipo, aquí no está especificado
        payment_method_type: string;
        regular_amount: number | null;
        type: string;
        metadata: {
            campaign_discount_percentage: number;
            campaign_end_date: string;
            funding_mode: string;
            order_item_price: number;
            promotion_id: string;
            variation: string;
            campaign_id: string;
            discount_meli_amount: number;
            experiment_id: string;
            promotion_type: string;
        };
    } | null;
    available_quantity: number;
    official_store_id: number | null;
    official_store_name: string | null;
    use_thumbnail_id: boolean;
    accepts_mercadopago: boolean;
    shipping: {
        store_pick_up: boolean;
        free_shipping: boolean;
        logistic_type: string;
        mode: string;
        tags: string[];
        benefits: any; // Puede ser cualquier tipo, aquí no está especificado
        promise: any; // Puede ser cualquier tipo, aquí no está especificado
        shipping_score: number;
    };
    stop_time: string;
    seller: {
        id: number;
        nickname: string;
    };
    attributes: {
        id: string;
        name: string;
        value_id: string | null;
        value_name: string;
        attribute_group_id: string;
        attribute_group_name: string;
        value_struct: {
            number: number;
            unit: string;
        } | null;
        values: {
            id: string | null;
            name: string;
            struct: {
                unit: string;
                number: number;
            } | null;
            source: number;
        }[];
        source: number;
        value_type: string;
    }[];
    installments: {
        quantity: number;
        amount: number;
        rate: number;
        currency_id: string;
    };
    winner_item_id: string | null;
    catalog_listing: boolean;
    discounts: any[] | null; // Puede ser cualquier tipo, aquí no está especificado
    promotions: any[]; // Puede ser cualquier tipo, aquí no está especificado
    inventory_id: string | null;
    variation_filters?: string[];
    varations_data?: {
        [variationId: string]: {
            thumbnail: string;
            ratio: string;
            name: string;
            pictures_qty: number;
            price: number;
            inventory_id: string;
            user_product_id: string;
            attributes: {
                id: string;
                name: string;
                value_name: string;
                value_type: any; // Puede ser cualquier tipo, aquí no está especificado
            }[];
        };
    };
}
export interface ProductDetail {
    id: string;
    site_id: string;
    title: string;
    seller_id: number;
    category_id: string;
    official_store_id: number | null;
    price: number;
    base_price: number;
    original_price: number | null;
    currency_id: string;
    initial_quantity: number;
    sale_terms: any[]; // Array de términos de venta, puede ser de cualquier tipo específico
    buying_mode: string;
    listing_type_id: string;
    condition: string;
    permalink: string;
    thumbnail_id: string;
    thumbnail: string;
    pictures: string[]; // Array de URLs de imágenes
    video_id: string;
    descriptions: string[]; // Array de descripciones
    accepts_mercadopago: boolean;
    non_mercado_pago_payment_methods: string[]; // Array de métodos de pago no MercadoPago
    shipping: any; // Detalles de envío, puede ser de cualquier tipo específico
    international_delivery_mode: string;
    seller_address: any; // Dirección del vendedor, puede ser de cualquier tipo específico
    seller_contact: any; // Contacto del vendedor, puede ser de cualquier tipo específico
    location: any; // Ubicación, puede ser de cualquier tipo específico
    coverage_areas: any[]; // Áreas de cobertura, puede ser de cualquier tipo específico
    attributes: any[]; // Atributos, puede ser de cualquier tipo específico
    listing_source: string;
    variations: any[]; // Variaciones, puede ser de cualquier tipo específico
    status: string;
    sub_status: string[]; // Array de sub-estados
    tags: string[]; // Array de etiquetas
    warranty: string;
    catalog_product_id: string;
    domain_id: string;
    parent_item_id: string | null;
    deal_ids: string[]; // Array de IDs de ofertas
    automatic_relist: boolean;
    date_created: string;
    last_updated: string;
    health: any; // Salud, puede ser de cualquier tipo específico
    catalog_listing: boolean;
  }
  export interface Category {
    id: string;
    name: string;
    results: number;
  }
  
  export interface Categories {
    id: string;
    name: string;
    type: string;
    values: Category[];
  }

