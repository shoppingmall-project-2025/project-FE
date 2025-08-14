import React, { useState, useEffect, useRef} from 'react';
import { categories} from '../../../../data/categories';
import {MainCategory} from "../../../../types/category";
import './CategoryMenu.css';

const CategoryMenu: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [activeMainCategoryId, setActiveCategory] = React.useState<number>(categories[0].id);

    // 마우스가 영역 입장시
    const handleMouseEnter = () => {
        setIsMenuOpen(true);
    }

    // 마우스가 영역 퇴장시
    const handleMouseLeave = () => {
        setIsMenuOpen(false);
    }

    // 대분류에 마우스 호버시 실행될 함수
    const handleMainCategoryHover = (id: number) => {
        setActiveCategory(id);
    };

    // 현재 활성화된 대분류에 해당하는 소분류 찾기
    const activeSubcategories = categories.find(
        (category) => category.id === activeMainCategoryId
    )?.subcategories;


    return (
        <div
            className="category-menu-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="category-button">
                ⭐카테고리
            </div>

            {/* 메뉴 열렸을때만 패널 보여줌*/}
            {isMenuOpen && (
                <div className="category-dropDown-pannel">
                    {/* 왼쪽: 대분류 */}
                    <div className="dropDown-main-categories-container">
                        {categories.map((mainCategory) => (
                            <div
                            key={mainCategory.id}
                            className={`main-category-item $ {
                                mainCategory.id === activeSubcategory ? 'active' : ''
                            }`}
                            onMouseEnter={() => handleMainCategoryHover(mainCategory.id)}
                            >
                                {mainCategory.name}
                            </div>
                        ))}
                    </div>
                    {/* 오른쪽: 소분류 */}
                    <div className="dropDown-sub-categories-container">
                        {activeSubcategories?.map((subCategory) => (
                            <a href="#"
                               key={subCategory.id}
                               className="subcategory-item">
                                <img
                                    src={subCategory.imageUrl}
                                    alt={subCategory.name}
                                />
                                <p>{subCategory.name}</p>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryMenu;