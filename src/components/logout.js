import useAuth from '../zustand/auth'
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const Logout = () => {
    const logout = useAuth(state => state.logout)
    const getToken = useAuth((state) => state.getToken)
    const { t } = useTranslation();

    const handleLogout = async () => {
        await logout()
        await getToken()
    }

    return <div>
        <div  className="dropdown  logout">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa-solid fa-user"></i>
            </button>
            <ul className="dropdown-menu bg-theme-bot" aria-labelledby="dropdownMenuButton1">
                <li className="py-2 border-bottom">
                    <a onClick={handleLogout} className="dropdown-item text-theme-bot" href="#">{t('logout')}</a>
                </li>
                <li className="py-2">
                    <Link className="dropdown-item text-theme-bot" to="/invoice-items">{t('invoices')}</Link>
                </li>
            </ul>
        </div>
    </div>
}

export default Logout