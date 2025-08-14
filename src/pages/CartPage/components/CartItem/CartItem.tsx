import React from 'react';
import './CartItem.css';
import { CartItem as CartItemType } from '../../../../context/CartContext';

interface CartItemProps {
    item: CartItemType;
    onQuantityChange: (id: string, quantity: number) => void;   // 장바구니 수량변경 이벤트핸들러
    onRemove: (id: string) => void; // 삭제 이벤트 핸들러
    formatPrice: (price: number) => string; // 가격 포맷팅 함수

    isSelected?: boolean;   // 체크박스 선택 상태
    onSelectionChange?: (id: string, selected: boolean) => void;    // 선택 상태변경 핸들러
    showCheckbox?: boolean; // 체크박스 표시 여부
    disabled?: boolean; // 비활성화(???) 상태. 뭐지이게
}

export const CartItem:React.FC<CartItemProps> = ({
    item,
    isSelected,
    onQuantityChange,
    onRemove,
    onSelectionChange,
    formatPrice,
    showCheckbox = true,    // 체크박스 표시 여부
    disabled = false
}) => {

    // 내부 이벤트 핸들러 함수들
    // 장바구니 아이템 수량 감소 핸들러
    const handleQuantityDecrease = () => {
        if (item.quantity > 1) {
            onQuantityChange(item.id, item.quantity-1);
        }
    };

    // 장바구니 아이템 수량 증가 핸들러
    const handleQuantityIncrease = () => {
        onQuantityChange(item.id, item.quantity + 1);
        // 재고체크는 부모 컴포넌트(CartPage)에서 처리 예정
    };

    const handleRemove = () => {
        onRemove(item.id);
    };

    const handleSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelectionChange?.(item.id, e.target.checked);
    };

    // 계산된 값들
    const isOutOfStock = !item.availability.inStock;
    const totalPrice = item.price.current * item.quantity;

    // 원가 있으면 원가*수량, 없으면 null
    const originalTotalPrice = item.price.original
        ? item.price.original * item.quantity
        : null;


    return (
        <div>
            {showCheckbox && (
                <div>
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={handleSelectionChange}
                        disabled={disabled || isOutOfStock}
                        arial-label = {`${item.title} 선택`}
                    />
                </div>
            )}

            <div>
                <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                />
                {isOutOfStock && (
                    <div>
                        <span>품절</span>
                    </div>
                )}
            </div>

            <div>
                <h3>{item.title}</h3>

                {item.options && Object.keys(item.options).length > 0 && (
                    <div>
                        {Object.entries(item.options).map(([key, value]) => (
                            <span key={key}>
                                {key}: {value}
                            </span>
                        ))}
                    </div>
                )}

                <div>
                    {isOutOfStock && (
                        <span>품절</span>
                    )}
                    {item.availability.quantity < 5 && item.availability.quantity > 0 && (
                        <span>
                        재고 {item.availability.quantity}개 남음 !!
                    </span>
                    )}
                </div>
            </div>

            <div>
                <button
                    onClick={handleQuantityDecrease}
                    disabled={item.quantity <= 1 || disabled || isOutOfStock }
                    aria-label="수량 감소"
                    type="button"
                >
                    -
                </button>

                <span aria-label={`수량 ${item.quantity}개`}>
                    {item.quantity}
                </span>

                <button
                    onClick={handleQuantityIncrease}
                    disabled={disabled || isOutOfStock }
                    aria-label="수량 증가"
                    type="button"
                >
                    +
                </button>
            </div>

            <div>
                <span>
                    {formatPrice(totalPrice)}원
                </span>

                {originalTotalPrice && originalTotalPrice > totalPrice && (
                    <span>
                        {formatPrice(originalTotalPrice)}원
                    </span>
                )}
            </div>

            // 삭제 버튼
            <button
                onClick={handleRemove}
                className="remove-btn"
                disabled={disabled}
                title="장바구니에서 삭제" // 툴팁
                aria-label={`${item.title} 삭제`}
                type="button"
            >
                x
            </button>
        </div>
    );
}

export default CartItem;