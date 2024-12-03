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
  const [checkCartForm, setCheckCartForm] = useState(false)


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
    setCardNumberError(digitsCount <= 15 ? t('invalid_card_number') : '')
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
    setCardDateError(cardDate <= 4 ? t('invalid_card_date') : '')
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
    setCheckCartForm(true)
    if (cardNumberError === "" && cardDateError === "") {
      setShowCode(true)
      setTimer(120)
    }
  }

  const verifyCode = (e) =>{
    e.preventDefault() 

    const verificationCode = code.join("");
    if (verificationCode.length < 6) {
      setError(t("enter_verification_code"));
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
          <h1 className="invoice-title">{t('invoice_info')}</h1>
        </div>

        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-between">
            <h5>{t('bill_to')}</h5>
            <p>Tg user name</p>
          </div>

          <div className="col-12 text-end">
            <h5>{t('invoice_details')}</h5>
            <p>
              {t('invoice_number')} #: 001<br/>
              {t('date')}: 2024-11-26<br/>
            </p>
          </div>
        </div>

        <h4 className="mb-3">{t('purchases')}</h4>
        
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
            <div className="col-12">
                <table className="table table-borderless table-summary">
                    <tbody>
                        <tr>
                            <td>{t('total')}:</td>
                            <td className="text-end">5 000 000 sum</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div className="payment-form">
          <form onSubmit={submit} className={checkCartForm ? "needs-validation was-validated border p-2 rounded" : "needs-validation border p-2 rounded"} noValidate>
            <div className="mb-3">
              <label htmlFor="name">{t('card_number')}</label>
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
              <div className="invalid-feedback"> {t('valid_card_number')} </div>
            </div>

            <div className="mb-3">
              <label htmlFor="cardDate">{t("expiration_date")}</label>
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
              <div className="invalid-feedback"> {t('enter_expiration_date')} </div>
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
                      <button type='button' className="btn btn-warning" onClick={handleReset}>
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
          <p>{t('thank_you')}</p>
          <p>{t('contact_us')}  roadrunning@info.uz</p>
        </div>
      </div>
    </div>
  )
}

export default Invoices
