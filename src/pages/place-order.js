import Navbar from '../components/navbar'
import { List } from 'antd';
import { useEffect, useState, useContext } from 'react';
import CartContext from '../config/cartContext';
import QuanContext from '../config/quanContext';
import { BsArrowRight } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
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

        const userID = localStorage.getItem('UID')

        setLoading(true)
        try {
            const customerData = {
                customerID: userID,
                customerName: values.fullname,
                customerNumber: values.phone,
                customerEmail: values.email,
                customerAddress: values.address,
                customerZIPCode: values.ZIPCode,
                // items: 
            }
            // const registerCustomer = await axios.post('http://localhost:3001/', customerData)
            // console.log('registerCustomer.data---->', registerCustomer.data)
            // localStorage.setItem('UID', registerCustomer.data.token)
            
            console.log(customerData)
            setLoading(false)

            // const userUID = localStorage.getItem('UID')
            // userUID && navigate('/home')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    };

    // const placeOrder = () => {

    // }

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



    return (
        <>
            <Navbar />
            <h1></h1>

            <p className='disclaimer'>Delivery only available in <b style={{ marginLeft: 5 }}> KARACHI</b>, Pakistan</p>

            <span className='navs'>Home / Checkout / Order /</span>

            <div className='check-con'>
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
                        <div className='form-name order-del-title'>
                            <h2>User Details:</h2>
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

                        <div className='form-name order-del-title'>
                            <h2>Delivery Address:</h2>
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

                        <div className='form-separator'></div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 30 }}>
                            <div style={{ margin: 0 }} className='form-name order-del-title'>
                                <h2 >Payment Method:</h2>
                            </div>
                            <p style={{ margin: 0, fontSize: 20, fontWeight: 500 }}>CASH ON DELIVERY</p>
                        </div>


                        {/* <div className='form-separator'></div> */}

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