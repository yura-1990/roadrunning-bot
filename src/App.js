import React, { useEffect, useState } from 'react';
import useTelegram from './hooks/useTelegram';
import { initI18n } from './i18n';
import Header from "./components/header";
import Home from "./pages/home";
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/cart';
import Breadcrumb from './components/breadcrumb';
import SingleEvent from './pages/singleEvent';
import Footer from './components/footer';


const App = () => {

    const { isReady, language } = useTelegram();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isReady && language) {
            initI18n(language);
            setLoading(false);
        }
    }, [isReady, language]);

    if (loading) {
        return <div>Loading the web mini app...</div>;
    }

    return (
        <div className='container'>
            <Header />

            <Breadcrumb />

            <Routes>
                <Route path="/roadrunning-bot" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/event/:id" element={<SingleEvent />} />
            </Routes>

            <Footer />
        </div>
    );
}

export default App;
