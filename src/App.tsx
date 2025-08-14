import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import CartPage from "./pages/CartPage/CartPage";
import {CartProvider} from "./context/CartContext";

export const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/cart" element={<CartPage />} />
                        </Routes>
                    </div>
                </Router>
            </CartProvider>

        </AuthProvider>
    );
}