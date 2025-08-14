import React, {useState} from 'react';
import { CartItem as CartItemType } from '../../../../context/CartContext';
import CartItem from '../CartItem/CartItem';

interface CartItemListProps {
    items: CartItemType[];
    onQuantityChange: (id: string, quantity: number) => void;
    onRemoveItem: (id: string) => void;
    onClearCart: () => void;
    formatPrice: (price: number) => string;
    showSelectAll?: boolean;
    title?: string;
}

export const CartItemsList: React.FC<CartItemListProps> = ({
    items,
    onQuantityChange,
    onRemoveItem,
    onClearCart,
    formatPrice,
    showSelectAll = true,
    title
}) => {

    const [selectedItems, setSelectedItems] = useState<Set<string>>(
        // 초기값: 모든 아이템 선택됨
        new Set(items.map(item => item.id))
    );

    // 체크박스 전체 선택/해제 핸들러
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>)=> {
        if (e.target.checked) {
            // 전체 선택
            setSelectedItems(new Set(items.map(item => item.id)));
        } else {
            // 전체 해제
            setSelectedItems(new Set());
        }
    }

    // 개별 아이템 체크박스 선택/해제 핸들러
    const handleItemSelection = (id: string, selected: boolean)=> {
        // 기존 Set 복사해옴
        const newSelectedItems = new Set(selectedItems);

        if (selected) {
            newSelectedItems.add(id);
        } else {
            newSelectedItems.delete(id);
        }
        setSelectedItems(newSelectedItems);
    };

    // 체크박스 선택된 아이템 일괄삭제
    const handleClearSelected = () => {
        selectedItems.forEach(id => {
            onRemoveItem(id); // 부모 컴포넌트의 삭제함수 호출
        });

        // 선택 상태 초기화
        setSelectedItems(new Set());
    }


    // 계산된 값들
    // 전체 선택여부 판단 (아이템 0개 이상 && 선택된값===아이템개수)
    const isAllSelected = items.length > 0 && selectedItems.size === items.length;

    // 선택된 아이템 존재 여부
    const hasSelectedItems = selectedItems.size > 0;


    // 렌더링
    // 아이템 없으면 렌더링 X
    if (items.length === 0) {
        return null;
    }

    return (
        <div>

            {showSelectAll && (
                <div>

                    // 전체선택 체크박스
                    <div>
                        <input
                            type="checkbox"
                            id="select-all"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            aria-label="전체 상품 선택"
                        />
                        <label htmlFor="select-all">
                            전체 선택
                        </label>
                    </div>

                    <div>
                        <button
                            onClick={onClearCart}
                            type="button"
                        >
                            전체삭제
                        </button>
                    </div>
                </div>
            )}

            { /* 아이템 목록 영역 */}
            <div>
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        isSelected={selectedItems.has(item.id)}
                        onQuantityChange={onQuantityChange}
                        onRemove={onRemoveItem}
                        onSelectionChange={handleItemSelection}
                        formatPrice={formatPrice}
                        showCheckbox={showSelectAll}
                    />
                ))}
            </div>
        </div>
    );
}