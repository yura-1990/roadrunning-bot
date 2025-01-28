import {useNavigate} from "react-router-dom";
import useCart from "../zustand/cart";
import {useEffect} from "react";

const GoBack = () => {
    const navigate = useNavigate()
    const getCarts = useCart(state=>state.getCarts)
    const carts = useCart(state=>state.state.carts)

    useEffect(() => {
        getCarts()
    }, []);

    return <>
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">{carts.length > 0 ? 'No authenticated' : 'No invoices'}</h4>
            </div>
            <div className="card-body">
                <div className="btn w-100 bg-theme text-white " onClick={() => navigate(-1)}>
                    <i className="fa-light me-2 fa-arrow-left"></i> Back
                </div>
            </div>
        </div>

    </>
}

export default GoBack