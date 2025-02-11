import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import InputMask from "react-input-mask";
import useTelegram from "../hooks/useTelegram";
import {initI18n} from "../i18n";
import useCart from "../zustand/cart";
import useInvoice from "../zustand/invoice";

const Invoices = () => {
  const { t } = useTranslation();
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
  const [phone, setPhone] = useState('')
  const [errorPhone, setErrorPhone] = useState("");
  const { tg, user } = useTelegram();
  const carts = useCart(state => state.state.carts)
  const getCarts = useCart(state => state.getCarts)
  const formatWithSpaces = useCart((state) => state.formatWithSpaces)
  const createTransaction = useInvoice((state) => state.createTransaction)
  const paymentStatus = useInvoice((state) => state.state.paymentStatus)
  const message = useInvoice(state => state.state.message)
  const checkInvoice = useInvoice(state => state.checkInvoice)

  useEffect(() => {
    tg.ready()
  }, []);

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

  const handleCartChange = (event) => {
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

  const submit = async(e)=> {
    e.preventDefault()
    setCheckCartForm(true)

    if (cardNumber !== "" && cardDate !== "" && phone !== ""){
      const data = {
        cart_number: cardNumber.toString(),
        expired_date: cardDate.toString(),
        total_sum: carts?.reduce((acc, cur)=>cur.description + acc, 0).toString(),
        phone_number: phone.toString(),
        type: "Marathone uz"
      }

      await getCarts()
      await createTransaction(data)
    }

    if (cardNumberError === "" && cardDateError === "") {
      setShowCode(true)
      setTimer(120)
    }
  }

  const verifyCode = async (e) =>{
    e.preventDefault()

    const verificationCode = code.join("");
    const storedValue = localStorage.getItem('invoice_number')
    const invoiceNumber = storedValue ? JSON.parse(storedValue) : null

    if (verificationCode.length < 6) {
      setError(t("enter_verification_code"));
      return;
    }

    const date = {
      invoice_id: invoiceNumber?.id,
      code: code.toString().replace(/,/g, ''),
      invoices: carts?.map(el=>({invoice_item_id: el.id})),
    }

    console.log(date)

        await checkInvoice(date)

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

  const handlePhoneChange = (event) => {
    const {value} = event.target;
    setPhone(value);
    const isValid = validatePhoneNumber(value);
    setErrorPhone(isValid ? "" : "Invalid phone number");
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\+\d{3} \d{2} \d{3} \d{2} \d{2}$/;
    return phoneRegex.test(value);
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
              <p>{user?.username}</p>
            </div>
          </div>

          <h4 className="mb-3">{t('purchases')}</h4>

          <div className="row">
            <div className="col-12">
              <table className="table table-bordered table-summary">
                <thead>
                <tr>
                  <th>{t('account_information')}</th>
                  <th>{t('cost')}</th>
                </tr>
                </thead>
                <tbody>
                {
                  carts?.map(el => <tr>
                    <td>
                      <p className="text-end m-0 px-1 rounded text-theme">{el?.marathon?.marathon_type?.name}</p>
                      <p className="m-0 text-end fw-medium">{el?.participant?.phone}</p>
                      <p className="m-0 text-end fw-medium">{el?.participant?.name}</p>
                      <p className="m-0 text-end fw-medium">{el?.participant?.email}</p>
                      <p className="m-0 text-end fw-medium">{el?.participant?.address}</p>
                      <p className="m-0 text-end fw-medium m-0 px-1 m-0 px-1 rounded text-theme">{el?.number}</p>
                      <p className="m-0 text-end fw-medium m-0 px-1 m-0 px-1 rounded text-theme">{el?.participant?.uniform?.size}</p>
                    </td>
                    <td>
                      <p className="m-0 text-center">{ formatWithSpaces(el.description) } UZS</p>
                    </td>
                  </tr>)
                }
                <tr>
                  <td>{t('total')}:</td>
                  <td className="text-end">{ formatWithSpaces(carts?.reduce((acc, cur)=>cur.description + acc, 0)) } UZS</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="payment-form">
            <h5 className="text-danger">{message?.title}</h5>

            <form onSubmit={submit} className={checkCartForm ? "needs-validation was-validated border p-2 rounded" : "needs-validation border p-2 rounded"} noValidate>
              <div className="mb-3">
                <label htmlFor="name">{t('card_number')}</label>
                <input
                    type="text"
                    className="form-control"
                    id="parent_name"
                    placeholder="**** **** **** ****"
                    value={cardNumber}
                    onInput={handleCartChange}
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
                    value={formatWithSpaces(carts?.reduce((acc, cur)=>cur.description + acc, 0))}
                    required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="phone">{t("home_number")}</label>
                <InputMask
                    mask="+999 99 999 99 99"
                    placeholder="+000 00 000 00 00"
                    className="form-control"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                >
                  {(inputProps) => (
                      <input
                          {...inputProps}
                          type="text"
                      />
                  )}
                </InputMask>

                {errorPhone && <p style={{color: "red"}}>{errorPhone}</p>}
                <div className="invalid-feedback">
                  {t('phone_is_required')}
                </div>
                <p className="text-theme mt-2"><i className="fa-regular fa-triangle-exclamation"></i> { t('warring') }</p>
              </div>

              <div className='d-flex justify-content-end'>
                <button disabled={showCode} type="submit" className="btn bg-theme text-white">
                  {t("check")}
                </button>
              </div>
            </form>

            {
                paymentStatus && <form onSubmit={verifyCode} className='mt-5 p-3 border'>
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
