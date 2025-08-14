import React, { useState } from 'react';

import { MOCK_RECOMMENDED_PRODUCTS } from "../../data/mockRecommendedProducts";
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

// 컴포넌트 imports
import CartHeader from "./components/CartHeader/CartHeader";
import EmptyCart from "./components/EmptyCart/EmptyCart";
import {CartItemsList} from "./components/CartItemsList/CartItemsList";

// 스타일 imports
import './CartPage.css';
import {render} from "@testing-library/react";
import OrderSummary from "./components/OrderSummary/OrderSummary";

interface CartPageProps {
    recommendedProducts?: typeof MOCK_RECOMMENDED_PRODUCTS;
    onNavigateToProducts?: () => void;
    onNavigateToLogin?: () => void;
    onNavigateToRegister?: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
    recommendedProducts = MOCK_RECOMMENDED_PRODUCTS,
    onNavigateToProducts,
    onNavigateToLogin,
    onNavigateToRegister,
    }) => {

    const { isAuthenticated, user } = useAuth(); // 로그인 관련
    const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart(); // 장바구니 관련
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false); // 뭐지이건


    // 가격 포맷팅
    const formatPrice = (price: number) => {
        return price.toLocaleString('ko-KR');
    };

    // 수량 변경 핸들러
    const handleQuantityChange = (id: string, newQuantity: number) => {
        updateQuantity(id, newQuantity);
    }

    // 아이템 삭제 핸들러
    const handleRemoveItem = (id: string) => {
        removeItem(id);
    }

    // 장바구니 비우기 핸들러
    const handleClearCart = () => {
        if (window.confirm('장바구니를 비우시겠습니까?')) {
            clearCart();
        }
    }

    // 주문하기 핸들러
    const handleCheckout = async() => {
        if (!isAuthenticated) {
            // 로그인하라고 로그인 모달 만들?기???
            return;
        }
        if (totalItems === 0) {
            alert('장바구니에 상품이 없습니다.');
            return 0;
        }

        try {
            setIsCheckoutLoading(true);

            // 실제 주문 처리 로직 시뮬레이션
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('주문이 완료되었습니다!');
        } catch (error) {
            console.error('주문 처리 중 오류 발생: ', error);
            alert('주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    // 비회원-> 로그인페이지 이동 핸들러
    const handleGoToLoginPage = () => {

    }

    // 쇼핑 계속하기 핸들러
    const handleContinueShoppingClick = () => {
        onNavigateToProducts?.();
    };

    // 중앙 컨텐츠 렌더링
    const renderMainContent = () => {
        // 비회원 or 장바구니 비어있음
        if (!isAuthenticated || items.length === 0) {
            return (
                <EmptyCart
                    isAuthenticated={isAuthenticated}
                    title={!isAuthenticated ? '장바구니가 비어있습니다' : '장바구니가 비어있습니다'}
                    subtitle="좋아하는 상품을 추가하세요."
                    onLoginClick={handleGoToLoginPage}
                    onContinueShoppingClick={handleContinueShoppingClick}
                    showLoginButton={!isAuthenticated}
                />
            );
        }

        // 회원 and 장바구니에 상품 있음
        return (
          <CartItemsList
              items={items}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}
              formatPrice={formatPrice}
          />
        );
    }


    return (
        <>
            {/* 장바구니 헤더 */}
            <CartHeader
                isAuthenticated={isAuthenticated}
                userName={user?.name}
            />

            {/* 중앙 장바구니 부분 */}
            <div>
                {renderMainContent()}
            </div>

            {/* 우측 주문 요약 */}
            <OrderSummary
                totalItems={isAuthenticated ? totalItems : 0}
                totalPrice={isAuthenticated ? totalPrice : 0}
                formatPrice={formatPrice}
                onCheckout={handleCheckout}
                isAuthenticated={isAuthenticated}
                isLoading={isCheckoutLoading}
                freeShippingThreshold={50000}
            />

            {/* 하단 추천 상품.. 해야되는디.. */}
        </>
    );
}

export default CartPage;