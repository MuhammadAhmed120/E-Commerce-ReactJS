import { notification } from "antd";

export default function cartInc(event, item, setCartNum, setQuanNum, itemQuan, size) {
    event.preventDefault();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    // let dupItemIndex = cart.findIndex(cartItem => cartItem.item.clothID === item.clothID);
    // let sizeItemIndex = cart.findIndex(cartItem => cartItem.size === size)

    const existingItemIndex = cart.findIndex(cartItem => cartItem.item.clothID === item.clothID && cartItem.size === size);

    if (existingItemIndex !== -1) {
        // const existingSize = cart[sizeItemIndex]
        // console.log(existingSize)
        // if (existingSize === undefined) {
        //     cart.push({ item, qty: 1, size });
        // }
        // else {
        //     console.log("NO")
        //     existingSize.qty += itemQuan
        // }

        // if (itemQuan) {
        //     cart[dupItemIndex].qty += itemQuan;
        // } else {
        //     cart[dupItemIndex].qty += 1;
        // }

        if (itemQuan) {
            cart[existingItemIndex].qty += itemQuan;
        } else {
            cart[existingItemIndex].qty += 1;
        }
    } else {
        if (itemQuan) {
            cart.push({ item, qty: itemQuan, size });
        } else {
            cart.push({ item, qty: 1, size });
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