import React from 'react';
import './MainPage.css';
import Navigation from "./components/Navigation/Navigation";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import LightningDeal from './components/LightningDeal/LightningDeal';
import ProductList from "./components/ProductList/ProductList";

import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import {Product} from "../../types/product";

const MainPage: React.FC = () => {
    // 장바구니 Context 연결
    const { addItem } = useCart();
    const { isAuthenticated } = useAuth();

    // 장바구니에 상품추가 핸들러
    const handleAddProductToCart = async (product: Product) => {
        try {
            addItem(product);
            console.log(`${product.title}이 장바구니에 추가됨`);
        } catch (error) {
            console.log(error);
        }
    }

    // 찜 핸들러 만들기
    // 상품클릭 핸들러 만들기

    return (
        <div className="mainPage-container">
            <Navigation />
            <HeroBanner />
            <LightningDeal />
            <ProductList
                onAddProductToCart={handleAddProductToCart}
            />
        </div>
    );
}

export default MainPage;