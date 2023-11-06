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
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [clothCart, setClothCart] = useState([])
    const [itemDel, setItemDel] = useState(null)
    const [deletedItemIndex, setDeletedItemIndex] = useState(null);


    useEffect(() => {
        const savedCart = (JSON.parse(localStorage.getItem('cart')) || [])
        setClothCart(savedCart)
    }, [quanNum])

    function quanFunc(func, item, del, e, index) {
        const updatedCart = [...clothCart];
        let itemIndex = clothCart.findIndex(cartItem => cartItem.item.clothID === item.item.clothID);

        if (itemIndex !== -1) {
            if (func === 'inc' || func === 'dec') {
                func === 'inc' ? updatedCart[itemIndex].qty += 1 : updatedCart[itemIndex].qty > 1 ? updatedCart[itemIndex].qty -= 1 : updatedCart[itemIndex].qty = 1;
                setCartNum(updatedCart.length);

                setClothCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }

            if (del) {
                setDeletedItemIndex(index);

                setTimeout(() => {
                    updatedCart.splice(itemIndex, 1)

                    setCartNum(updatedCart.length);
                    setClothCart(updatedCart);
                    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
            <div className='quan-con'>
                <div className='num-con'>
                    <div>
                        <p style={{ display: 'flex', gap: '0.1rem', alignItems: 'center' }}>
                            <RiShoppingBasketFill /> Total: Rs. {totalPrice < 10 ? `0${totalPrice}` : totalPrice}/-
                        </p>
                    </div>
                    <div>
                        <p> Items: {cartNum < 10 ? `0${cartNum}` : cartNum}</p>
                        <p> Quantity: {totalQuan < 10 ? `0${totalQuan}` : totalQuan}</p>
                    </div>
                </div>
                <div>
                    <NavLink to={clothCart.length === 0 ? '#' : '/home/checkout'}>
                        <div className={`checkout-btn ${clothCart.length === 0 ? `btn-disabled` : ``}`}>
                            <NavLink style={{ color: '#fff' }} to={"/home/checkout"}>
                                CHECKOUT
                            </NavLink>
                            <span style={{ display: 'flex' }}>
                                <IoBagCheckOutline />
                            </span>
                        </div>
                    </NavLink>
                </div>
            </div>

            {clothCart.length !== 0 ?
                <List
                    itemLayout="horizontal"
                    dataSource={clothCart}
                    renderItem={(item, index) => {
                        return (
                            <List.Item
                                key={index}
                                className={index === deletedItemIndex ? 'deleteAni' : ''} F
                            >
                                <List.Item.Meta
                                    avatar={<img className='drawer-cart-img' src={item.item.clothImg} />}
                                    title={
                                        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>
                                                {item.item.clothTitle}
                                            </span>
                                            <span>
                                                <NavLink onClick={onClose} to={`/home/product/${item.item.clothID}`}>
                                                    <BsArrowRight size={16} className='item-arrow' />
                                                </NavLink>
                                            </span>
                                        </span>
                                    }
                                    description={
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#126373' }}>
                                                RS {item.item.clothPrice * item.qty}
                                            </div>
                                            <div>SIZE: <b>{item.size.toUpperCase()}</b></div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                                                    <div >QTY: </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                                                        <button onClick={() => quanFunc('dec', item)} className={`quan-btn ${item.qty === 1 ? 'btn-disabled' : ''}`} >-</button>
                                                        <p style={{ fontSize: 18, margin: 0, color: 'black' }}>
                                                            {item.qty}
                                                        </p>
                                                        <button onClick={() => quanFunc('inc', item)} className='quan-btn'>+</button>
                                                    </div>
                                                </div>
                                                <div className='drawer-trash-con'>
                                                    <IoMdTrash className='drawer-trash' size={19} onClick={(e) => quanFunc('', item, true, e, index)} />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )
                    }}
                /> : <>
                    <List>
                        <div className='empty-cart'>
                            <h2>
                                <TbMoodEmpty />
                            </h2>
                            <p style={{ fontWeight: 'bold', marginTop: -10 }}>Cart is Empty!</p>
                            <NavLink to={'/home'}>
                                <Button disableElevation variant="outlined" size="meduim">GO BACK SHOPPING</Button>
                            </NavLink>
                        </div>
                    </List>
                </>}
        </div>
    )
};

export default Lists;