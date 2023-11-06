import Navbar from '../components/navbar';
import { List } from 'antd';
import { useEffect, useState, useContext } from 'react';
import CartContext from '../config/cartContext';
import QuanContext from '../config/quanContext';
import { BsArrowRight } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { GiTakeMyMoney } from 'react-icons/gi';
import { CiCircleInfo } from 'react-icons/ci'
import { Form, Input, Select } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import '../index.css'
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select


function PlaceOrder() {
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [clothCart, setClothCart] = useState([])
    const [itemDel, setItemDel] = useState(null)


    useEffect(() => {
        const savedCart = (JSON.parse(localStorage.getItem('cart')) || [])
        setClothCart(savedCart)
    }, [quanNum])


    let totalQuan = clothCart.map(v => v.qty).reduce((acc, qty) => acc + qty, 0)
    let totalPrice = clothCart.reduce((acc, qty) => acc + Number(qty.item.clothPrice) * Number(qty.qty), 0)


    const [loading, setLoading] = useState(null)
    const navigation = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        const userToken = localStorage.getItem('UID')

        try {
            const cart = clothCart.reduce((acc, items) => {
                acc[items.item.clothID] = {
                    "qty": items.qty,
                    "name": items.item.clothTitle,
                    "price": items.item.clothPrice,
                    "size": items.size
                };
                return acc;
            }, {});

            const customerOrderData = {
                customerName: values.fullname,
                customerNumber: values.phone,
                customerEmail: values.email,
                customerAddress: values.address,
                customerZIPCode: values.ZIPCode,
                items: cartNum,
                amount: totalPrice,
                cart: cart
            }

            const headers = {
                'Authorization': `Bearer ${userToken}`
            };

            const placingOrder = await axios.post('http://localhost:3001/home/checkout', customerOrderData, { headers })
            console.log(placingOrder)

            console.log('Status ~ ', placingOrder.data.orderStatus)

            if (placingOrder.data.status === 200) {
                localStorage.removeItem('cart')
                setTimeout(() => {
                    navigation('/home')
                }, 1000);
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="92">+92</Option>
            </Select>
        </Form.Item>
    );

    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        // Add an event listener to handle scroll events
        const handleScroll = () => {
            if (window.scrollY >= 110) {
                setIsSticky(true);
            } else if (window.scrollY === 0) {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <>
            <Navbar />

            <p className='disclaimer'>Delivery only available in <b style={{ marginLeft: 5 }}> KARACHI</b>, Pakistan</p>

            <span className='navs'>
                <NavLink className='navs-link' to={'/home'}>
                    Home
                </NavLink>
                /
                <NavLink className='navs-link' to={'/home/checkout'}>
                    Checkout
                </NavLink>
                /
                <NavLink className='navs-link' to={'/home/checkout/order'}>
                    Order
                </NavLink>
                /
            </span>

            <div className={`check-con ${isSticky ? 'pos-mar' : ''}`}>
                <h1 className='checkout-title'>CHECKOUT </h1>
                <p className='checkout-step'>2</p>
            </div>

            <div className='checkout-2-con'>
                <div className='checkout-details'>
                    <Form
                        name="normal_login"
                        className="detail-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        scrollToFirstError={true}
                    >
                        <div className='order-del-title'>
                            <h2>User Details:</h2>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", gap: "0.5rem", marginTop: -5, marginBottom: 15 }}>
                            <p style={{ color: "#9399a2", fontSize: 15, fontWeight: 300, margin: 0 }} >Enter your correct details.</p>
                            <CiCircleInfo />
                        </div>

                        <Form.Item
                            name="fullname"
                            label="Fullname"
                            tooltip="Please enter your real name!"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your fullname!',
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input placeholder='Ahmed Khan' />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                            validateTrigger="onBlur"
                        >
                            <Input
                                // addonBefore={prefixSelector}
                                maxLength={11}
                                minLength={11}
                                style={{
                                    width: '100%',
                                }}
                                placeholder='0342-8665302'
                            />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ]}
                        >
                            <Input placeholder='xyz@gmail.com' />
                        </Form.Item>


                        <div className='form-separator'></div>

                        <div className='order-del-title'>
                            <h2>Delivery Address:</h2>
                        </div>

                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", gap: "0.5rem", marginTop: -5, marginBottom: 15 }}>
                                <p style={{ color: "#9399a2", fontSize: 15, fontWeight: 300, margin: 0 }} >Enter your current residential address.</p>
                                <CiCircleInfo />
                            </div>
                            <Form.Item
                                name="address"
                                label="House Address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your address!',
                                    },
                                ]}
                            >
                                <TextArea
                                    placeholder="Gulshan-e-Iqbal, Block-13, House No 843/13, Karachi."
                                    autoSize={{
                                        minRows: 1,
                                        maxRows: 6,
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="ZIPCode"
                                label="Postal Code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input zip code!',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: 120,
                                    }}
                                    placeholder='ZIP Code'
                                    maxLength={5}
                                />
                            </Form.Item>
                        </div>


                        <div className='form-separator'></div>

                        {/* display: 'flex', alignItems: 'center', gap: '1rem', */}
                        <div style={{ marginBottom: 50 }}>
                            <div style={{ margin: 0 }} className='order-del-title'>
                                <h2 >Payment Method:</h2>
                            </div>

                            <div>
                                <p style={{ color: "#9399a2", fontSize: 15, fontWeight: 300, marginTop: 5, marginBottom: 15 }}>Only one method available.</p>
                                <p className='cod-con'>
                                    <GiTakeMyMoney color='white' size={22} autoSize /> CASH ON DELIVERY
                                </p>
                            </div>
                        </div>


                        <div className='form-separator'></div>

                        <LoadingButton type='primary' loading={loading} variant="contained" className="form-button">
                            PLACE ORDER
                        </LoadingButton>

                    </Form >
                </div >

                <div className='order-con'>
                    <div className='order-item-con'>
                        <p>Items: {cartNum < 10 ? `0${cartNum}` : cartNum} </p>
                        <p> Quantity: {totalQuan < 10 ? `0${totalQuan}` : totalQuan}</p>
                    </div>
                    <div>
                        <List
                            itemLayout="horizontal"
                            dataSource={clothCart}
                            renderItem={(item, index) => {
                                return (
                                    <List.Item
                                        key={index}
                                    >
                                        <List.Item.Meta
                                            className='order-list'
                                            avatar={<img className='drawer-cart-img' src={item.item.clothImg} />}
                                            title={
                                                <span>
                                                    {item.item.clothTitle}
                                                </span>
                                            }
                                            description={
                                                <div className='desc-con'>
                                                    <div style={{ fontWeight: '600', color: '#126373' }}>
                                                        RS {item.item.clothPrice * item.qty}
                                                    </div>
                                                    <div>SIZE: <b>{item.size.toUpperCase()}</b></div>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <div>QTY: {item.qty}</div>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )
                            }}
                        />
                    </div>

                    <div className='form-separator' style={{ margin: '2px auto' }}></div>
                    <div className='check-items-con'>
                        <div>
                            <p>Subtotal: </p>
                            <p>Delivery Fess: </p>
                            <div className='form-separator' style={{ margin: '8px 0' }}></div>
                            <p>Total: </p>
                        </div>
                        <div>
                            <p>Rs. {totalPrice < 10 ? `0${totalPrice}` : totalPrice}/-</p>
                            <p>Rs. 80/-</p>
                            <div className='form-separator' style={{ margin: '8px 0' }}></div>
                            <p>Rs. {totalPrice < 10 ? `0${totalPrice + 80}` : totalPrice + 80}/-</p>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default PlaceOrder;