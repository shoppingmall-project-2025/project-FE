import React, {useRef, useState} from 'react';
import './LoginForm.css'

interface LoginFormProps {
    onSubmit: (email: string) => void;
    loading?: boolean;
    error?: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading = false, error }) => {
    const [email, setEmail] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // input창 비어있으면 자동 포커스
        if (email.trim() == '') {
            inputRef.current?.focus();
            return;
        }

        onSubmit(email);
    }

    return (
        <form className="login-form-container" onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="email" className="input-label">
                    이메일 또는 전화번호
                </label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    ref={inputRef}
                    disabled={loading}
                />
                { error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </div>

            <button
                type="submit"
                className="submit-button"
                disabled={loading}
            >
                { loading ? '로그인중...' : '계속'}
            </button>
        </form>
    );
};

export default LoginForm;