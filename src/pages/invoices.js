import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';

const Invoices = () => {
  const { t } = useTranslation();
  const [carts, setCarts] = useState([])
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardDateError, setCardDateError] = useState('');
  const [code, setCode] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120);
  const [isExpired, setIsExpired] = useState(false);
  const [showCode, setShowCode] = useState(false)

  useEffect(()=>{
    getCarts()

    const startTime = localStorage.getItem("verificationStartTime");

    if (startTime) {
      const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
      const remaining = Math.max(120 - elapsed, 0);
      setTimer(remaining);
      setIsExpired(remaining <= 0);
    } else {
      localStorage.setItem("verificationStartTime", Date.now().toString());
    }
  }, [])

   useEffect(() => {

    console.log(timer);
    
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval); 
    } else {
      setIsExpired(true);
    }

  }, [timer]);

  useEffect(() => {
    if (code) {
      localStorage.setItem("verificationCode", code);
    }
  }, [code]);

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

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d?$/.test(value)) return;

    const updatedCode = [...code];
    updatedCode[index] = value;
    setCode(updatedCode);

    if (value && index < code.length - 1) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-input-${index - 1}`).focus();
    }
  };

  const getCarts = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))

    setCarts(cart)
    console.log(cart);
    
  }

  const submit=(e)=>{
    e.preventDefault() 

    setShowCode(true)
    setTimer(120)
  }

  const verifyCode = (e) =>{
    e.preventDefault() 

    const verificationCode = code.join("");
    if (verificationCode.length < 6) {
      setError("Please enter the complete verification code.");
      return;
    }

    setError("");
  }

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const handleReset = () => {
    setCode(Array(6).fill(""));
    setTimer(120);
    setIsExpired(false);
    localStorage.setItem("verificationStartTime", Date.now().toString());
    localStorage.removeItem("verificationCode");
  };

  return (
    <div>
      <div className="container my-2">
        <div className="text-center p-2 border-bottom border-secondary">
          <h1 className="invoice-title">Invoice</h1>
        </div>

        <div className="row mt-4">
          <div className="col d-flex justify-content-between">
            <h5>Bill To:</h5>
            <p>Tg user name</p>
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

        <h4 className="mb-3">Purchases</h4>
        
        <div className="shadow p-2 rounded">
          <div className='d-flex justify-content-between border-bottom border-theme'>
            <p className="mb-1 fw-medium">
              Marathon name 
              <br />
              <span className='border px-1 rounded bg-theme text-white'>Marathon type</span>
            </p>
            <small className="text-success fw-medium">2 500 000 sum</small>
          </div>
          <div className='d-flex justify-content-between border-bottom'>
            <p className="mb-1 fw-medium">
              Number name 
              <br />
              <span className='border px-1 rounded bg-theme text-white'>Number type</span>
            </p>
            <small className="text-success fw-medium">2 500 000 sum</small>
          </div>
        </div>

        <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6">
                <table className="table table-borderless table-summary">
                    <tbody>
                        <tr>
                            <td>Total:</td>
                            <td className="text-end">5 000 000 sum</td>
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
            <div className='d-flex justify-content-end'>
              <button disabled={showCode} type="submit" className="btn bg-theme text-white">
                {t("check")}
              </button>
            </div>
          </form>

          {
            showCode && <form onSubmit={verifyCode} className='mt-5 p-3 border'>
              <div className="my-3">
                <p className='text-center'>{t("verification_code_submitted")}</p>
                <div className='d-flex justify-content-center'>
                  {
                    code.map((digit, index)=> <input
                      type="text"
                      key={index}
                      className="otp-input"
                      id={`code-input-${index}`}
                      value={digit}
                      maxLength="1"
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />)
                  }
                </div>
                <div className="text-center mt-2">
                  <span className="badge bg-theme p-2">
                    Time Remaining: {formatTime()}
                  </span>
                </div>
                {error && <p className="text-danger">{error}</p>}
                
              </div>
              {
                isExpired 
                  ? <div className="text-center">
                      <h5 className="text-danger mb-3">Time's Up!</h5>
                      <button className="btn btn-warning" onClick={handleReset}>
                        Reset
                      </button>
                    </div>
                  : <div className='d-flex justify-content-end'>
                      <button type="submit" className="btn bg-theme text-white">
                        {t("pay")}
                      </button>
                    </div>

              }
            </form>
          }
          

        </div>
        <div className="text-center mt-4">
          <p>Thank you for your business!</p>
          <p>If you have any questions, feel free to contact us at contact@yourcompany.com.</p>
        </div>
      </div>
    </div>
  )
}

export default Invoices
