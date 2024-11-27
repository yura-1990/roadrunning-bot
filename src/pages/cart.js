import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import useCart from '../zustand/cart';
import { Link } from 'react-router-dom';
import { TimerContext } from "../components/timerContext";


const Cart = () => {
  const { t } = useTranslation();
  const carts = useCart((state) => state.state.carts)
  const deleteCart = useCart((state) => state.deleteCart)
  const {stopTimer} = useContext(TimerContext)

  const destroyCart=(index)=>{
    if (window.confirm(t('are_you_sure_you_want_to_delete'))) {
      const allCarts = carts.filter((_,i)=>i!==index)
      deleteCart(allCarts)
      console.log(allCarts);
      
      if (allCarts.length === 0) {
        stopTimer()
      }
      
    }
  }

  return (
    <div>
      <div className="cart-header text-center">
        <h1 className="cart-title">{ carts?.length > 0 ? t('cart_details') : t('no_purchases_in_cart') }</h1>
      </div>

      <div className="row mt-4">
          <div className="col-md-8">
              <div className="list-group">
                {carts && carts.map((el, i) => <div key={i} className="list-group-item cart-item pb-5 shadow rounded-2 overflow-hidden mb-2">
                    <div onClick={()=>destroyCart(i)} className='position-absolute delete-cart border px-2 rounded bg-theme-bot text-theme-bot'><i className="bi bi-trash3"></i></div>

                    <div className='d-flex justify-content-between'>
                      <p className="cart-item-title mb-1">Marathon 1</p>
                      <p className="cart-item-title mb-1 fw-bold">2 500 000 sum</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <p className="cart-item-title mb-1">
                        <span className='fw-bold text-theme'><span className='border px-2 text-white rounded bg-theme'>Platinum</span> 22222</span> 
                      </p>
                      <p className="cart-item-title mb-1 fw-bold">1 520 000 sum</p>
                    </div>
                    <div className='d-flex justify-content-between'>
                      <p className="cart-item-title mb-1">{ t('uniform') }</p>
                      <p className="cart-item-title mb-1 fw-bold">LG</p>
                    </div>
                    <br/>
                    <div className='d-flex justify-content-between'>
                      <p className="cart-item-title mb-1">{ t('total') }</p>
                      <p className="cart-item-title mb-1 fw-bold">{250000 + 1520000} sum</p>
                    </div>
                </div>)
                }
                  
                  
              </div>
          </div>

          <div className="col-md-4 mt-md-0 mt-4">
              <div className="card">
                  <div className="card-body">
                    {
                      carts?.length > 0 ? <>
                        <h5 className="card-title">{t('payment')}</h5>
                        <table className="table table-borderless payment-summary">
                          <tbody>
                            <tr>
                              <td>{ t('total') }</td>
                              <td className="text-end fw-bold">$125.00</td>
                            </tr>
                          </tbody>
                        </table>
                        <Link to={'/roadrunning-bot/invoice'} className="btn bg-theme text-white fw-medium w-100">{t('proceed_to_payment')}</Link>
                      </>
                      : <>
                        <h5 className="card-title">{t('empty')}</h5>
                        <Link to={'/roadrunning-bot/events'}>{t('participate')}</Link>
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
