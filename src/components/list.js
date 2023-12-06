import { List } from 'antd';
import { useEffect, useState, useContext } from 'react';
import CartContext from '../config/cartContext';
import QuanContext from '../config/quanContext';
import { BsArrowRight } from 'react-icons/bs'
import { RiShoppingBasketFill } from 'react-icons/ri'
import { IoMdTrash } from 'react-icons/io'
import { TbMoodEmpty } from 'react-icons/tb'
import { IoBagCheckOutline } from 'react-icons/io5'
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const Lists = ({ onClose }) => {
    const { REACT_APP_BACKEND_PORT } = process.env

    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [clothCart, setClothCart] = useState([])
    const [itemDel, setItemDel] = useState(null)
    const [deletedItemIndex, setDeletedItemIndex] = useState(null);

    useEffect(() => {
        const savedCart = (JSON.parse(localStorage.getItem('cart')) || [])
        setClothCart(savedCart)
    }, [quanNum, cartNum])

    function quanFunc(func, item, del, e, index) {
        e.preventDefault()
        const updatedCart = [...clothCart];
        // let itemIndex = clothCart.findIndex(cartItem => cartItem.item.clothID === item.item.clothID);

        const itemIndex = clothCart.findIndex(
            cartItem => cartItem.item.clothID === item.item.clothID && cartItem.size === item.size
        );

        if (itemIndex !== -1) {
            if (func === 'inc' || func === 'dec') {
                // func === 'inc' ?
                //     updatedCart[itemIndex].qty += 1
                //     :
                //     updatedCart[itemIndex].qty > 1
                //         ?
                //         updatedCart[itemIndex].qty -= 1
                //         :
                //         updatedCart[itemIndex].qty = 1;

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

    let totalQuan = clothCart.map(v => v.qty).reduce((acc, qty) => acc + qty, 0)
    let totalPrice = clothCart.reduce((acc, qty) => acc + Number(qty.item.clothPrice) * Number(qty.qty), 0)

    useEffect(() => {
        if (deletedItemIndex !== null) {
            const timeoutId = setTimeout(() => {
                setDeletedItemIndex(null);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [deletedItemIndex]);


    return (
        <div className='lists-con'>

            {clothCart.length !== 0 ?
                <>
                    <div className='quan-con'>
                        <div className='num-con'>
                            {/* <div> */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                <div>
                                    {/* <RiShoppingBasketFill /> */}
                                    <p style={{ marginLeft: 3 }}>
                                        Subtotal:
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Rs. {totalPrice < 10 ? `0${totalPrice}` : totalPrice}/-
                                    </p>
                                </div>
                            </div>
                            {/* </div> */}
                            {/* <div>
                        <p> Items: {cartNum < 10 ? `0${cartNum}` : cartNum}</p>
                        <p> Quantity: {totalQuan < 10 ? `0${totalQuan}` : totalQuan}</p>
                    </div> */}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ margin: 5, fontSize: 16, fontWeight: 600 }}>Shipping, taxes calculated at checkout.</p>
                            <NavLink to={clothCart.length === 0 ? '#' : '/home/checkout'}>
                                {/* <div className={`checkout-btn ${clothCart.length === 0 ? `btn-disabled` : ``}`}> */}
                                <div className={clothCart.length === 0 ? 'btn-disabled' : ''}>
                                    <NavLink to={"/home/checkout"} >
                                        <Button variant='outlined' size='small' className='add-button' style={{ marginBottom: 5 }} >
                                            <span style={{ marginRight: 5, fontSize: 18, fontWeight: 600 }}>
                                                VIEW CART
                                            </span>
                                            {/* <RiShoppingBasketFill /> */}
                                        </Button>
                                    </NavLink>
                                    <NavLink to={"/home/checkout/order"}>
                                        <Button variant='contained' size='small' className='add-button'>
                                            <span style={{ marginRight: 5, fontSize: 18 }}>
                                                CHECKOUT
                                            </span>
                                            <IoBagCheckOutline />
                                        </Button>
                                    </NavLink>
                                </div>
                                {/* <span style={{ display: 'flex' }}>
                            </span> */}
                                {/* </div> */}
                            </NavLink>
                        </div>
                    </div>

                    <List
                        itemLayout="horizontal"
                        dataSource={clothCart}
                        renderItem={(item, index) => {
                            return (
                                <List.Item
                                    key={index}
                                    className={index === deletedItemIndex ? 'deleteAni' : ''}
                                >
                                    <NavLink to={`/home/product/${item.item.clothID}`} style={{ width: '100%' }}>
                                        <List.Item.Meta
                                            avatar={<img className='drawer-cart-img' src={`${REACT_APP_BACKEND_PORT}/images/${item.item.clothImg}`} />}

                                            title={

                                                <span style={{ fontSize: 16 }}>
                                                    {item.item.clothTitle}
                                                </span>

                                            }
                                            description={
                                                <div>
                                                    <div style={{
                                                        display: 'flex',
                                                        flexWrap: 'wrap',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}>
                                                        <div style={{ fontWeight: '600', color: '#126373', fontSize: 15 }}>
                                                            {item.size.toUpperCase()}
                                                        </div>

                                                        <div style={{ fontWeight: '600', color: '#126373', fontSize: 18, margin: "-5px 0" }}>
                                                            <span style={{ fontSize: 16 }}>RS</span> {item.item.clothPrice * item.qty}
                                                        </div>
                                                    </div>

                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                                            <div style={{ fontWeight: 500 }}>QTY: </div>
                                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                                                <button onClick={(e) => quanFunc('dec', item, '', e)} className={`quan-btn ${item.qty === 1 ? 'btn-disabled' : ''}`} >-</button>
                                                                <p style={{ fontSize: 18, margin: 0, color: 'black' }}>
                                                                    {item.qty}
                                                                </p>
                                                                <button
                                                                    onClick={(e) => quanFunc('inc', item, '', e)} className='quan-btn'>+</button>
                                                            </div>
                                                        </div>
                                                        <div className='drawer-trash-con'>
                                                            <IoMdTrash className={`drawer-trash ${itemDel ? 'btn-disabled' : ''}`} size={19} onClick={(e) => {
                                                                e.preventDefault()
                                                                quanFunc('', item, true, e, index)
                                                            }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </NavLink>
                                </List.Item>
                            )
                        }}
                    />
                </>

                : <>
                    <List>
                        {/* <div className='empty-cart'>
                            <h2>
                                <TbMoodEmpty />
                            </h2>
                            <p style={{ fontWeight: 'bold', marginTop: -10 }}>Cart is Empty!</p>
                            <NavLink to={'/home'} onClick={onClose}>
                                <Button disableElevation variant="outlined"
                                >
                                    <span style={{ fontSize: 18 }}>
                                        GO BACK SHOPPING
                                    </span>
                                </Button>
                            </NavLink>
                        </div> */}

                        <div className='empty-cart' style={{ marginTop: 20 }}>
                            <p>Your cart is currently empty.</p>
                        </div>
                    </List >
                </>}
        </div >
    )
};

export default Lists;