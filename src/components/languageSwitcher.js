import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const [languages, setLanguages] = useState([]);
    const { i18n } = useTranslation();

    useEffect(() => {
        const availableLanguages = Object.keys(i18n.services.resourceStore.data);
        setLanguages(availableLanguages);
    }, [i18n]);

    const handleLanguageChange = (lang) => {        
        i18n.changeLanguage(lang);
        localStorage.setItem('web-language', lang); // Save language choice in localStorage
    };

    return (
        <div className="dropdown bg-theme-bot rounded-3">
            <button 
                className="btn bg-theme-bot text-theme-bot border dropdown-toggle " 
                type="button" id="dropdownMenuButton" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
            >
                { i18n.language }
            </button>
            <ul className="dropdown-menu bg-theme-bot">
                {
                    languages.filter(lang=>lang!==i18n.language).map((lang, index) => (
                        <li onClick={(e) => handleLanguageChange(lang)} key={index} >
                            <span className="dropdown-item text-theme-bot" >{ lang }</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default LanguageSwitcher