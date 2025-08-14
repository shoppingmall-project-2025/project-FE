import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { Product } from '../types/product';

// 장바구니 아이템용
export interface CartItem {
    id: string;
    title: string;
    price: {
        current: number;
        original?: number;
        currency: string;
    };
    image: string;
    quantity: number;
    availability: {
        inStock: boolean;
        quantity: number;
    };
    options?: {
        size?: string;
        color?: string;
        [key: string]: any;
    };
}

// 장바구니 상태 타입
interface CartState {
    items: CartItem[];
    totalItems: number;
    totalPrice: number;
}

// 액션 타입
type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: string }
    | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

// 초기 상태
const initialState: CartState = {
    items: [],
    totalItems: 0,
    totalPrice: 0,
};

// 장바구니 Context 타입
interface CartContextType extends CartState {
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}

// Context 생성
const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer 함수
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const product = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            let newItems: CartItem[];
            if (existingItem) {
                // 이미 존재하는 아이템이면 수량 증가
                newItems = state.items.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // 새로운 아이템 추가
                const newCartItem: CartItem = {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.images.thumbnail,
                    quantity: 1,
                    availability: product.availability,
                };
                newItems = [...state.items, newCartItem];
            }

            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce((sum, item) => sum + (item.price.current * item.quantity), 0);

            return {
                items: newItems,
                totalItems,
                totalPrice,
            };
        }

        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(item => item.id !== action.payload);
            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce((sum, item) => sum + (item.price.current * item.quantity), 0);

            return {
                items: newItems,
                totalItems,
                totalPrice,
            };
        }

        case 'UPDATE_QUANTITY': {
            const newItems = state.items.map(item =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            ).filter(item => item.quantity > 0); // 수량이 0이면 제거

            const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = newItems.reduce((sum, item) => sum + (item.price.current * item.quantity), 0);

            return {
                items: newItems,
                totalItems,
                totalPrice,
            };
        }

        case 'CLEAR_CART':
            return initialState;

        case 'LOAD_CART': {
            const totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = action.payload.reduce((sum, item) => sum + (item.price.current * item.quantity), 0);

            return {
                items: action.payload,
                totalItems,
                totalPrice,
            };
        }

        default:
            return state;
    }
}

// Provider 컴포넌트
export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    const { user, isAuthenticated } = useAuth(); // AuthContext에서 사용자 정보 가져오기

    // 컴포넌트 마운트 시 장바구니 로드
    useEffect(() => {
        loadCart();
    }, [isAuthenticated, user]);

    // 장바구니 상태 변경 시 저장
    useEffect(() => {
        saveCart();
    }, [state.items, isAuthenticated, user]);

    // 장바구니 로드
    const loadCart = () => {
        if (isAuthenticated && user) {
            // 회원인 경우: API에서 장바구니 데이터 로드 (현재는 localStorage 시뮬레이션)
            const savedCart = localStorage.getItem(`cart_user_${user.id}`);
            if (savedCart) {
                const cartItems: CartItem[] = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: cartItems });
            }
        } else {
            // 비회원인 경우: localStorage에서 로드
            const savedCart = localStorage.getItem('cart_guest');
            if (savedCart) {
                const cartItems: CartItem[] = JSON.parse(savedCart);
                dispatch({ type: 'LOAD_CART', payload: cartItems });
            }
        }
    };

    // 장바구니 저장
    const saveCart = () => {
        if (isAuthenticated && user) {
            // 회원인 경우: API로 저장 (현재는 localStorage 시뮬레이션)
            localStorage.setItem(`cart_user_${user.id}`, JSON.stringify(state.items));
        } else {
            // 비회원인 경우: localStorage에 저장
            localStorage.setItem('cart_guest', JSON.stringify(state.items));
        }
    };

    // 아이템 추가
    const addItem = (product: Product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    // 아이템 제거
    const removeItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    // 수량 업데이트
    const updateQuantity = (id: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    // 장바구니 비우기
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider
            value={{
                ...state,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

// 장바구니용 훅
export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}