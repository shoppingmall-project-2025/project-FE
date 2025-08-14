import React from 'react';
import './LightningDeal.css';

const handleLightningDeal = () => {

}

const LightningDeal: React.FC = () => {
    return (
        <div className="lightning-deals">
            <div className="lightning-deals-content">
                <span className="lightning-icon">⚡</span>
                <span className="lightning-title">Lightning deals</span>
                <span className="lightning-subtitle">Limited time offered</span>
                <button className="nav-arrow" onClick={handleLightningDeal}> › </button>
            </div>
        </div>
    );
};

export default LightningDeal;