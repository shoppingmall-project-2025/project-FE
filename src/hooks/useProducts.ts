import { Product, ProductQueryParams } from "../types/product";
import { useCallback, useState, useEffect } from "react";
import { productService } from '../services/productService';


export interface UseProductsResult {
    products: Product[];
    loading: boolean;
    error: string | null;
    pagination: {
        current: number;
        total: number;
        hasNext: boolean;
    } | null;
    refetch: () => void;
    loadMore: () => void;
    hasMore: boolean;
}

// 상품 목록을 위한 훅
export const useProducts = (params?: ProductQueryParams): UseProductsResult => {
    const [products, setProducts] = useState<Product[]>([]);    // 상품 데이터
    const [loading, setLoading] = useState(true);     // 로딩 상태 (API 호출중인지 여부)
    const [error, setError] = useState<string | null>(null);    // 에러 상태
    const [pagination, setPagination] = useState<UseProductsResult['pagination']>(null);

    const fetchProducts = useCallback(async (isLoadMore = false) => {
        try {
            setLoading(true);
            setError(null);

            const currentPage = isLoadMore ? (pagination?.current || 0) + 1 : 1;
            const response = await productService.getProducts({
                ...params,
                page: currentPage
            });

            if (isLoadMore) {
                setProducts(prev => [...prev, ...response.products]);
            } else {
                setProducts(response.products);
            }

            setPagination(response.pagination);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : '상품을 불러오는 중 오류가 발생했습니다.'
            );
        } finally {
            setLoading(false);
        }
    }, [params, pagination?.current]);

    useEffect(() => {
        fetchProducts();
    }, [params?.category, params?.sortBy, params?.sortOrder]);

    const refetch = useCallback(() => {
        fetchProducts(false);
    }, [fetchProducts]);

    const loadMore = useCallback(() => {
        if (pagination?.hasNext && !loading) {
            fetchProducts(true);
        }
    }, [fetchProducts, pagination?.hasNext, loading]);

    return {
        products,
        loading,
        error,
        pagination,
        refetch,
        loadMore,
        hasMore: pagination?.hasNext || false
    };
};

// 특정 상품을 위한 훅
export const useProduct = (id: string) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await productService.getProduct(id);
                setProduct(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : '상품을 불러올 수 없습니다.'
                );
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    return { product, loading, error };
};

// 상품 검색을 위한 훅
export const useProductSearch = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchProducts = useCallback(async (query: string) => {
        if (!query.trim()) {
            setProducts([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await productService.searchProducts(query);
            setProducts(response.products);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : '검색 중 오류가 발생했습니다.'
            );
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        products,
        loading,
        error,
        searchProducts
    };
};