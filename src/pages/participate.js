import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Autocomplete from "../components/autocomplete";
import { TimerContext } from "../components/timerContext";
import useCart from "../zustand/cart";

const Participate = () => {
  const { t } = useTranslation();
  const { startTimer } = useContext(TimerContext);
  const { id } = useParams();
  const [ifChild, setIfChaild] = useState(false);
  const [parent, setParent] = useState("");
  const [organization, setOrganization] = useState("");
  const [company, setCompany] = useState("");
  const [number, setNumber] = useState(0);
  const [uniform, setUniform] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [address, setAddress] = useState("");
  const [birth, setBirth] = useState("");
  const addToCart = useCart((state) => state.addToCart)

  const organs = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grape",
    "Mango",
    "Orange",
    "Pineapple",
  ];

  const category = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Grape",
    "Mango",
    "Orange",
    "Pineapple",
  ];

  // submit
  const submit = async (e) => {
    e.preventDefault();
    
    const data = {
      number: number,
      marathon_id: id,
      number_type_id: number,
      participant_name: name,
      participant_email: email,
      participant_phone: phone,
      gender_id: gender,
      participant_region_id: region,
      participant_address: address,
      participant_birth: birth,
      participant_parent_name: parent,
      participant_organization_id: organization,
      participant_category_id: company,
      participant_uniform_id: uniform,
    }

    addToCart(data)
    startTimer()
  };

  return (
    <div className="row">
      <div className="col-12 order-md-1">
        <h4 className="mb-3">{t("personal_info")}</h4>
        <form onSubmit={submit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Habib Muslomov"
              onInput={(e)=>setName(e.target.value)}
            />
            <div className="invalid-feedback">
              Please enter a valid name address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">{t("email")}</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="example@gmail.com"
              onInput={(e)=>setEmail(e.target.value)}
            />
            <div className="invalid-feedback ">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="phone">{t("home_number")}</label>
            <input
              type="text"
              className="form-control"
              id="phone"
              placeholder="+998 (00) 000-00-00"
              onInput={(e)=>setPhone(e.target.value)}
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <span htmlFor="name">{t("gender")}</span>
            <div className="d-flex justify-content-between">
              <div className="custom-control custom-radio flex-grow-1">
                <input
                  id="man"
                  name="gender"
                  type="radio"
                  className="custom-control-input me-2"
                  onChange={(e)=>setGender('man')}
                />
                <label className="custom-control-label" htmlFor="man">
                  Man
                </label>
              </div>
              <div className="custom-control custom-radio flex-grow-1">
                <input
                  id="woman"
                  name="gender"
                  type="radio"
                  className="custom-control-input me-2"
                  onChange={(e)=>setGender('woman')}
                />
                <label className="custom-control-label" htmlFor="woman">
                  Woman
                </label>
              </div>
            </div>
          </div>

          <div className="col-12  pb-3">
            <label htmlFor="regions">{t("regions")}</label>
            <select  onChange={(e)=>setRegion(e.target.value)} className="form-control custom-select" id="regions">
              <option className="text-white bg-warning">Choose a region</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="address">{t("address")}</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder={t("address1")}
              onInput={(e)=>setAddress(e.target.value)}
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="birth">{t("birth")}</label>
            <input
              type="date"
              className="form-control"
              id="birth"
              placeholder="DD-MM-YYYY"
              onInput={(e)=>setBirth(e.target.value)}
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                onChange={() => setIfChaild(!ifChild)}
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
                  onInput={(e)=>setParent(e.target.value)}
                />
                <div className="invalid-feedback">
                  Please enter a valid name address for shipping updates.
                </div>
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="birth">{t("organization")}</label>
            <Autocomplete suggestions={organs} getValue={setOrganization} />
          </div>

          <div className="mb-3">
            <label htmlFor="birth">{t("category")}</label>
            <Autocomplete suggestions={category} getValue={setCompany} />
          </div>

          <div className="mb-3">
            <label htmlFor="name">{t("choose_uniform_size")}</label>

            <div className="row">
              <div
                onClick={() => setUniform("LG")}
                className={
                  uniform === "LG"
                    ? "mx-2 custom-control fw-bold bg-theme p-2 col border border-theme d-flex justify-content-center align-items-center text-white custom-radio rounded"
                    : "mx-2 custom-control fw-bold text-black p-2 col border border-theme d-flex justify-content-center align-items-center custom-radio rounded"
                }
              >
                <span className="text-theme-bot">LG</span>
              </div>
              <div
                onClick={() => setUniform("SM")}
                className={
                  uniform === "SM"
                    ? "mx-2 custom-control fw-bold bg-theme p-2 col border border-theme d-flex justify-content-center align-items-center text-white custom-radio rounded"
                    : "mx-2 custom-control fw-bold text-black p-2 col border border-theme d-flex justify-content-center align-items-center custom-radio rounded"
                }
              >
                <span className="text-theme-bot">SM</span>
              </div>
              <div
                onClick={() => setUniform("XXL")}
                className={
                  uniform === "XXL"
                    ? "mx-2 custom-control fw-bold bg-theme p-2 col border border-theme d-flex justify-content-center align-items-center text-white custom-radio rounded"
                    : "mx-2 custom-control fw-bold text-black p-2 col border border-theme d-flex justify-content-center align-items-center custom-radio rounded"
                }
              >
                <span className="text-theme-bot">XXL</span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="name">{t("number")}</label>

            <div className="border rounded-3 border-theme p-3 my-2">
              <div className="d-flex justify-content-between flex-wrap">
                <span className="fw-bold">{t("Simple")}</span>
                <span className="border px-2 rounded border-theme fw-bold">
                  + 0
                </span>
              </div>

              <div className="row justify-content-center">
                <div
                  onClick={() => setNumber(0)}
                  className={
                    number === 0
                      ? "m-2 custom-control fw-bold bg-theme p-2  col border border-theme d-flex justify-content-center align-items-center text-white custom-radio rounded"
                      : "m-2 custom-control fw-bold text-black p-2  col border border-theme d-flex justify-content-center align-items-center custom-radio rounded"
                  }
                >
                  <span className="text-theme-bot">0</span>
                </div>
              </div>
            </div>

            <div className="border rounded-3 border-theme p-3 my-2">
              <div className="d-flex justify-content-between flex-wrap">
                <span className="fw-bold">{t("Elite")}</span>
                <span className="border px-2 rounded border-theme fw-bold">
                  + 2 500 000
                </span>
              </div>

              <div className="row justify-content-center">
                <div
                  onClick={() => setNumber(1)}
                  className={
                    number === 1
                     ? "m-2 custom-control fw-bold bg-theme p-2  col border border-theme d-flex justify-content-center align-items-center text-white custom-radio rounded"
                      : "m-2 custom-control fw-bold text-black p-2  col border border-theme d-flex justify-content-center align-items-center custom-radio rounded"
                  }
                >
                  <span className="text-theme-bot">0</span>
                </div>
                <div
                  onClick={() => setNumber(2)}
                  className={
                    number === 2
                      ? "m-2 custom-control fw-bold bg-theme p-2  col border border-theme d-flex justify-content-center align-items-center text-white custom-radio rounded"
                      : "m-2 custom-control fw-bold text-black p-2  col border border-theme d-flex justify-content-center align-items-center custom-radio rounded"
                  }
                >
                  <span className="text-theme-bot">0</span>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="btn bg-theme text-white float-end">
            + {t("add_to_cart")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Participate;
