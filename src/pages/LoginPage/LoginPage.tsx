import React, {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/Header'
import LoginForm from './components/LoginForm';
import SocialLoginSection from "./components/SocialLoginSection";
import Footer from './components/Footer';
import { useAuth } from '../../context/AuthContext';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { login, isAuthenticated, loading } = useAuth();
    const [error, setError] = useState<string | null>(null);

    // 이미 로그인된 사용자라면, 메인 페이지로 리다이랙트
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', {replace: true});
        }
    }, [isAuthenticated, navigate]);

    // 로그인 처리
    const handleLogin = async (email: string) => {
        setError(null);

        try {
            await login(email);
            // 로그인 성공 -> 메인페이지 리다이렉트
            navigate('/', {replace: true});
        } catch(e) {
            const error = e as Error;
            setError(error.message || '로그인 실패.. 이메일 확인해주세요..');
        }
    };

    return (
        <>
            <Header />
            <LoginForm onSubmit={handleLogin} loading={loading} error={error}/>
            <SocialLoginSection/>
            <Footer/>
        </>
    );
};
export default LoginPage;