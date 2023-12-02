import Navbar from '../components/navbar'
import { List } from 'antd';
import { useEffect, useState, useContext } from 'react';
import CartContext from '../config/cartContext';
import QuanContext from '../config/quanContext';
import { BsArrowRight } from 'react-icons/bs'
import { IoMdTrash } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Checkbox, Form, Input, Select } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import { TbMoodEmpty } from 'react-icons/tb'
import axios from 'axios';
import Footer from '../components/footer';
import '../index.css'

const { Option } = Select

function Checkout() {
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [clothCart, setClothCart] = useState([])
    const [itemDel, setItemDel] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const savedCart = (JSON.parse(localStorage.getItem('cart')) || [])
        setClothCart(savedCart)
    }, [quanNum])

    // function quanFunc(func, item, del, e) {
    //     e.preventDefault()
    //     const updatedCart = [...clothCart];
    //     let itemIndex = clothCart.findIndex(cartItem => cartItem.item.clothID === item.item.clothID);

    //     if (itemIndex !== -1) {
    //         if (func === 'inc' || func === 'dec') {
    //             func === 'inc' ? updatedCart[itemIndex].qty += 1 : updatedCart[itemIndex].qty > 1 ? updatedCart[itemIndex].qty -= 1 : updatedCart[itemIndex].qty = 1;
    //             setCartNum(updatedCart.length);

    //             setClothCart(updatedCart);
    //             localStorage.setItem('cart', JSON.stringify(updatedCart));
    //         }

    //         if (del) {
    //             // setItemDel(true)
    //             const targetParent = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement

    //             // targetParent.setAttribute('class', 'ant-list-item-meta list-con')

    //             // setTimeout(() => {
    //             updatedCart.splice(itemIndex, 1)

    //             setCartNum(updatedCart.length);
    //             setClothCart(updatedCart);
    //             localStorage.setItem('cart', JSON.stringify(updatedCart));

    //             setItemDel(false)
    //             // }, 3300);
    //         }
    //     }
    // }

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

    let totalQuan = clothCart.map(v => v.qty).reduce((acc, qty) => acc + qty, 0)
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
                {/* <p className='checkout-step'>1</p> */}
            </div>

            <div style={{ textAlign: 'center', marginTop: -10 }}>
                <NavLink to={`/home`} style={{ fontSize: 18, textDecoration: 'underline' }} className='navs-link'>
                    Continue Shopping
                </NavLink>
            </div>


            <div className='checkout-cart'>
                {/* <div className='checkout-shop-title'>
                    <h2>SHOPPING CART</h2>
                    <NavLink to={'/home'}>
                        <Button variant='outlined'>BROWSE</Button>
                    </NavLink>
                </div> */}


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
                                                        src={`http://localhost:3001/images/${item.item.clothImg}`}
                                                    />
                                                }
                                                title={
                                                    <div>
                                                        <div style={{ fontSize: 21, marginBottom: -5 }}>
                                                            {item.item.clothTitle}
                                                        </div>


                                                    </div>
                                                }
                                                description={
                                                    <div>
                                                        {/* <span className='loader' style={{ top: "40%" }}></span> */}

                                                        <div style={{ fontWeight: '500', color: '#126373', fontSize: 18 }}>
                                                            {item.size.toUpperCase()}
                                                        </div>

                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                                                <div style={{ fontWeight: '400', color: '#126373', fontSize: 16 }}>QTY: </div>
                                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                                                    <button
                                                                        onClick={(e) => quanFunc('dec', item, '', e)}
                                                                        className={`quan-btn ${item.qty === 1 ? 'btn-disabled' : ''}`} style={{ padding: '0 10px' }}
                                                                    >
                                                                        -
                                                                    </button>

                                                                    <p style={{ fontSize: 20, margin: 0, color: 'black' }}>
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
                                {/* <p>Items: <b>{cartNum < 10 ? `0${cartNum}` : cartNum}</b></p> */}
                                {/* <p> Quantity: <b>{totalQuan < 10 ? `0${totalQuan}` : totalQuan}</b></p> */}
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
                                <p style={{ fontWeight: '500', margin: 0 }}>Your cart is currently empty.</p>
                            </div>
                        </List >
                    </>}

            </div >

            <Footer />
        </>
    )
}

export default Checkout;