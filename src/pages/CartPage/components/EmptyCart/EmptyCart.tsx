import Reaect from 'react';
import './EmptyCart.css';
import React from "react";

interface EmptyCartProps {
    isAuthenticated: boolean;

    breadcrumbItems?: Array<{label: string; href?: string }>;
    shippingNotice?: string;
    title?: string;
    subtitle?: string;
    icon?: string;
    onLoginClick?: () => void;
    onContinueShoppingClick?: () => void;
    showLoginButton?: boolean;
}

export const EmptyCart: React.FC<EmptyCartProps> = ({
    breadcrumbItems = [{label: '홈'}, {label: '장바구니'}],
    shippingNotice = '귀하만을 위한 무료 배송',
    isAuthenticated,
    title = '장바구니가 비어있습니다',
    subtitle = '좋아하는 상품을 추가하세요.',
    icon = '🛒',
    onLoginClick,
    onContinueShoppingClick,
    showLoginButton = true
}) => {

    // 🔍 디버깅 코드 추가
    console.log('EmptyCart Debug Info:');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('typeof isAuthenticated:', typeof isAuthenticated);
    console.log('!isAuthenticated:', !isAuthenticated);
    console.log('showLoginButton:', showLoginButton);
    console.log('조건 결과:', !isAuthenticated && showLoginButton);

    return (
        <div>

            <div className="CartHeader-top">
                <nav className="breadcrum" aria-label="페이지 경로">
                    {breadcrumbItems.map((item, index) => (
                        <span key={index}>
                            {item.href ? (
                                <a href={item.href} className="breadcrumb-link">
                                    {item.label}
                                </a>
                            ) : (
                                <span className="breadcrumb-link2">{item.label}</span>
                            )}
                            {index < breadcrumbItems.length - 1 && (
                                <span className="breadcrumb-separator"> &gt; </span>
                            )}
                        </span>
                    ))}
                </nav>
            </div>

            {shippingNotice && (
                <div className="shipping-notice">
                    {shippingNotice}
                </div>
            )}

            <div>
                {icon}
            </div>

            <h2>{title}</h2>
            <p>{subtitle}</p>

            <div>
                {!isAuthenticated && showLoginButton && (
                    <div>
                        <div>
                            <button>
                                로그인/가입
                            </button>
                        </div>
                        <div>
                            <button>
                                쇼핑 시작하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmptyCart;