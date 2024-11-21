import React from 'react';
import LanguageSwitcher from './languageSwitcher'
import { useTranslation } from 'react-i18next';

function Header () {
    const { t } = useTranslation();

    return (
        <div className='pb-2 border-bottom d-flex align-items-center justify-content-between flex-wrap'> 
            <h2 className="">{ t('title') }</h2>
            <LanguageSwitcher />
        </div>
    );
}

export default Header;