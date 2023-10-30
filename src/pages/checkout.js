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
import '../index.css'
import axios from 'axios';

const { TextArea } = Input;
const { Option } = Select

function Checkout() {


    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [clothCart, setClothCart] = useState([])
    const [itemDel, setItemDel] = useState(null)

    useEffect(() => {
        const savedCart = (JSON.parse(localStorage.getItem('cart')) || [])
        setClothCart(savedCart)
    }, [quanNum])

    function quanFunc(func, item, del, e) {
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
                // setItemDel(true)
                const targetParent = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement

                // targetParent.setAttribute('class', 'ant-list-item-meta list-con')

                // setTimeout(() => {
                updatedCart.splice(itemIndex, 1)

                setCartNum(updatedCart.length);
                setClothCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));

                setItemDel(false)
                // }, 3300);
            }
        }
    }

    let totalQuan = clothCart.map(v => v.qty).reduce((acc, qty) => acc + qty, 0)
    let totalPrice = clothCart.reduce((acc, qty) => acc + Number(qty.item.clothPrice) * Number(qty.qty), 0)



    const [loading, setLoading] = useState(null)
    const [address, setAddress] = useState("")

    const navigate = useNavigate()

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        setLoading(true)
        try {
            const customerData = {
                customerName: values.fullname,
                customerEmail: values.email,
                customerPassword: values.password,
                repeatPassword: values.confirm,
                customerNumber: values.phone
            }
            const registerCustomer = await axios.post('http://localhost:3001/', customerData)
            console.log('registerCustomer.data---->', registerCustomer.data)
            setLoading(false)
            localStorage.setItem('UID', registerCustomer.data.token)

            const userUID = localStorage.getItem('UID')
            userUID && navigate('/home')
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
                defaultValue={'+92'}
            >
                <Option value="92">+92</Option>
            </Select>
        </Form.Item>
    );



    return (
        <>
            <Navbar />
            <h1></h1>


            <span className='navs'>Home / Checkout /</span>

            <div className='check-con'>
                <h1 className='checkout-title'>CHECKOUT </h1>
                <p className='checkout-step'>1</p>
            </div>


            <div className='checkout-cart'>
                <div className='checkout-shop-title'>
                    <h2>SHOPPING CART</h2>
                    <NavLink to={'/home'}>
                        <Button variant='outlined'>BROWSE</Button>
                    </NavLink>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={clothCart}
                    renderItem={(item, index) => {
                        return (
                            <List.Item
                                key={index}
                            >
                                <List.Item.Meta
                                    avatar={<img className='drawer-cart-img' src={item.item.clothImg} />}
                                    title={
                                        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span>
                                                {item.item.clothTitle}
                                            </span>
                                            <span>
                                                <NavLink to={`/home/product/${item.item.clothID}`}>
                                                    <BsArrowRight size={16} className='item-arrow' />
                                                </NavLink>
                                            </span>
                                        </span>
                                    }
                                    description={
                                        <div>
                                            <div>{item.item.clothCon}</div>
                                            <div style={{ fontWeight: '600', color: '#126373' }}>
                                                RS {item.item.clothPrice * item.qty}
                                            </div>
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
                                                    <IoMdTrash className='drawer-trash' size={19} onClick={(e) => quanFunc('', item, true, e)} />
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />
                            </List.Item>
                        )
                    }}
                />

                <div className='checkout-num'>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <p>Total: Rs. {totalPrice < 10 ? `0${totalPrice}` : totalPrice}/-</p>
                        <p>Items: {cartNum < 10 ? `0${cartNum}` : cartNum}</p>
                        <p> Quantity: {totalQuan < 10 ? `0${totalQuan}` : totalQuan}</p>
                    </div>
                    <div>
                        <NavLink to={'/home/checkout/order'}>
                            <Button variant='contained'>CONFIRM CART</Button>
                        </NavLink>
                    </div>
                </div>
            </div>


            {/* <div className='checkout-details'>
                <Form
                    name="normal_login"
                    className="form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    scrollToFirstError={true}
                >
                    <Form.Item>
                        <div className='form-name'>
                            <h2>Delivery Details:</h2>
                        </div>
                    </Form.Item>

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
                            // value={value}
                            // onChange={(e) => setAddress(e.target.value)}
                            placeholder="Gulshan-e-Iqbal, Block-13, House No 843/13, Karachi."
                            autoSize={{
                                minRows: 3,
                                maxRows: 5,
                            }}
                        />
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
                            addonBefore={prefixSelector}
                            maxLength={10}
                            minLength={10}
                            showCount={false}
                            style={{
                                width: '100%',
                            }}
                            placeholder='3428665302'
                        />
                    </Form.Item>

                </Form >
            </div> */}

        </>
    )
}

export default Checkout;