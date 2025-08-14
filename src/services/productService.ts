import {Product, ProductResponse, ProductQueryParams} from "../types/product";
import {MOCK_PRODUCTS} from "../data/mockProducts";

export interface ProductService {
    getProducts(params?: ProductQueryParams): Promise<ProductResponse>; // 상품 목록 가져오기
    getProduct(id: string): Promise<Product>;                           // 특정 상품 가져오기
    searchProducts(query: string): Promise<ProductResponse>;            // 상품 검색하기
}

export class MockProductService implements ProductService {
    // API 지연 시뮬레이션용 딜레이 함수
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 상품 목록 가져오기
    async getProducts(params?: ProductQueryParams): Promise<ProductResponse> {
        await this.delay(800);  // API 지연 시뮬레이션

        const {
            page = 1,
            limit = 10,
            category,
            sortBy = 'popularity',
            sortOrder = 'desc'
        } = params || {};   // params가 null/undefined라면 빈 객체 사용

        let filteredProducts = [...MOCK_PRODUCTS];

        // 카테고리 필터링
        if (category) {
            filteredProducts = MOCK_PRODUCTS.filter(p =>
                p.metadata?.category === category
            );
        }

        // 정렬
        filteredProducts.sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return sortOrder === 'asc'
                        ? a.price.current - b.price.current
                        : b.price.current - a.price.current;
                case 'rating':
                    const aRating = a.rating?.average || 0;
                    const bRating = b.rating?.average || 0;
                    return sortOrder === 'asc' ? aRating - bRating : bRating - aRating;
                case 'newest':
                    // 실제로는 createdAt 기준으로 정렬
                    return sortOrder === 'asc'
                        ? a.id.localeCompare(b.id)
                        : b.id.localeCompare(a.id);
                case 'popularity':
                default:
                    const aPopularity = a.rating?.count || 0;
                    const bPopularity = b.rating?.count || 0;
                    return sortOrder === 'asc'
                        ? aPopularity - bPopularity
                        : bPopularity - aPopularity;
            }
        });

        // 페이지네이션
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

        return {
            products: paginatedProducts,
            pagination: {
                current: page,
                total: Math.ceil(filteredProducts.length / limit),
                hasNext: endIndex < filteredProducts.length
            }
        };
    }

    // 특정 상품 가져오기
    async getProduct(id: string): Promise<Product> {
        await this.delay(600);

        const product = MOCK_PRODUCTS.find(p => p.id === id);
        if (!product) {
            throw new Error('상품을 찾을 수 없습니다.');
        }
        return product;
    }

    // 상품 검색하기
    async searchProducts(query: string): Promise<ProductResponse> {
        await this.delay(600);

        const filteredProducts = MOCK_PRODUCTS.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.description?.toLowerCase().includes(query.toLowerCase()) ||
            p.metadata?.brand?.toLowerCase().includes(query.toLowerCase())
        );

        return {
            products: filteredProducts,
            pagination: {
                current: 1,
                total: 1,
                hasNext: false
            }
        };
    }
}

// 실제 REST API 서비스 (향후 사용)
export class RestProductService implements ProductService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
    }

    async getProducts(params?: ProductQueryParams): Promise<ProductResponse> {
        const queryParams = new URLSearchParams();

        if (params?.page) queryParams.append('page', params.page.toString());
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.category) queryParams.append('category', params.category);
        if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
        if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        const response = await fetch(`${this.baseUrl}/api/products?${queryParams}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async getProduct(id: string): Promise<Product> {
        const response = await fetch(`${this.baseUrl}/api/products/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async searchProducts(query: string): Promise<ProductResponse> {
        const response = await fetch(
            `${this.baseUrl}/api/products/search?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
}

// 서비스 팩토리
const createProductService = (): ProductService => {
    const serviceType = process.env.REACT_APP_DATA_SOURCE || 'mock';

    switch (serviceType) {
        case 'rest':
            return new RestProductService();
        case 'mock':
        default:
            return new MockProductService();
    }
};

export const productService = createProductService();