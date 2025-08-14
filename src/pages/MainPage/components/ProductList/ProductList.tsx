// components/ProductList/ProductList.tsx
import React, { useState, useCallback } from 'react';
import { useProducts } from '../../../../hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';
import { Product } from '../../../../types/product';
import './ProductList.css';

interface ProductListProps {
    category?: string;
    initialSortBy?: 'price' | 'rating' | 'popularity' | 'newest';
    limit?: number;
    showFilters?: boolean;
    className?: string;
    onProductClick?: (product: Product) => void;
    onAddToCart?: (productId: string) => Promise<void> | void;
    onAddProductToCart?: (product: Product) => Promise<void> | void;
    onToggleWishlist?: (productId: string) => Promise<void> | void;
}

export const ProductList: React.FC<ProductListProps> = ({
    category,
    initialSortBy = 'popularity',
    limit = 12,
    showFilters = true,
    className,
    onProductClick,
    onAddToCart,
    onAddProductToCart,
    onToggleWishlist
    }) => {
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const {
        products,
        loading,
        error,
        pagination,
        loadMore,
        hasMore,
        refetch
    } = useProducts({
        category,
        sortBy,
        sortOrder,
        limit
    });

    const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const [newSortBy, newSortOrder] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder];
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
    }, []);

    const handleLoadMore = useCallback(() => {
        if (hasMore && !loading) {
            loadMore();
        }
    }, [hasMore, loading, loadMore]);

    const handleProductClick = useCallback((product: Product) => {
        onProductClick?.(product);
        console.log(`${product.title} 상세페이지로 이동`);
    }, [onProductClick]);

    const handleAddToCart = useCallback(async (productId: string) => {
        try {
            const product = products.find(p => p.id === productId);

            if (product && onAddProductToCart) {
                // 개선된 방식: Product 객체 전체 전달
                await onAddProductToCart(product);
            } else if (onAddToCart) {
                // 기존 방식: productId만 전달
                await onAddToCart(productId);
            }

            if (product) {
                console.log(`${product.title}이(가) 장바구니에 추가되었습니다!`);
            }
        } catch (error) {
            console.error('장바구니 추가 실패:', error);
        }
    }, [products, onAddToCart, onAddProductToCart]);

    const handleToggleWishlist = useCallback(async (productId: string) => {
        try {
            await onToggleWishlist?.(productId);
            const product = products.find(p => p.id === productId);
            if (product) {
                console.log(`${product.title}을(를) 찜목록에서 토글했습니다!`);
            }
        } catch (error) {
            console.error('찜하기 토글 실패:', error);
        }
    }, [products, onToggleWishlist]);

    // 에러 상태
    if (error) {
        return (
            <div>
                <p>상품을 불러오는 중 오류가 발생했습니다.</p>
            </div>
        );
    }

    return (
        <div className={`product-list ${className || ''}`}>
            {/* 컨트롤 영역 */}
            {showFilters && (
                <div className="product-list__controls">
                    <div className="product-list__sort">
                        <label htmlFor="sort-select" className="product-list__sort-label">
                            정렬:
                        </label>
                        <select
                            id="sort-select"
                            value={`${sortBy}-${sortOrder}`}
                            onChange={handleSortChange}
                            className="product-list__sort-select"
                        >
                            <option value="popularity-desc">인기순</option>
                            <option value="newest-desc">최신순</option>
                            <option value="price-asc">낮은 가격순</option>
                            <option value="price-desc">높은 가격순</option>
                            <option value="rating-desc">평점 높은순</option>
                            <option value="rating-asc">평점 낮은순</option>
                        </select>
                    </div>

                    {pagination && (
                        <div className="product-list__info">
              <span className="product-list__count">
                총 {products.length}개 상품
              </span>
                            {pagination.total > 1 && (
                                <span className="product-list__pagination-info">
                  (페이지 {pagination.current} / {pagination.total})
                </span>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* 상품 그리드 */}
            <div className="product-list__grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        size="medium"
                        onProductClick={handleProductClick}
                        onAddToCart={handleAddToCart}
                        onToggleWishlist={handleToggleWishlist}
                    />
                ))}

                {/* 로딩 중일 때 스켈레톤 카드들 */}
                {loading && products.length === 0 && (
                    <>
                        {Array.from({ length: limit }, (_, i) => (
                            <div key={`skeleton-${i}`} className="product-card product-card--loading">
                                <div className="product-card__image-container">
                                    <div className="product-card__image"></div>
                                </div>
                                <div className="product-card__content">
                                    <div className="product-card__title">Loading...</div>
                                    <div className="product-card__current-price">Loading...</div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* 더보기 버튼 */}
            {hasMore && !loading && (
                <div className="product-list__load-more">
                    <button
                        onClick={handleLoadMore}
                        className="product-list__load-more-btn"
                        disabled={loading}
                    >
                        더 많은 상품 보기
                    </button>
                </div>
            )}

            {/* 빈 상태 */}
            {!loading && products.length === 0 && (
                <div className="product-list__empty">
                    <div className="product-list__empty-icon">📦</div>
                    <h3 className="product-list__empty-title">상품이 없습니다</h3>
                    <p className="product-list__empty-description">
                        {category ?
                            `'${category}' 카테고리에 상품이 없습니다.` :
                            '표시할 상품이 없습니다.'
                        }
                    </p>
                    <button
                        onClick={refetch}
                        className="product-list__empty-retry"
                    >
                        다시 시도
                    </button>
                </div>
            )}

            {/* 끝에 도달했을 때 */}
            {!hasMore && products.length > 0 && !loading && (
                <div className="product-list__end">
                    <p>모든 상품을 확인했습니다 ✨</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;