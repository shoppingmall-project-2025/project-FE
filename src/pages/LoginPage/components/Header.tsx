import React from 'react';
import './Header.css'

const Header: React.FC = () => {
    return (
        <div className="login-header-container">
            <div className="header-title">
                로그인/회원가입
            </div>
            <div className="header-security-message">
                <img className="security-icon"
                     src='/icon/icon_lock.svg' alt="자물쇠"/>
                모든 데이터는 안전하게 보호됩니다
            </div>
        </div>
    );
}

export default Header;