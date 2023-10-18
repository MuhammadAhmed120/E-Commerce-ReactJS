import { useEffect, useState } from 'react';
import CartContext from './config/cartContext.js';
import { QuanProvider } from './config/quanContext.js';
import Routing from './config/routing.js';

export default function App() {
    const [cartNum, setCartNum] = useState(0)

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        setCartNum(cart.length)
    }, [])

    return (
        <CartContext.Provider value={{ cartNum, setCartNum }}>
            <QuanProvider>
                <Routing />
            </QuanProvider>
        </CartContext.Provider>
    )
}