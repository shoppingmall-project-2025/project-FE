// components/ProductCard/ProductCard.tsx
import React, { useState, useCallback } from 'react';
import { Product } from '../../../../types/product';
import {
    formatPrice,
    getDiscountPercentage,
    generateStarArray,
    getStockMessage,
    getStockStatus,
    truncateText
} from '../../../../utils/formatUtils';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    size?: 'small' | 'medium' | 'large';
    showDescription?: boolean;
    onProductClick?: (product: Product) => void;
    onAddToCart?: (productId: string) => Promise<void> | void;
    onToggleWishlist?: (productId: string) => Promise<void> | void;
    className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
                                                            product,
                                                            size = 'medium',
                                                            showDescription = true,
                                                            onProductClick,
                                                            onAddToCart,
                                                            onToggleWishlist,
                                                            className
                                                        }) => {
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleProductClick = useCallback(() => {
        onProductClick?.(product);
    }, [product, onProductClick]);

    const handleAddToCart = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onAddToCart || !product.availability.inStock || isAddingToCart) return;

        try {
            setIsAddingToCart(true);
            await onAddToCart(product.id);
            // 성공 시 사용자 피드백 (토스트 등)
            console.log(`${product.title}이(가) 장바구니에 추가되었습니다!`);
        } catch (error) {
            console.error('장바구니 추가 실패:', error);
            // 에러 시 사용자 피드백
        } finally {
            setIsAddingToCart(false);
        }
    }, [product, onAddToCart, isAddingToCart]);

    const handleToggleWishlist = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onToggleWishlist || isTogglingWishlist) return;

        try {
            setIsTogglingWishlist(true);
            await onToggleWishlist(product.id);
            console.log(`${product.title}을(를) 찜목록에서 토글했습니다!`);
        } catch (error) {
            console.error('찜하기 토글 실패:', error);
        } finally {
            setIsTogglingWishlist(false);
        }
    }, [product, onToggleWishlist, isTogglingWishlist]);

    const handleImageError = useCallback(() => {
        setImageError(true);
    }, []);

    const renderBadges = () => {
        if (!product.badges || product.badges.length === 0) return null;

        return (
            <div className="product-card__badges">
                {product.badges.map((badge, index) => (
                    <span
                        key={index}
                        className={`product-card__badge product-card__badge--${badge.type}`}
                        style={{ color: badge.color }}
                    >
            {badge.text}
          </span>
                ))}
            </div>
        );
    };

    const renderImage = () => {
        if (imageError) {
            return (
                <div className="product-card__no-image">
                    <span>이미지를 불러올 수 없습니다</span>
                </div>
            );
        }

        return (
            <img
                src={product.images.thumbnail}
                alt={product.images.alt || product.title}
                className="product-card__image"
                onError={handleImageError}
                loading="lazy"
            />
        );
    };

    const renderPrice = () => {
        const discountPercentage = product.price.original
            ? getDiscountPercentage(product.price.original, product.price.current)
            : 0;

        return (
            <div className="product-card__price">
        <span className="product-card__current-price">
          {formatPrice(product.price.current, product.price.currency)}
        </span>

                {product.price.original && discountPercentage > 0 && (
                    <>
            <span className="product-card__original-price">
              {formatPrice(product.price.original, product.price.currency)}
            </span>
                        <span className="product-card__discount">
              {discountPercentage}% 할인
            </span>
                    </>
                )}
            </div>
        );
    };

    const renderRating = () => {
        if (!product.rating) return null;

        const stars = generateStarArray(product.rating.average);

        return (
            <div className="product-card__rating">
                <div className="product-card__stars">
                    {stars.map((star, index) => (
                        <span
                            key={index}
                            className={`product-card__star ${
                                star.filled ? 'product-card__star--filled' :
                                    star.half ? 'product-card__star--half' : ''
                            }`}
                        >
              ★
            </span>
                    ))}
                </div>
                <span className="product-card__rating-count">
          ({product.rating.count.toLocaleString()})
        </span>
            </div>
        );
    };

    const renderStockStatus = () => {
        const stockStatus = getStockStatus(
            product.availability.inStock,
            product.availability.quantity
        );

        if (stockStatus === 'in-stock') return null;

        return (
            <div className={`product-card__stock-status product-card__stock-status--${stockStatus}`}>
                {getStockMessage(product.availability.inStock, product.availability.quantity)}
            </div>
        );
    };

    const renderQuickActions = () => {
        return (
            <div className="product-card__quick-actions">
                <button
                    className="product-card__quick-action product-card__quick-action--wishlist"
                    onClick={handleToggleWishlist}
                    disabled={isTogglingWishlist}
                    aria-label="찜하기"
                    title="찜하기"
                >
                    {isTogglingWishlist ? '⏳' : '♡'}
                </button>

                <button
                    className="product-card__quick-action product-card__quick-action--cart"
                    onClick={handleAddToCart}
                    disabled={!product.availability.inStock || isAddingToCart}
                    aria-label="장바구니에 추가"
                    title="장바구니에 추가"
                >
                    {isAddingToCart ? '⏳' : '🛒'}
                </button>
            </div>
        );
    };

    return (
        <article
            className={`product-card product-card--${size} ${className || ''}`}
            onClick={handleProductClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProductClick();
                }
            }}
        >
            {renderBadges()}

            <div className="product-card__image-container">
                {renderImage()}
                {renderQuickActions()}
            </div>

            <div className="product-card__content">
                <h3 className="product-card__title">
                    {truncateText(product.title, 50)}
                </h3>

                {showDescription && product.description && (
                    <p className="product-card__description">
                        {truncateText(product.description, 80)}
                    </p>
                )}

                {renderPrice()}
                {renderRating()}
                {renderStockStatus()}
            </div>
        </article>
    );
};

export default ProductCard;