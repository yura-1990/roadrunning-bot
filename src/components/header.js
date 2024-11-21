import React from 'react';
import LanguageSwitcher from './languageSwitcher'
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


function Header () {
    // const { t } = useTranslation();

    return (
        <div class="bd-header py-3 border-bottom border-dark">
            <div class="d-flex align-items-center justify-content-between">
                <Link class="navbar-brand" to="/roadrunning-bot">
                    <img src="/assets/images/image.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-top" />
                </Link>
                <div className='d-flex align-items-center gap-3'>
                    <Link to="/cart" type="button" class="btn border bg-theme-bot text-theme-bot position-relative">
                        <i class="bi bi-cart-plus"></i>
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            99
                        </span>
                    </Link>
                    <LanguageSwitcher />
                </div>
            </div>
        </div>
    );
}

export default Header;