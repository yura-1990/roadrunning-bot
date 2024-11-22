import React, { useEffect, useState } from 'react';
import LanguageSwitcher from './languageSwitcher'
// import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


function Header () {
    // const { t } = useTranslation();

    const [headerBg, setHeaderBg] = useState(false); // Initial background color

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setHeaderBg(scrollPosition > 100)
            
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={headerBg ? 'bg-theme w-100 header-fixed' : ' w-100 header-fixed'}>
            <div className="bd-header py-3 container ">
                <div className="d-flex align-items-center justify-content-between">
                    <Link className="navbar-brand border rounded-pill" to="/roadrunning-bot">
                        <img src={headerBg ? "/roadrunning-bot/assets/images/image.png" : "/roadrunning-bot/assets/images/logo_itog.png"} alt="Logo" width="50"  className="d-inline-block align-text-top" />
                    </Link>
                    <div className='d-flex align-items-center gap-3'>
                        <Link to="/roadrunning-bot/cart" type="button" className="btn border bg-theme-bot text-theme-bot position-relative">
                            <i className={"bi bi-cart-plus"}></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-theme shadow border">
                                0
                            </span>
                        </Link>
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;