import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home"
import ProductDisplay from "../pages/cloth-display";
import Checkout from "../pages/checkout";
import PlaceOrder from "../pages/place-order";

export default function Routing() {
    const userUID = localStorage.getItem('UID')

    return (
        <BrowserRouter>
            <Routes>
                {userUID ? (
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
                <Route path="/home/checkout" element={<Checkout />} />
                <Route path="/home/checkout/order" element={<PlaceOrder />} />
            </Routes>
        </BrowserRouter>
    )
}