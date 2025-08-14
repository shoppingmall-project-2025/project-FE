import React, { useState } from 'react';
import './Navigation.css';
import { Link } from "react-router-dom";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import { useAuth } from '../../../../context/AuthContext';

const Navigation: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <header className="header">
            <div className="navigation-header-container">
                <div className="header-left">
                    <div className="logo">
                        <img src="/logo/logo_temu.svg" alt="temu logo" className="logo" />
                    </div>
                    <nav className="nav">
                        <a href="#" className="nav-item">
                            <span className="icon">⭐</span>
                            베스트 셀러 상품
                        </a>
                    </nav>
                    <nav className="nav">
                        <a href="#" className="nav-item">
                            <span className="icon">⭐</span>
                            별점
                        </a>
                    </nav>
                    <nav className="nav">
                        <a href="#" className="nav-item">
                            <span className="icon">⭐</span>
                            개학 시즌
                        </a>
                    </nav>
                    <nav className="nav">
                        <a href="#" className="nav-item">
                            <span className="icon">⭐</span>
                            신상품
                        </a>
                    </nav>
                    <CategoryMenu />
                </div>

                <div className="header-center">
                    <div className="search-container">
                        <input type="text" className="search-input"/>
                        <button type="submit" className="search-button">🔍</button>
                    </div>
                </div>

                <div className="header-right">
                    {isAuthenticated ? (
                        // 로그인 한 상태라면
                        <div>
                            <div className="user-menu-container">
                                <span className="icon">⭐</span>
                                <div className="user-menu-login">
                                    <span onClick={handleLogout} className="logout-link">
                                        로그아웃
                                    </span>
                                </div>
                            </div>
                            <div className="user-menu-Account">
                                주문 & 계정
                            </div>
                        </div>
                    ) : (
                        // 로그인 안한 상태라면
                        <Link to="/login" className="user-menu">
                            <div>
                                <div className="user-menu-container">
                                    <span className="icon">⭐</span>
                                    <div className="user-menu-container">
                                        <div className="user-menu-login">
                                            로그인/회원가입
                                        </div>
                                    </div>
                                </div>
                                <div className="user-menu-Account">
                                    주문 & 계정
                                </div>
                            </div>
                        </Link>
                    )}

                    <div className="about-language">한국어</div>
                    <Link to="/cart" className="navigation-cart">
                        <img
                            src="/icon/icon_cart.png"
                            className="icon_cart"
                            alt="장바구니"/>
                    </Link>

                </div>
            </div>
        </header>
    );
}

export default Navigation;