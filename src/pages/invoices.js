import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import InputMask from "react-input-mask";

const Invoices = () => {
  const { t } = useTranslation();
  const [carts, setCarts] = useState([])
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardDateError, setCardDateError] = useState('');

  useEffect(()=>{
    getCarts()
  }, [])

  const handlePhoneChange = (event) => {
    const {value} = event.target;

    const digitsCount = value.replace(/\s/g, '').length;
    setCardNumberError(digitsCount <= 15 ? 'Invalid card number' : '')
    setCardNumber(maskCreditCard(value));
    
  };

  const maskCreditCard = (value) => {
    let sanitizedInput = value.replace(/\D/g, '');

    if (sanitizedInput.length > 16) {
      sanitizedInput = sanitizedInput.slice(0, 16);
    }

    const parts = sanitizedInput.match(/.{1,4}/g) || [];

    return parts.join(' ');
  };

  const expirationDateInput = (event) => {
    const {value} = event.target;

    const cardDate = value.replace(/\s/g, '').length;
    setCardDateError(cardDate <= 4 ? 'Invalid card date' : '')
    setCardDate(formatExpirationDate(value))
  }

  const formatExpirationDate=(event)=>{
    let sanitizedInput = event.replace(/\D/g, ''); // Remove non-numeric characters

    if (sanitizedInput.length > 4) {
      sanitizedInput = sanitizedInput.slice(0, 4);
    }

    if (sanitizedInput.length >= 2) {
      return sanitizedInput.slice(0, 2) + ' / ' + sanitizedInput.slice(2);
    } else {
      return sanitizedInput;
    }
  }


  const getCarts = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    setCarts(cart)
    console.log(cart);
    
  }

  const submit=(e)=>{
    e.preventDefault() 
    
  }

  return (
    <div>
      <div className="container my-5">
        <div className="invoice-header text-center">
          <h1 className="invoice-title">Invoice</h1>
          <p className="mb-0">Your Company Name</p>
          <p className="mb-0">1234 Main Street, City, Country</p>
          <p>Email: contact@yourcompany.com | Phone: +123 456 7890</p>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Bill To:</h5>
            <p>
                Client Name<br/>
                5678 Client Street<br/>
                City, Country<br/>
                Email: client@example.com
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <h5>Invoice Details:</h5>
            <p>
                Invoice #: 001<br/>
                Date: 2024-11-26<br/>
                Due Date: 2024-12-01
            </p>
          </div>
        </div>

          <table className="table table-bordered invoice-table mt-4">
              <thead className="table-light">
                  <tr>
                      <th>#</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Total</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>1</td>
                      <td>Product/Service Name</td>
                      <td>2</td>
                      <td>$50.00</td>
                      <td>$100.00</td>
                  </tr>
                  <tr>
                      <td>2</td>
                      <td>Another Product/Service</td>
                      <td>1</td>
                      <td>$75.00</td>
                      <td>$75.00</td>
                  </tr>
              </tbody>
          </table>

          <div className="row">
              <div className="col-md-6"></div>
              <div className="col-md-6">
                  <table className="table table-borderless table-summary">
                      <tbody>
                          <tr>
                              <td>Subtotal:</td>
                              <td className="text-end">$175.00</td>
                          </tr>
                          <tr>
                              <td>Tax (10%):</td>
                              <td className="text-end">$17.50</td>
                          </tr>
                          <tr>
                              <td>Total:</td>
                              <td className="text-end">$192.50</td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
          <hr/>
          <div className="payment-form">
            <form onSubmit={submit} className={"needs-validation was-validated"} noValidate>
              <div className="mb-3">
                <label htmlFor="name">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="parent_name"
                  placeholder="**** **** **** ****"
                  value={cardNumber}
                  onInput={handlePhoneChange}
                  required
                />
                {cardNumberError && <p style={{ color: "red" }}>{cardNumberError}</p>}
                <div className="invalid-feedback">
                  Please enter a valid name address for shipping updates.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="cardDate">{t("birth")}</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardDate"
                  placeholder="MM/YY"
                  onChange={expirationDateInput}
                  value={cardDate}
                  required
                />
                {cardDateError && <p style={{ color: "red" }}>{cardDateError}</p>}
                <div className="invalid-feedback">
                  Please enter a valid email address for shipping updates.
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="cardDate">{t("total")}</label>
                <input
                  readOnly
                  type="text"
                  className="form-control"
                  id="cardDate"
                  placeholder="MM/YY"
                  value={'2 650 000'}
                  required
                />
              </div>
                
              <button type="submit" className="btn bg-theme text-white float-end">
                {t("check")}
              </button>
            </form>
          </div>
          <br/>
          <br/>
          <hr/>
          <div className="text-center mt-4">
            <p>Thank you for your business!</p>
            <p>If you have any questions, feel free to contact us at contact@yourcompany.com.</p>
          </div>
      </div>
    </div>
  )
}

export default Invoices
