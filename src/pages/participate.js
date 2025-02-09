import React, {useState, useContext, useEffect} from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Autocomplete from "../components/autocomplete";
import { TimerContext } from "../components/timerContext";
import useCart from "../zustand/cart";
import InputMask from "react-input-mask";
import useMarathon from "../zustand/marathons";
import useNumber from "../zustand/numbers";

const Participate = () => {
  const { t, i18n } = useTranslation();
  const getSingleMarathon = useMarathon(state=>state.getSingleMarathon)
  const singleMarathon = useMarathon(state=>state.state.singleMarathon)
  const addToCart = useCart((state) => state.addToCart)
  const createNumberStatus = useNumber(state => state.createNumberStatus)
  const loading = useNumber(state => state.state.loading)
  const error = useNumber(state => state.state.error)

  const { startTimer } = useContext(TimerContext);
  const { id } = useParams();

  const [ifChild, setIfChild] = useState(false);
  const [parent, setParent] = useState("");
  const [organization, setOrganization] = useState("");
  const [company, setCompany] = useState("");
  const [number, setNumber] = useState(0);
  const [numberType, setNumberType] = useState(0);
  const [uniform, setUniform] = useState('');
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [gender, setGender] = useState('');
  const [region, setRegion] = useState('');
  const [address, setAddress] = useState("");
  const [birth, setBirth] = useState("");
  const [checkForm, setCheckForm] = useState(false)
  const [check, setCheck] = useState(false)

  useEffect(() => {
     getSingleMarathon(i18n.language, id)
  }, [i18n.language])

  // submit
  const submit = async (e) => {
    e.preventDefault();
    setCheckForm(true)

    if ( name !== "" && errorPhone === "" && errorEmail === "" && gender && region && address !== "" && birth !== "" ) {
      const data = {
        number: number,
        marathon_id: Number(id),
        number_type_id: numberType.id,
        participant_name: name,
        participant_last_name: lastName,
        participant_email: email,
        participant_phone: phone,
        gender_id: gender.id,
        participant_region_id: region,
        participant_address: address,
        participant_birth: birth,
        participant_parent_name: ifChild ? parent : "",
        participant_organization_id: organization.toString(),
        participant_category_id: company.toString(),
        participant_uniform_id: uniform.id,
      };

      if (!ifChild || parent !== "") {
        await createNumberStatus(data)

        if (!loading && !error){
          await getSingleMarathon(i18n.language, id)
          startTimer();
          setIfChild(false)
          setParent("")
          setOrganization("")
          setCompany("")
          setNumber(0)
          setUniform("")
          setName("")
          setLastName("")
          setEmail("")
          setErrorEmail("")
          setPhone("")
          setErrorPhone("")
          setGender("")
          setRegion("")
          setAddress("")
          setBirth("")
          setCheckForm(false)
          setCheck(!check)
        }

      }
    }
    
  };

  const handlePhoneChange = (event) => {
    const {value} = event.target;
    setPhone(value);
    const isValid = validatePhoneNumber(value);
    setErrorPhone(isValid ? "" : "Invalid phone number");
  };

  const validatePhoneNumber = (value) => {
    const phoneRegex = /^\+\d{3} \(\d{2}\) \d{3} \d{2} \d{2}$/;
    return phoneRegex.test(value);
  };

  const handleEmailChange = (event) => {
    const {value} = event.target;
    setEmail(value);
    const isValid = validateEmail(value);
    setErrorEmail(isValid ? "" : "Invalid email address");
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const getNumber = (num, numTypeId) => {
    setNumber(num)
    setNumberType(numTypeId)
  }

  return (
    <div className="row">
      <div className="col-12 order-md-1">
        <h4 className="mb-3">{t("personal_info")}</h4>
        <form onSubmit={submit} className={checkForm ? "needs-validation was-validated" : 'needs-validation'} noValidate>
          <div className="mb-3">
            <label htmlFor="name">{t('name')}</label>
            <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Habib Muslomov"
                value={name}
                onInput={(e) => setName(e.target.value)}
                required
            />

            <div className="invalid-feedback">
              {t('name_is_required')}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="last_name">{t('last_name')}</label>
            <input
                type="text"
                className="form-control"
                id="last_name"
                placeholder="Muslomov"
                value={lastName}
                onInput={(e) => setLastName(e.target.value)}
                required
            />

            <div className="invalid-feedback">
              {t('last_name_required')}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">{t("email")}</label>
            <input
                type="email"
                className="form-control"
                id="email"
                placeholder="example@gmail.com"
                onChange={handleEmailChange}
                required
                value={email}
            />
            {errorEmail && <p style={{color: "red"}}>{errorEmail}</p>}
            <div className="invalid-feedback ">
              {t('email_is_required')}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="phone">{t("home_number")}</label>
            <InputMask
                mask="+999 (99) 999 99 99"
                placeholder="+000 (00) 000 00 00"
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
          </div>

          <div className="mb-3">
            <span>{t("gender")}</span>
            <div className="d-flex justify-content-between">
              {
                singleMarathon?.genders?.map(item => <div>
                  <div key={item.id} className="custom-control custom-radio flex-grow-1">
                    <input
                        id={item.id}
                        name="gender"
                        type="radio"
                        value={gender}
                        checked={gender.id === item.id}
                        className="custom-control-input me-2"
                        onChange={() => setGender(item)}
                        required
                    />
                    <label className="custom-control-label" htmlFor={item.id}>
                      {item.type}
                    </label>
                  </div>
                </div>)
              }

            </div>
          </div>

          <div className="col-12  pb-3">
            <label htmlFor="regions">{t("country")}</label>
            <select onChange={(e) => setRegion(e.target.value)}
                    className="form-control custom-select" id="regions" required
            >
              <option hidden  className="text-white bg-warning">{ t('choose_a_region') }</option>
              {
                singleMarathon?.regions?.map(item => <option key={item.id} value={item.id}>{item.name}</option>)
              }
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="address">{t("address")}</label>
            <input
                type="text"
                className="form-control"
                id="address"
                placeholder={t("address1")}
                onInput={(e) => setAddress(e.target.value)}
                required
                value={address}
            />
            <div className="invalid-feedback">
              {t('address_is_required')}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="birth">{t("birth")}</label>
            <input
                type="date"
                className="form-control"
                id="birth"
                placeholder="DD-MM-YYYY"
                onInput={(e) => setBirth(e.target.value)}
                required
                value={birth}
            />
            <div className="invalid-feedback">
              {t('birth_is_required')}
            </div>
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                  className="form-check-input"
                  onChange={() => setIfChild(!ifChild)}
                  checked={ifChild}
                  type="checkbox"
                  id="if-child"
              />
              <label className="form-check-label" htmlFor="if-child">
                {t("if_child")}
              </label>
            </div>
            {ifChild && (
                <div className="mb-3">
                  <input
                      type="text"
                      className="form-control"
                      id="parent_name"
                      placeholder="Muslim"
                      onInput={(e) => setParent(e.target.value)}
                      required={ifChild}
                      value={parent}
                  />
                  <div className="invalid-feedback">
                    {t('parent_name_is_required')}
                  </div>
                </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="birth">{t("organization")}</label>
            <Autocomplete suggestions={singleMarathon?.organizations} getValue={setOrganization} value={check} />
          </div>

          <div className="mb-3">
            <label htmlFor="birth">{t("category")}</label>
            <Autocomplete suggestions={singleMarathon?.participantCategories} getValue={setCompany} value={check} />
          </div>

          <div className="mb-3">
            <h4>{t("choose_uniform_size")}</h4>

            <div className="row">
              {
                singleMarathon?.uniforms?.map(item => <div
                    onClick={() => setUniform(item)}
                    className={
                      uniform.id === item.id
                          ? "custom-control fw-bold bg-theme py-2 col-sm-4 col-lg-3 col-6 gap-3 text-white custom-radio rounded "
                          : "custom-control fw-bold text-black py-2 col-sm-4 col-lg-3 col-6 gap-3 custom-radio rounded"
                    }
                >
                  <div className="border border-theme w-100 h-100 d-flex justify-content-center align-items-center rounded">
                    {/*<span className="text-theme-bot">{item.type}</span> */}
                    <span className="text-theme-bot">{item.size}</span>
                  </div>

                </div>)
              }
            </div>
          </div>
          <h4>{t("number")}</h4>
          <div className="mb-3 border border-theme rounded p-3">
            {
              singleMarathon?.marathon?.number_types.map(numberType => <div className="my-2">
                <div className="d-flex justify-content-between flex-wrap py-2 border-bottom border-theme mb-2" >
                  <span className="fw-bold">{numberType?.type}</span>
                  <span className="border px-2 rounded border-theme fw-bold">+ {numberType?.pivot?.price ? numberType?.pivot?.price + ' UZS' : '0 UZS'}</span>
                </div>

                <div className="row">
                  {
                    numberType?.options?.filter(num => num === 0 || num >= singleMarathon?.marathon?.marathon_type?.number_order_from && num < singleMarathon?.marathon?.marathon_type?.number_order_to)?.map(num =>
                        !singleMarathon?.marathon?.number_status?.find((it) => it?.number == num) ? <div
                            onClick={() => getNumber(num, numberType)}
                            className={
                              number === num
                                  ? "custom-control fw-bold bg-theme p-2 col-md-4 col-lg-3 col-6 text-white custom-radio rounded"
                                  : "custom-control fw-bold text-black p-2 col-md-4 col-lg-3 col-6 custom-radio rounded"
                            }
                        >
                          <div className="border border-theme d-flex justify-content-center align-items-center rounded">
                            <span className="text-theme-bot">{num}</span>
                          </div>
                        </div> : '')
                  }
                </div>
              </div>)
            }

          </div>
          <button disabled={loading} type="submit" className="btn bg-theme text-white float-end ">
            {
                loading && <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            }
            + {t("add_to_cart")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Participate;
