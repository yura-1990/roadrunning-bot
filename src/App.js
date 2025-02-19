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
import InvoiceItem from "./pages/invoiceItems";

const App = () => {

    const { tg, language} = useTelegram();
    const [loading, setLoading] = useState(true);
    const getCarts = useCart((state) => state.getCarts)
    const getToken = useAuth((state) => state.getToken)
    const authToken = useAuth((state) => state.state.token)

    useEffect(() => {
        tg.ready()
        initI18n(language);
        setLoading(false);
        getCarts()
    }, [language]);

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
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/events/:id" element={<SingleEvent />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/participate/:id" element={<Participate />} />
                    {
                        authToken ? <Route path="/invoice" element={<Invoices />} /> : <Route path="/invoice" element={<GoBack />} />
                    }
                    <Route path="/marathons/:id" element={<SingleMarathon />} />
                    <Route path="/marathons" element={<Marathon />} />
                    <Route path="/invoice-items" element={<InvoiceItem />} />
                </Routes>
                <TimerProgress />
                <Footer />
                <Modal />
            </div>
        </div>
    );
}

export default App;
