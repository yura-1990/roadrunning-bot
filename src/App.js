import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTelegram from './hooks/useTelegram';
import { initI18n } from './i18n';
import Header from "./components/header";
import Home from "./pages/home";


const App = () => {

    const { t } = useTranslation();
    const { isReady, user, language } = useTelegram();  // Get the language from Telegram hook

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isReady && language) {
            initI18n(language);
            setLoading(false);
        }
    }, [isReady, language]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container'>
            <Header />
            <Home />
        </div>
    );
}

export default App;
