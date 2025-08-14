import { Product } from '../types/product';

export const MOCK_RECOMMENDED_PRODUCTS:Product[] = [
    {
        id: 'rec-1',
        title: '인기 추천 상품 1',
        price: {
            current: 89000,
            original: 159000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/3498db/ffffff?text=운동화',
            alt: '프리미엄 운동화'
        },
        availability: {
            inStock: true,
            quantity: 15
        }
    },
    {
        id: 'rec-2',
        title: '인기 추천 상품 2',
        price: {
            current: 89000,
            original: 159000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/3498db/ffffff?text=운동화',
            alt: '프리미엄 운동화'
        },
        availability: {
            inStock: true,
            quantity: 15
        }
    },
]