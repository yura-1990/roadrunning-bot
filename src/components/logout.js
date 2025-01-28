import useAuth from '../zustand/auth'
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const logout = useAuth(state => state.logout)
    const getToken = useAuth((state) => state.getToken)

    const handleLogout = async () => {
        await logout()
        await getToken()
    }

    return <div onClick={handleLogout} className='logout'><i className="bi bi-box-arrow-left"></i></div>
}

export default Logout