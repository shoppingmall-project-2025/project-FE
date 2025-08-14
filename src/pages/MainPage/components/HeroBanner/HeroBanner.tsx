import React from 'react';
import './HeroBanner.css'
import heroBanner from './hero-banner.png';

const HeroBanner: React.FC = () => {
    return (
        <img
            className="heroBanner"
            src= {heroBanner}
            alt="히어로배너">
        </img>
    );
}

export default HeroBanner;