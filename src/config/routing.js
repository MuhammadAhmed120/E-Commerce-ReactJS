import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home"
import ProductDisplay from "../pages/cloth-display";
import Checkout from "../pages/checkout";
import PlaceOrder from "../pages/place-order";
import UserAccount from "../pages/userAccount";
import ResetPass from "../pages/resetPass";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Routing() {
    const token = localStorage.getItem('token') || false
    const [authorize, setAuthorize] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };
                try {
                    const response = await axios.post('http://localhost:3001/tokenverification', null, {
                        headers
                    });
                    if (response.status === 200 && response.data.message === "AUTHORIZED") {
                        localStorage.setItem('UID', response.data.decodedToken.customer_id)
                        return setAuthorize(true);
                    } else {
                        console.error('Token not authorized:', response.data);
                        return setAuthorize(false);
                    }
                } catch (error) {
                    console.log(error)
                    if (error.code !== "ERR_NETWORK") {
                        console.error('Error:', error.response.data.message);
                        if (error.response.data.message === 'unauthorized token') {
                            localStorage.removeItem('token')
                            localStorage.removeItem('UID')
                            return setAuthorize(false);
                        }
                    } else {
                        console.log('NETWORK ERROR')
                    }
                }
            }
        };

        fetchData();
    }, [token]);


    return (
        <BrowserRouter>
            <Routes>
                {token && authorize ? (
                    <>
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/login" element={<Navigate to="/home" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Register />} />
                    </>
                )}
                <Route path="/home" element={<Home />} />
                <Route path="/home/:category" element={<Home />} />
                <Route path="/home/product/:productId" element={<ProductDisplay />} />
                <Route path="/home/user" element={<UserAccount />} />
                <Route path="/home/checkout" element={<Checkout />} />
                <Route path="/home/checkout/order" element={<PlaceOrder />} />
                <Route path="/reset-password/:token" element={<ResetPass />} />
            </Routes>
        </BrowserRouter>
    )
}