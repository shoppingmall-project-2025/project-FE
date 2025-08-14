import React, {createContext, useContext, useState, useEffect, ReactNode} from "react";

// 사용자 타입 정의
export interface User {
    email: string;
    name?: string;
    id?: string;
}

// AuthContext 타입 정의
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string) => Promise<void>;
    logout: () => void;
    loading: boolean;
}

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props 타입
interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider 컴포넌트
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // 컴포넌트 마운트 시, 로컬 스토리지에서 사용자 정보 복원 (마운트시점 최초 1회만 실행됨)
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch(error) {
                console.error('유저 정보를 저장하는데 실패했습니다: ', error);
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);

    // 로그인 함수
    const login = async (email: string): Promise<void> => {
        setLoading(true);
        try {
            // 실제 API 호출 시뮬레이션
            const userData = await fakeLoginApi(email);

            // 사용자 정보 저장
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    // 로그아웃 함수
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// useAuth 훅
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

// 임시 로그인 API (나중에 실제 API로 교체하기)
const fakeLoginApi = (email: string):Promise<User> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'alstj091692@gmail.com') {
                resolve({
                    email,
                    name: '사용자',
                    id: '1'
                });
            } else {
                reject(new Error('이메일을 확인해주세요.'));
            }
        }, 1000);
    });
};