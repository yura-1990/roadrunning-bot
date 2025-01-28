import {useEffect, useRef, useState} from "react";
import useAuth from '../zustand/auth'
import {useNavigate} from "react-router-dom";

const Modal = () => {
    const [login, setLogin] = useState({ email: '', password: ''})
    const [register, setRegister] = useState({name: '', email: '', password: '', passwordRepeat: ''})
    const [changeEmail, setChangeEmail] = useState('')
    const [changePassword, setChangePassword] = useState({ password: '', passwordRepeat: ''})
    const [passwordVisibility, setPasswordVisibility] = useState(false)
    const [passwordVisibilityRepeat, setPasswordVisibilityRepeat] = useState(false)
    const [method, setMethod] = useState('login')
    const passwordChange = useRef(null);
    const closeLogin = useRef(null);
    const closeRegister = useRef(null);
    const getToken = useAuth((state) => state.getToken)
    const navigate = useNavigate()
    const [openPassword, setOpenPassword] = useState(false)

    const authenticate = useAuth(state => state.login)
    const modifyPassword = useAuth(state => state.changePassword)
    const setNewPassword = useAuth(state => state.setNewPassword)
    const registerUser = useAuth(state => state.register)
    const loading = useAuth(state => state.state.loading)
    const message = useAuth(state => state.state.message)
    const password = useAuth(state => state.state.changePassword)

    useEffect(()=>{
        if (password) {
            setOpenPassword(password)
        }
    }, [password])

    const submit = async (e) => {
        e.preventDefault()

        if (method === 'login'){
            await authenticate(login)

            closeLogin.current.click()

            setTimeout(() => {
                navigate('/invoice')
            }, 200)

        } else if (method === 'register'){
            await registerUser({
                name: register.name,
                email: register.email,
                password: register.password,
                password_confirmation: register.passwordRepeat
            })

            closeRegister.current.click()

            setTimeout(() => {
                navigate('/invoice')
            }, 200)

        } else {
            if (changePassword.password !== "" && changePassword.passwordRepeat !== "" && changeEmail !== ""){
                await setNewPassword({
                    password: changePassword.password,
                    password_confirmation: changePassword.passwordRepeat,
                    email: changeEmail
                })

                passwordChange.current.click()
            } else {
                await modifyPassword({email: changeEmail})
            }
        }

        await getToken()
    }

    const handleEmail = (e) => {
        setLogin({...login, email: e.target.value})
    }

    const handlePassword = (e) => {
        setLogin({...login, password: e.target.value})
    }

    const handleRegisterEmail = (e) => {
        setRegister({...register, email: e.target.value})
    }

    const handleRegisterName = (e) => {
        setRegister({...register, name: e.target.value})
    }

    const handleRegisterPassword = (e) => {
        setRegister({...register, password: e.target.value})
    }

    const handleRegisterPasswordRepeat = (e) => {
        setRegister({...register, passwordRepeat: e.target.value})
    }

    const handleChangeEmail = (e) => {
        setChangeEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setChangePassword({...changePassword, password: e.target.value})
    }

    const handleChangePasswordRepeat = (e) => {
        setChangePassword({...changePassword, passwordRepeat: e.target.value})
    }

    return <>
        <div className="modal fade " id="loginModal" aria-hidden="true" aria-labelledby="loginModalClose" tabIndex="-1">
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content bg-theme-bot">
                    <div className="modal-header">
                        <h1 className="modal-title text-theme fs-5" id="loginModalClose">{message ? message : 'Login'}</h1>
                        <button type="button" className="btn-close" ref={closeLogin} data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={submit} id="login" className={'needs-validation'} noValidate>
                            <div className="form-floating mb-3">
                                <input type="email" onInput={handleEmail} className="form-control" id="floatingLogin" placeholder="name@example.com" required
                                    value={login.email}
                                />
                                <label className="text-theme" htmlFor="floatingLogin">Email address</label>
                            </div>
                            <div className="valid-feedback"> Looks good! </div>

                            <div className="form-floating">
                                <input onInput={handlePassword} type={passwordVisibility ? "text" : "password"} className="form-control" id="floatingPassword"
                                       placeholder="Password" required
                                       value={login.password}
                                />
                                <label className="text-theme" htmlFor="floatingPassword">Password</label>

                                <div className="password-visibility" onClick={() => setPasswordVisibility(!passwordVisibility)}>
                                    {
                                        passwordVisibility ? <i className="fa-regular h4 text-theme fa-eye"></i> : <i className="fa-regular h4 text-theme fa-eye-slash"></i>
                                    }
                                </div>
                            </div>

                            <div className="valid-feedback"> Looks good! </div>
                        </form>

                        <button type="button" className="border-0 mt-2 bg-transparent text-theme fw-medium" data-bs-target="#passwordForgetModal" data-bs-toggle="modal">
                            <i className="fa-regular fa-circle-exclamation me-2"></i>
                            Forgot password
                        </button>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button type="button" className="border-0 bg-transparent text-theme fw-medium" data-bs-target="#registerModal" data-bs-toggle="modal">
                            <i className="fa-light me-2 fa-arrow-left"></i>
                            Register
                        </button>
                        <button onClick={() => setMethod('login')} type="submit" form="login" className="btn bg-theme text-white" >
                            {
                                loading && <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="passwordForgetModal" aria-hidden="true" aria-labelledby="#passwordForgetModalClose" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-theme-bot">
                <div className="modal-header">
                    <h1 className="modal-title text-theme fs-5" id="passwordForgetModalClose">{message ? message : 'Send email'}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form onSubmit={submit} id="change" className={'needs-validation'} noValidate>
                        <div className="form-floating mb-3">
                            <input readOnly={password} onInput={handleChangeEmail} type="changeEmail" className="form-control" id="floatingChangeEmail"
                                   placeholder="name@example.com"
                                   required
                                   value={changeEmail}
                            />
                            <label className="text-theme" htmlFor="floatingChangeEmail">Email address</label>
                        </div>
                        {
                            openPassword && <div>
                                <div className="form-floating mb-3">
                                    <input onInput={handleChangePassword} type={passwordVisibility ? "text" : "password"}
                                           className="form-control"
                                           id="floatingSetPassword"
                                           placeholder="Password"
                                           required
                                           value={changePassword.password}
                                    />
                                    <label className="text-theme" htmlFor="floatingSetPassword">Password</label>
                                    <div className="password-visibility"
                                         onClick={() => setPasswordVisibility(!passwordVisibility)}>
                                        {
                                            passwordVisibility ? <i className="fa-regular h4 text-theme fa-eye"></i> :
                                                <i className="fa-regular h4 text-theme fa-eye-slash"></i>
                                        }
                                    </div>
                                </div>
                                <div className="form-floating">
                                    <input onInput={handleChangePasswordRepeat}
                                           type={passwordVisibilityRepeat ? "text" : "password"} className="form-control"
                                           id="floatingPasswordReapeat"
                                           placeholder="Repeat Password"
                                           required
                                           value={changePassword.passwordRepeat}
                                    />
                                    <label className="text-theme" htmlFor="floatingPasswordReapeat">Repeat Password</label>
                                    <div className="password-visibility"
                                         onClick={() => setPasswordVisibilityRepeat(!passwordVisibilityRepeat)}>
                                        {
                                            passwordVisibilityRepeat ? <i className="fa-regular h4 text-theme fa-eye"></i> :
                                                <i className="fa-regular h4 text-theme fa-eye-slash"></i>
                                        }
                                    </div>
                                </div>
                            </div>
                        }
                    </form>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                    <button type="button" className="border-0 mt-2 bg-transparent text-theme fw-medium"
                            ref={passwordChange}
                            data-bs-target="#loginModal" data-bs-toggle="modal">
                        <i className="fa-light me-2 fa-arrow-left"></i>
                        Login
                    </button>
                    <button onClick={() => setMethod('change')} type="submit" form="change" className="btn bg-theme text-white">Change</button>
                </div>
            </div>
            </div>
        </div>
        <div className="modal fade" id="registerModal" aria-hidden="true" aria-labelledby="#registerModalClose" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-theme-bot">
                    <div className="modal-header">
                        <h1 className="modal-title text-theme fs-5" id="registerModalClose">{message ? message : 'Register'}</h1>
                        <button type="button" className="btn-close" ref={closeRegister} data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="register" onSubmit={submit} className={'needs-validation'} noValidate>
                            <div className="form-floating mb-3">
                                <input type="email" onInput={handleRegisterName} className="form-control"
                                       id="floatingRegisterName"
                                       placeholder="Habib" required
                                       value={register.name}
                                />
                                <label className="text-theme" htmlFor="floatingRegisterName">Name</label>
                            </div>
                            <div className="valid-feedback"> Looks good!</div>
                            <div className="form-floating mb-3">
                                <input type="email" onInput={handleRegisterEmail} className="form-control"
                                       id="floatingRegisterEmail"
                                       placeholder="name@example.com" required
                                       value={register.email}
                                />
                                <label className="text-theme" htmlFor="floatingRegisterEmail">Email address</label>
                            </div>
                            <div className="valid-feedback"> Looks good!</div>

                            <div className="form-floating mb-3">
                                <input onInput={handleRegisterPassword} type={passwordVisibility ? "text" : "password"}
                                       className="form-control"
                                       id="floatingRegisterPassword" placeholder="Password" required
                                       value={register.password}
                                />
                                <label className="text-theme" htmlFor="floatingRegisterPassword">Password</label>
                                <div className="password-visibility"
                                     onClick={() => setPasswordVisibility(!passwordVisibility)}>
                                    {
                                        passwordVisibility ? <i className="fa-regular h4 text-theme fa-eye"></i> :
                                            <i className="fa-regular h4 text-theme fa-eye-slash"></i>
                                    }
                                </div>
                            </div>

                            <div className="valid-feedback"> Looks good!</div>

                            <div className="form-floating">
                                <input onInput={handleRegisterPasswordRepeat}
                                       type={passwordVisibilityRepeat ? "text" : "password"}
                                       className="form-control" id="floatingRegisterPasswordRepeat"
                                       placeholder="Repeat Password" required
                                       value={register.passwordRepeat}
                                />
                                <label className="text-theme" htmlFor="floatingRegisterPasswordRepeat">Repeat Password</label>
                                <div className="password-visibility"
                                     onClick={() => setPasswordVisibilityRepeat(!passwordVisibilityRepeat)}>
                                    {
                                        passwordVisibilityRepeat ? <i className="fa-regular h4 text-theme fa-eye"></i> :
                                            <i className="fa-regular h4 text-theme fa-eye-slash"></i>
                                    }
                                </div>
                            </div>

                            <div className="valid-feedback"> Looks good!</div>
                        </form>
                    </div>
                    <div className="modal-footer d-flex justify-content-between">
                        <button className="border-0 bg-transparent text-theme" data-bs-target="#loginModal"
                                data-bs-toggle="modal">
                            <i className="fa-light me-2 fa-arrow-left"></i>
                            Login
                        </button>
                        <button type="submit" form="register" onClick={() => setMethod('register')}
                                className="btn bg-theme text-white">Change
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Modal