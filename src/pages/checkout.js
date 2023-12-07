import Navbar from '../components/navbar'
import { List } from 'antd';
import { useEffect, useState, useContext } from 'react';
import CartContext from '../config/cartContext';
import QuanContext from '../config/quanContext';
import { IoMdTrash } from 'react-icons/io'
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import Footer from '../components/footer';
import '../index.css'

function Checkout() {
    const { REACT_APP_BACKEND_PORT } = process.env

    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [clothCart, setClothCart] = useState([])
    const [itemDel, setItemDel] = useState(null)

    useEffect(() => {
        const savedCart = (JSON.parse(localStorage.getItem('cart')) || [])
        setClothCart(savedCart)
    }, [quanNum])

    const [deletedItemIndex, setDeletedItemIndex] = useState(null);


    function quanFunc(func, item, del, e, index) {
        e.preventDefault()
        const updatedCart = [...clothCart];
        const itemIndex = clothCart.findIndex(
            cartItem => cartItem.item.clothID === item.item.clothID && cartItem.size === item.size
        );

        if (itemIndex !== -1) {
            if (func === 'inc' || func === 'dec') {
                updatedCart[itemIndex].qty = func === 'inc' ? updatedCart[itemIndex].qty + 1 : Math.max(updatedCart[itemIndex].qty - 1, 1);

                setCartNum(updatedCart.length);

                setClothCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }

            if (del) {
                setDeletedItemIndex(index);
                setItemDel(true)

                setTimeout(() => {
                    updatedCart.splice(itemIndex, 1)

                    setCartNum(updatedCart.length);
                    setClothCart(updatedCart);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));

                    setItemDel(false)
                }, 480)
            }
        }
    }

    useEffect(() => {
        if (deletedItemIndex !== null) {
            const timeoutId = setTimeout(() => {
                setDeletedItemIndex(null);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [deletedItemIndex]);

    let totalPrice = clothCart.reduce((acc, qty) => acc + Number(qty.item.clothPrice) * Number(qty.qty), 0)

    return (
        <>
            <Navbar />

            <div className='navs'>
                <NavLink className='navs-link' to={'/home'}>
                    Home { }
                </NavLink>
                / { }
                <NavLink className='navs-link' to={'/home/checkout'}>
                    Checkout { }
                </NavLink>
                / { }
            </div>

            <div className={`check-con`} style={{ marginBottom: 0 }}>
                <h1 className='checkout-title'>CART </h1>
            </div>

            <div style={{ textAlign: 'center', marginTop: -10 }}>
                <NavLink to={`/home`} style={{ fontSize: 18, textDecoration: 'underline' }} className='navs-link'>
                    Continue Shopping
                </NavLink>
            </div>


            <div className='checkout-cart'>
                {clothCart.length !== 0 ?
                    <>
                        <List
                            itemLayout="horizontal"
                            dataSource={clothCart}
                            className='list-check'
                            renderItem={(item, index) => {
                                return (
                                    <List.Item
                                        key={index}
                                        className={index === deletedItemIndex ? 'deleteAni' : ''}
                                    >
                                        <NavLink to={`/home/product/${item.item.clothID}`} style={{ width: '100%' }}>
                                            <List.Item.Meta
                                                className='order-list'
                                                avatar={
                                                    <img
                                                        className='checkout-item-img'
                                                        src={`${REACT_APP_BACKEND_PORT}/images/${item.item.clothImg}`}
                                                    />
                                                }
                                                title={
                                                    <div style={{ fontSize: 21, marginBottom: -5 }}>
                                                        {item.item.clothTitle}
                                                    </div>
                                                }
                                                description={
                                                    <div>

                                                        <div style={{ fontWeight: '500', color: '#126373', fontSize: 18 }}>
                                                            {item.size.toUpperCase()}
                                                        </div>

                                                        <div className='item-list-qty'>
                                                            <div>
                                                                <div style={{ fontSize: 16 }}>QTY: </div>
                                                                <div>
                                                                    <button
                                                                        onClick={(e) => quanFunc('dec', item, '', e)}
                                                                        className={`quan-btn ${item.qty === 1 ? 'btn-disabled' : ''}`} style={{ padding: '0 10px' }}
                                                                    >
                                                                        -
                                                                    </button>

                                                                    <p style={{ fontSize: 20 }}>
                                                                        {item.qty}
                                                                    </p>

                                                                    <button
                                                                        onClick={(e) => quanFunc('inc', item, '', e)} className='quan-btn'>
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className='drawer-trash-con'>
                                                                <IoMdTrash className={`drawer-trash ${itemDel ? 'btn-disabled' : ''}`} size={22}
                                                                    onClick={(e) => {
                                                                        quanFunc('', item, true, e, index)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div style={{ fontWeight: '500', color: '#126373', fontSize: 19 }}>
                                                            PKR {item.item.clothPrice * item.qty}
                                                        </div>
                                                    </div>
                                                }
                                            />
                                        </NavLink>
                                    </List.Item>
                                )
                            }}
                        />

                        <div className='checkout-num'>
                            <div>
                                <p>Subtotal: <b> Rs. {totalPrice < 10 ? `0${totalPrice}` : totalPrice}/-</b></p>
                            </div>
                            <p style={{ margin: 0, fontWeight: 500 }}>Shipping, taxes calculated at checkout.</p>
                            <div>
                                <NavLink to={`${clothCart.length !== 0 ? '/home/checkout/order' : '#'}`}>
                                    <Button variant='contained' size='large' className={`confirm-btn ${clothCart.length === 0 ? 'btn-disabled' : ''}`}>
                                        <span>
                                            CONFIRM CART
                                        </span>
                                    </Button>
                                </NavLink>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <List>
                            <div className='empty-cart'>
                                <p>Your cart is currently empty.</p>
                            </div>
                        </List >
                    </>}
            </div >

            <Footer />
        </>
    )
}

export default Checkout;