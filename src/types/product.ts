
export interface Product {
    id: string;
    title: string;
    description?: string;
    price: {
        current: number;    // 현재 판매 가격
        original?: number;  // 원래 가격 (할인 전 가격)
        currency: string;   // 통화 코드 ('KRW', 'USD' 등..)
    };
    images: {
        thumbnail: string;
        alt?: string;
    };
    rating?: {
        average: number;
        count: number;
    };
    badges?: Array<{
        type: 'sale' | 'new' | 'bestseller' | 'limited';
        text: string;
        color?: string;
    }>;
    availability: {
        inStock: boolean;
        quantity: number;
    };
    metadata?: {
        brand?: string;
        category: string;
    };
}

export interface ProductResponse {
    products: Product[];    // 현재 페이지의 상품 배열
    pagination: {           // 페이지네이션 정보
        current: number;
        total: number;
        hasNext: boolean;
    }
}

export interface ProductQueryParams {
    page ?: number; // 페이지 번호
    limit?: number; // 페이지당 상품 수
    category?: string;  // 카테고리 필터
    sortBy?: 'price' | 'rating' | 'popularity' | 'newest';  // 정렬 기준
    sortOrder?: 'asc' | 'desc';
}