import React, {useContext, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next';
import useCart from '../zustand/cart';
import useEvent from '../zustand/events'
import { Link } from 'react-router-dom';
import { TimerContext } from "../components/timerContext";
import useAuth from "../zustand/auth";


const Cart = () => {
    const { t } = useTranslation();
    const carts = useCart((state) => state.state.carts)
    const deleteCart = useCart((state) => state.deleteCart)
    const formatWithSpaces = useCart((state) => state.formatWithSpaces)
    const getCarts = useCart((state) => state.getCarts)
    const formatDate = useEvent((state) => state.formatDate)
    const getToken = useAuth((state) => state.getToken)
    const authToken = useAuth((state) => state.state.token)

    const {stopTimer} = useContext(TimerContext)

    useEffect(()=>{
        getCarts()
        getToken()
        if (carts.length === 0) {
            stopTimer()
        }
    }, [])

    const destroyCart = async (index)=>{

        if (window.confirm(t('are_you_sure_you_want_to_delete'))) {
            await deleteCart(index)

            if (localStorage.getItem('cart')) {
                const getCart = JSON.parse(localStorage.getItem('cart'))

                console.log(getCart)
                if (getCart.length === 0) {
                    stopTimer()
                }
            }
        }
    }

    return (
        <div>
            <div className="cart-header text-center">
                <h1 className="cart-title">{ carts?.length > 0 ? t('cart_details') : t('no_purchases_in_cart') }</h1>
            </div>

            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="list-group">
                        {carts && carts.map((el, i) => <div key={i} className="list-group-item cart-item pb-5 shadow rounded-2 overflow-hidden mb-2">
                            <div onClick={() => destroyCart(i)}
                                 className='position-absolute delete-cart border px-2 rounded bg-theme-bot text-theme-bot'
                            >
                                <i className="bi bi-trash3"></i></div>

                            <div className='d-flex flex-wrap justify-content-between align-items-center'>
                                <p className="cart-item-title h3 mb-1">{el?.marathon?.marathon_type?.name}</p>
                                <p className="cart-item-title mb-1 fw-bold">{formatWithSpaces(el?.marathon?.price)} UZS</p>
                            </div>
                            <div className='d-flex flex-wrap gap-3 justify-content-between align-items-center'>
                                <p className="cart-item-title fw-bold mb-1">Date</p>
                                <p className=" d-flex gap-2 flex-wrap cart-item-title mb-1 text-decoration-underline fw-bold">
                                    <span> { formatDate(el?.marathon?.event_has_marathon?.date_event, t)} </span>
                                    <span>{ el?.marathon?.datetime_from } - { el?.marathon?.datetime_to }</span>
                                </p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="cart-item-title mb-1">
                            <span className='fw-bold'>
                                Number: <span className='px-2 text-white rounded bg-theme'>{ el.number }</span>
                            </span>
                                </p>
                                <p className="cart-item-title mb-1 fw-bold">{ el?.number_price ? formatWithSpaces(el.number_price) : 0 } UZS</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="cart-item-title fw-bold mb-1">{el?.participant?.uniform?.type}</p>
                                <p className="cart-item-title mb-1 fw-bold">{el?.participant?.uniform?.size}</p>
                            </div>
                            <hr/>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="cart-item-title h3 mb-1">{t('total')}</p>
                                <p className="cart-item-title mb-1 fw-bold">{el.description ? formatWithSpaces(el.description) : 0} UZS</p>
                            </div>
                        </div>)
                        }
                    </div>
                </div>
                <div className="col-12 mt-md-0 mt-4">
                    <div className="card">
                        <div className="card-body">
                            {
                                carts?.length > 0 ? <>
                                        <h5 className="card-title">{t('payment')}</h5>
                                        <table className="table table-borderless payment-summary">
                                            <tbody>
                                            <tr>
                                                <td>{ t('total') }</td>
                                                <td className="text-end fw-bold">
                                                    { formatWithSpaces(carts?.reduce((acc, cur) => acc + cur.description, 0))} UZS
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        {
                                            authToken ?
                                                <Link to={'/invoice'}
                                                      className="btn bg-theme text-white fw-medium w-100">{t('proceed_to_payment')}</Link>
                                                : <button className="btn bg-theme w-100 text-white fw-medium"
                                                          data-bs-target="#loginModal" data-bs-toggle="modal">
                                                    {t('proceed_to_payment')}
                                                </button>
                                        }


                                    </>
                                    : <>
                                        <h5 className="card-title">{t('empty')}</h5>
                                        <Link to={'/events'}>{t('participate')}</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-4">
                <p className="text-muted">{ t('money_back_guarantee') }</p>
            </div>
        </div>
    )
}

export default Cart
