// 소분류용
export interface SubCategory {
    id: number;
    name: string;
    imageUrl: string; // 이미지 주소
}

// 대분류용 (소분류 목록 포함)
export interface MainCategory {
    id: number;
    name: string;
    subcategories: SubCategory[];
}