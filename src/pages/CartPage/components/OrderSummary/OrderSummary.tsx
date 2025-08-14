import React from 'react';
import './OrderSummary.css';

interface OrderSummaryProps {
    totalItems: number;
    totalPrice: number;
    shippingFee?: number;
    discountAmount?: number;
    formatPrice: (price: number) => string;
    onCheckout: () => void;
    isAuthenticated: boolean;
    isLoading?: boolean;
    discountInfo?: string;
    freeShippingThreshold?: number;
}

interface BenefitItem {
    icon: string;
    title: string;
    description?: string;
}

interface PaymentMethod {
    name: string;
    icon?: string;
}

const MEMBER_BENEFITS: BenefitItem[] = [
    {
        icon: '✅',
        title: '안전한 결제 승인',
        description: 'Temu는 결제 정보를 보호하기 위해 최신 기술을 다루고 있습니다.'
    }
];

const PAYMENT_METHODS: PaymentMethod[] = [
    { name: 'PayPal' },
    { name: 'Visa' },
    { name: 'Master' },
    { name: 'Maestro' },
    { name: '기타' }
];

export const OrderSummary: React.FC<OrderSummaryProps> = ({
                                                              totalItems,
                                                              totalPrice,
                                                              shippingFee = 3000,
                                                              discountAmount = 0,
                                                              formatPrice,
                                                              onCheckout,
                                                              isAuthenticated,
                                                              isLoading = false,
                                                              discountInfo = '할인 쿠폰 및 적립금을 확인하세요',
                                                              freeShippingThreshold = 50000
                                                          }) => {
    const isFreeShipping = isAuthenticated && totalPrice >= freeShippingThreshold;
    const finalShippingFee = isFreeShipping ? 0 : shippingFee;
    const finalTotal = totalPrice - discountAmount + finalShippingFee;

    return (
        <div className="order-summary">
            <h3 className="order-summary__title">주문 요약</h3>

            <div className="order-summary__content">
                <div className="summary-row">
                    <span>합계</span>
                    <span>{formatPrice(totalPrice)}원</span>
                </div>

                {discountAmount > 0 && (
                    <div className="summary-row summary-row--discount">
                        <span>할인</span>
                        <span>-{formatPrice(discountAmount)}원</span>
                    </div>
                )}

                <div className="summary-row">
                    <span>배송비</span>
                    <span>
            {isFreeShipping ? (
                <span className="free-shipping">무료</span>
            ) : (
                `${formatPrice(finalShippingFee)}원`
            )}
          </span>
                </div>

                {!isFreeShipping && isAuthenticated && (
                    <div className="shipping-notice">
                        {formatPrice(freeShippingThreshold - totalPrice)}원 더 구매하면 무료배송!
                    </div>
                )}

                <div className="summary-divider"></div>

                <div className="summary-row summary-row--total">
                    <span>총 결제 금액</span>
                    <span>{formatPrice(finalTotal)}원</span>
                </div>

                {discountInfo && (
                    <div className="discount-info">
                        {discountInfo}
                    </div>
                )}

                <button
                    className="checkout-btn"
                    onClick={onCheckout}
                    disabled={totalItems === 0 || isLoading}
                    type="button"
                >
                    {isLoading ? (
                        '처리 중...'
                    ) : (
                        `결제하기 (${totalItems})`
                    )}
                </button>
            </div>

            <div className="benefits-section">
                <div className="security-notice">
                    🔒 더욱 페이지에서 안전하게 보호됩니다
                </div>

                {MEMBER_BENEFITS.map((benefit, index) => (
                    <div key={index} className="benefit-item">
                        <div className="benefit-title">
                            <span className="benefit-icon">{benefit.icon}</span>
                            {benefit.title}
                        </div>
                        {benefit.description && (
                            <div className="benefit-desc">
                                {benefit.description}
                            </div>
                        )}
                    </div>
                ))}

                <div className="payment-section">
                    <h4>1. 결제 방법</h4>
                    <div className="payment-methods">
                        {PAYMENT_METHODS.map((method, index) => (
                            <div key={index} className="payment-method">
                                {method.name}
                            </div>
                        ))}
                    </div>

                    <h4>2. 보안 인증</h4>
                    <div className="security-badges">
                        <div className="security-badge">🔒 SSL</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;