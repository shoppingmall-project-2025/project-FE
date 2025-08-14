// 가격 포맷팅 (숫자 -> KRW 형식으로)
export const formatPrice = (price: number, currency: string = 'KRW'): string => {
    return new Intl.NumberFormat('ko-KR', {
        style: 'currency',  // 숫자를 통화 형식으로 표현하도록
        currency: currency, // 통화 = 'KRW'
        minimumFractionDigits: 0    // 최소 소수점 자릿수를 0으로
    }).format(price);
}

// 할인률 계산
export const getDiscountPercentage = (original: number, current: number): number => {
    if (original <= current) return 0;
    return Math.round(((original - current) / original) * 100);
}

// 할인 금액 계산
export const getDiscountAmount = (original: number, current: number): number => {
    return Math.max(0, original - current);
};

// 숫자 1000단위로 포맷팅
export const formatNumber = (num: number): string => {
    return num.toLocaleString('ko-KR');
};

// 별점 렌더링용 배열
export const generateStarArray = (rating: number): { filled: boolean; half: boolean }[] => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            stars.push({ filled: true, half: false });
        } else if (i === fullStars && hasHalfStar) {
            stars.push({ filled: false, half: true });
        } else {
            stars.push({ filled: false, half: false });
        }
    }

    return stars;
};

// 재고 상태
export const getStockStatus = (inStock: boolean, quantity?: number): 'in-stock' | 'low-stock' | 'out-of-stock' => {
    if (!inStock) return 'out-of-stock';
    if (quantity && quantity <= 5) return 'low-stock';
    return 'in-stock';
};

// 재고 상태 메세지
export const getStockMessage = (inStock: boolean, quantity?: number): string => {
    const status = getStockStatus(inStock, quantity);

    switch (status) {
        case 'out-of-stock':
            return '품절';
        case 'low-stock':
            return `${quantity}개 남음`;
        case 'in-stock':
        default:
            return '재고 충분';
    }
};

// 텍스트를 지정 길이로 자르는용
export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

// 할인중인 상품인지 확인용
export const isOnSale = (originalPrice?: number, currentPrice?: number): boolean => {
    return !!(originalPrice && currentPrice && originalPrice > currentPrice);
};