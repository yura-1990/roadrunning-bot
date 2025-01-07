import useAuth from '../zustand/auth'
import {useNavigate} from "react-router-dom";

const Logout = () => {
    const logout = useAuth(state => state.logout)
    const getToken = useAuth((state) => state.getToken)
    const authToken = useAuth((state) => state.state.token)
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        await getToken()
        navigate(-1);
    }

    return <div onClick={handleLogout} className='logout'><i className="bi bi-box-arrow-left"></i></div>
}

export default Logout