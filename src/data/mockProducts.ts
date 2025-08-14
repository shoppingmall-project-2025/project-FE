// data/mockProducts.ts
import { Product } from '../types/product';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        title: '프리미엄 운동화',
        description: '편안하고 스타일리시한 일상 운동화',
        price: {
            current: 89000,
            original: 159000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/3498db/ffffff?text=운동화',
            alt: '프리미엄 운동화'
        },
        rating: {
            average: 4.5,
            count: 1245
        },
        badges: [
            { type: 'bestseller', text: 'BEST' }
        ],
        availability: {
            inStock: true,
            quantity: 15
        },
        metadata: {
            brand: 'Nike',
            category: 'footwear'
        }
    },
    {
        id: '2',
        title: '2Pack 대용량 배터리',
        description: '84Ah 고성능 배터리 2개 세트',
        price: {
            current: 125000,
            original: 189000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/e74c3c/ffffff?text=배터리',
            alt: '대용량 배터리'
        },
        rating: {
            average: 4.8,
            count: 892
        },
        badges: [
            { type: 'sale', text: '34% OFF' }
        ],
        availability: {
            inStock: true,
            quantity: 8
        },
        metadata: {
            brand: 'PowerMax',
            category: 'electronics'
        }
    },
    {
        id: '3',
        title: '프리미엄 매트리스',
        description: '수면의 질을 높여주는 메모리폼 매트리스',
        price: {
            current: 299000,
            original: 399000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/2ecc71/ffffff?text=매트리스',
            alt: '프리미엄 매트리스'
        },
        rating: {
            average: 4.2,
            count: 567
        },
        badges: [
            { type: 'new', text: 'NEW' }
        ],
        availability: {
            inStock: true,
            quantity: 3
        },
        metadata: {
            brand: 'SleepWell',
            category: 'home'
        }
    },
    {
        id: '4',
        title: '편안한 일상 바지',
        description: '사계절 착용 가능한 편안한 바지',
        price: {
            current: 45000,
            original: 79000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/9b59b6/ffffff?text=바지',
            alt: '편안한 바지'
        },
        rating: {
            average: 4.6,
            count: 234
        },
        badges: [
            { type: 'limited', text: '한정특가' }
        ],
        availability: {
            inStock: true,
            quantity: 12
        },
        metadata: {
            brand: 'ComfortWear',
            category: 'clothing'
        }
    },
    {
        id: '5',
        title: '다용도 쇼핑 카트',
        description: '접이식 대용량 쇼핑카트',
        price: {
            current: 85000,
            original: 129000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/f39c12/ffffff?text=카트',
            alt: '쇼핑 카트'
        },
        rating: {
            average: 4.3,
            count: 678
        },
        badges: [],
        availability: {
            inStock: true,
            quantity: 20
        },
        metadata: {
            brand: 'CartMaster',
            category: 'household'
        }
    },
    {
        id: '6',
        title: '품절 상품 예시',
        description: '현재 품절된 상품입니다',
        price: {
            current: 55000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/95a5a6/ffffff?text=품절',
            alt: '품절 상품'
        },
        badges: [],
        availability: {
            inStock: false,
            quantity: 0
        },
        metadata: {
            category: 'misc'
        }
    },
    {
        id: '7',
        title: '무선 헤드셋',
        description: '고품질 사운드 무선 헤드셋',
        price: {
            current: 159000,
            original: 199000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/8e44ad/ffffff?text=헤드셋',
            alt: '무선 헤드셋'
        },
        rating: {
            average: 4.7,
            count: 523
        },
        badges: [
            { type: 'new', text: 'NEW' }
        ],
        availability: {
            inStock: true,
            quantity: 25
        },
        metadata: {
            brand: 'SoundMax',
            category: 'electronics'
        }
    },
    {
        id: '8',
        title: '스마트 워치',
        description: '건강 관리 스마트 워치',
        price: {
            current: 220000,
            original: 280000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/34495e/ffffff?text=워치',
            alt: '스마트 워치'
        },
        rating: {
            average: 4.4,
            count: 891
        },
        badges: [
            { type: 'bestseller', text: 'HOT' }
        ],
        availability: {
            inStock: true,
            quantity: 7
        },
        metadata: {
            brand: 'TechWear',
            category: 'electronics'
        }
    },
    {
        id: '9',
        title: '스마트 워치2',
        description: '건강 관리 스마트 워치',
        price: {
            current: 220000,
            original: 280000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/34495e/ffffff?text=워치',
            alt: '스마트 워치'
        },
        rating: {
            average: 4.4,
            count: 891
        },
        badges: [
            { type: 'bestseller', text: 'HOT' }
        ],
        availability: {
            inStock: true,
            quantity: 7
        },
        metadata: {
            brand: 'TechWear',
            category: 'electronics'
        }
    },
    {
        id: '10',
        title: '무선 헤드셋2',
        description: '고품질 사운드 무선 헤드셋',
        price: {
            current: 159000,
            original: 199000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/8e44ad/ffffff?text=헤드셋',
            alt: '무선 헤드셋'
        },
        rating: {
            average: 4.7,
            count: 523
        },
        badges: [
            { type: 'new', text: 'NEW' }
        ],
        availability: {
            inStock: true,
            quantity: 25
        },
        metadata: {
            brand: 'SoundMax',
            category: 'electronics'
        }
    },
    {
        id: '11',
        title: '무선 헤드셋3',
        description: '고품질 사운드 무선 헤드셋',
        price: {
            current: 159000,
            original: 199000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/8e44ad/ffffff?text=헤드셋',
            alt: '무선 헤드셋'
        },
        rating: {
            average: 4.7,
            count: 523
        },
        badges: [
            { type: 'new', text: 'NEW' }
        ],
        availability: {
            inStock: true,
            quantity: 25
        },
        metadata: {
            brand: 'SoundMax',
            category: 'electronics'
        }
    },
    {
        id: '12',
        title: '무선 헤드셋4',
        description: '고품질 사운드 무선 헤드셋',
        price: {
            current: 159000,
            original: 199000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/8e44ad/ffffff?text=헤드셋',
            alt: '무선 헤드셋'
        },
        rating: {
            average: 4.7,
            count: 523
        },
        badges: [
            { type: 'new', text: 'NEW' }
        ],
        availability: {
            inStock: true,
            quantity: 25
        },
        metadata: {
            brand: 'SoundMax',
            category: 'electronics'
        }
    },
    {
        id: '13',
        title: '무선 헤드셋5',
        description: '고품질 사운드 무선 헤드셋',
        price: {
            current: 159000,
            original: 199000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/8e44ad/ffffff?text=헤드셋',
            alt: '무선 헤드셋'
        },
        rating: {
            average: 4.7,
            count: 523
        },
        badges: [
            { type: 'new', text: 'NEW' }
        ],
        availability: {
            inStock: true,
            quantity: 25
        },
        metadata: {
            brand: 'SoundMax',
            category: 'electronics'
        }
    },
    {
        id: '14',
        title: '편안한 일상 바지2',
        description: '사계절 착용 가능한 편안한 바지',
        price: {
            current: 45000,
            original: 79000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/9b59b6/ffffff?text=바지',
            alt: '편안한 바지'
        },
        rating: {
            average: 4.6,
            count: 234
        },
        badges: [
            { type: 'limited', text: '한정특가' }
        ],
        availability: {
            inStock: true,
            quantity: 12
        },
        metadata: {
            brand: 'ComfortWear',
            category: 'clothing'
        }
    },
    {
        id: '15',
        title: '편안한 일상 바지3',
        description: '사계절 착용 가능한 편안한 바지',
        price: {
            current: 45000,
            original: 79000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/9b59b6/ffffff?text=바지',
            alt: '편안한 바지'
        },
        rating: {
            average: 4.6,
            count: 234
        },
        badges: [
            { type: 'limited', text: '한정특가' }
        ],
        availability: {
            inStock: true,
            quantity: 12
        },
        metadata: {
            brand: 'ComfortWear',
            category: 'clothing'
        }
    },
    {
        id: '16',
        title: '편안한 일상 바지4',
        description: '사계절 착용 가능한 편안한 바지',
        price: {
            current: 45000,
            original: 79000,
            currency: 'KRW'
        },
        images: {
            thumbnail: 'https://via.placeholder.com/300x300/9b59b6/ffffff?text=바지',
            alt: '편안한 바지'
        },
        rating: {
            average: 4.6,
            count: 234
        },
        badges: [
            { type: 'limited', text: '한정특가' }
        ],
        availability: {
            inStock: true,
            quantity: 12
        },
        metadata: {
            brand: 'ComfortWear',
            category: 'clothing'
        }
    },
];