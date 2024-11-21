import React from 'react';
import LanguageSwitcher from './languageSwitcher'
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';


function Header () {
    // const { t } = useTranslation();

    return (
        <div class="bd-header py-3 border-bottom border-dark">
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <h1 class="d-flex align-items-center fs-4 text-theme mb-0">Road running</h1>
                </div>
                <LanguageSwitcher />
            </div>
        </div>
    );
}

export default Header;