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
import Events from './pages/events';
import Participate from './pages/participate';
import TimerProgress from './components/timeProgress';
import useCart from './zustand/cart';
import Invoices from './pages/invoices';
import SingleMarathon from "./pages/singleMarathon";
import Marathon from "./pages/marathon";
import useAuth from "./zustand/auth";
import Modal from "./components/modal";
import GoBack from "./components/goBack";

const App = () => {

    const { isReady, language, user } = useTelegram();
    const [loading, setLoading] = useState(true);
    const getCarts = useCart((state) => state.getCarts)
    const getToken = useAuth((state) => state.getToken)
    const authToken = useAuth((state) => state.state.token)

    useEffect(() => {
        if (isReady && language) {
            initI18n(language);
            setLoading(false);
            getCarts()
        }
    }, [isReady, language]);

    useEffect(()=>{
        getToken()

    }, [])

    if (loading) {
        return <div>Loading the web mini app...</div>;
    }
    

    return (
        <div>
            <Header />
            <div className='custom-mt container'>

                <Breadcrumb />

                <Routes>
                    <Route path="/roadrunning-bot" element={<Home />} />
                    <Route path="/roadrunning-bot/cart" element={<Cart />} />
                    <Route path="/roadrunning-bot/events/:id" element={<SingleEvent />} />
                    <Route path="/roadrunning-bot/events" element={<Events />} />
                    <Route path="/roadrunning-bot/participate/:id" element={<Participate />} />
                    {
                        authToken ? <Route path="/roadrunning-bot/invoice" element={<Invoices />} /> : <Route path="/roadrunning-bot/invoice" element={<GoBack />} />
                    }
                    <Route path="/roadrunning-bot/marathons/:id" element={<SingleMarathon />} />
                    <Route path="/roadrunning-bot/marathons" element={<Marathon />} />
                </Routes>   
                <TimerProgress />
                <Footer />
                <Modal />
            </div>
        </div>
    );
}

export default App;
