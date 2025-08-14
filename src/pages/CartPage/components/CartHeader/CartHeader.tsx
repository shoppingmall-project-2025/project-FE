import React from 'react';
import './CartHeader.css';

interface CartHeaderProps {
    isAuthenticated: boolean;
    userName?: string;
}

const CartHeader: React.FC<CartHeaderProps> = ({
    isAuthenticated,
    userName
    }) => {
    return (
        <div>
            <div className="user-info">
                <img
                    src="/logo/logo_temu.svg"
                    alt="temu 로고"
                    className="user-info-temu-logo"
                />
                <img
                    src="/icon/icon_lock.svg"
                    alt="자물쇠"
                    className="user-info-lock"
                />
                {isAuthenticated ? (
                    <div>
                        <span className="security-msg">
                            모든 데이터는 안전하게 보호됩니다
                        </span>

                        <span className="user-status">
                            👤 { '로그아웃' }
                        </span>
                    </div>
                ) : (
                    <span className="security-msg">
                            모든 데이터는 안전하게 보호됩니다
                    </span>
                )}
            </div>
        </div>
    );
}

export default CartHeader;