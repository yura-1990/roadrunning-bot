import useAuth from '../zustand/auth'

const Logout = () => {
    const getMe = useAuth(state => state.getMe)

    const handleLogout = async () => {
         await getMe()
    }

    return <div onClick={handleLogout} className='logout'><i className="bi bi-box-arrow-left"></i></div>
}

export default Logout