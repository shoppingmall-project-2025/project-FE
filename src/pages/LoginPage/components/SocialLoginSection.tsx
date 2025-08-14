import React from 'react';
import './SocialLoginSection.css';


const socialPlatforms = [
    {
        name: '카카오톡',
        url: 'https://www.facebook.com/',
        iconPath: '/logo/logo_kakaoTalk.png'
    },
    {
        name: '구글',
        url: 'https://www.facebook.com/',
        iconPath: '/logo/logo_google.svg'
    },
    {
        name: '페이스북',
        url: 'https://www.facebook.com/',
        iconPath: '/logo/logo_faceBook.svg'
    },
    {
        name: '애플',
        url: 'https://www.facebook.com/',
        iconPath: '/logo/logo_apple.svg'
    },
];

const SocialLoginSection: React.FC = () => {
    const handleSocialLogin = (provider: string) => {
        console.log(`${provider} 로그인 시도`);
        // 각 소셜 로그인 API 호출...

    }
    return (
        <div>
            <div className="social-login-section">
                <div className="help-text">
                    로그인하는 데 문제가 있으신가요?
                </div>
            </div>
            <div className="continue-text">
                다른 방법으로 계속하기
            </div>

            <div className="social-buttons-grid">
                {socialPlatforms.map(({ name, iconPath }) => (
                    <button
                        key={name}
                        onClick={() => handleSocialLogin(name)}
                        className="social-button"
                    >
                        <img
                            width='40px'
                            height='40px'
                            src={iconPath}
                            alt={`${name} 로그인`}
                            className="social-icon"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SocialLoginSection;