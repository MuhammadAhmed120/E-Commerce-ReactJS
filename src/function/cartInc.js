import { notification } from "antd";

export default function cartInc(event, item, setCartNum, setQuanNum, itemQuan) {
    event.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let dupItem = cart.findIndex(cartItem => cartItem.item.clothID === item.clothID);

    if (dupItem !== -1) {
        if (itemQuan) {
            cart[dupItem].qty += itemQuan;
        } else {
            cart[dupItem].qty += 1;
        }
    } else {
        if (itemQuan) {
            cart.push({ item, qty: itemQuan });
        } else {
            cart.push({ item, qty: 1 });
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartNum(cart.length);

    const totalQuantity = cart.reduce((total, cartItem) => total + cartItem.qty, 0);
    setQuanNum(totalQuantity);

    notification['success']({
        message: 'Item added in cart',
        placement: 'bottomRight',
        duration: 1
    });
}