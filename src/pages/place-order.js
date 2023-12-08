import { useEffect, useState, useContext, useRef } from 'react';
import Navbar from '../components/navbar';
import { List } from 'antd';
import CartContext from '../config/cartContext';
import QuanContext from '../config/quanContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { GiTakeMyMoney } from 'react-icons/gi';
import { CiCircleInfo } from 'react-icons/ci'
import { Form, Input } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FcShipped } from "react-icons/fc";
import '../index.css'

const { TextArea } = Input;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    width: 550,
    bgcolor: 'background.paper',
    border: 'none',
    color: 'green',
    boxShadow: 2,
    p: 2.5,
    borderRadius: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '4.5rem'
};


function PlaceOrder() {
    const { REACT_APP_BACKEND_PORT } = process.env

    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [clothCart, setClothCart] = useState([])
    const [isInitialLoad, setIsInitialLoad] = useState(false);
    const [loading, setLoading] = useState(null)
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("")
    const [user, setUser] = useState(null);
    const [noUser, setNoUser] = useState(null);
    const [orderStatus, setOrderStatus] = useState("")
    const [orderMessage, setOrderMessage] = useState("")
    const [orderID, setOrderID] = useState("")
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const formRef = useRef(null);

    useEffect(() => {
        const savedCart = (JSON.parse(localStorage.getItem('cart')) || [])
        setClothCart(savedCart)
        setIsInitialLoad(true);
    }, [quanNum])


    useEffect(() => {
        const userData = async () => {
            if (token) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                try {
                    const response = await axios.post(`${REACT_APP_BACKEND_PORT}/home/user`, null, { headers });

                    if (response.status === 200) {
                        setUser(response.data.userData)
                        setError('')
                        setNoUser(false)
                    } else {
                        console.error('USER NOT FOUND:', response.data);
                    }
                } catch (error) {
                    if (error.message === 'Network Error') {
                        setError(error.message)
                        setOpen(true);
                    } else {
                        setError("Something went wrong, check your internet connection.")
                        setOpen(true);
                    }
                }
            } else {
                setNoUser(true)
            }
        };
        userData();
    }, [token]);

    let totalQuan = clothCart.map(v => v.qty).reduce((acc, qty) => acc + qty, 0)
    let totalPrice = clothCart.reduce((acc, qty) => acc + Number(qty.item.clothPrice) * Number(qty.qty), 0)

    const handleClose = () => {
        setOpen(false);
    };

    const handleShopClose = () => {
        setOpen(false);
        navigate('/home');
        setQuanNum(0);
        setCartNum(0);
        setClothCart([]);
    };

    useEffect(() => {
        if (isInitialLoad) {
            const navigatePage = () => {
                if (clothCart.length === 0) {
                    navigate('/home')
                }
            }
            navigatePage()
        }
    }, [clothCart])

    const onFinish = async (values) => {
        setLoading(true)
        const userToken = localStorage.getItem('token')

        try {
            const cart = clothCart.reduce((acc, items) => {
                const { clothID } = items.item;
                const existingItem = acc[clothID];

                if (existingItem) {
                    // If item with the same clothID already exists, add size and quantity
                    existingItem.sizes.push({
                        size: items.size,
                        qty: items.qty
                    });
                } else {
                    // If item does not exist, create a new entry
                    acc[clothID] = {
                        name: items.item.clothTitle,
                        price: items.item.clothPrice,
                        sizes: [{
                            size: items.size,
                            qty: items.qty
                        }]
                    };
                }
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

            const placingOrder = await axios.post(`${REACT_APP_BACKEND_PORT}/home/checkout`, customerOrderData, { headers })

            if (placingOrder.data.status === 200) {
                setError('')
                setOrderStatus(placingOrder.data.orderDetails.status)
                setOrderMessage(placingOrder.data.orderDetails.message)
                setOrderID(placingOrder.data.orderDetails.orderID)
                setOpen(true)

                localStorage.removeItem('cart')
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            // ERR_NETWORK
            if (error.code === 'ERR_NETWORK') {
                setError(error.message)
                setOpen(true);
                setLoading(false)
            } else {
                setError(error.response.data.error)
                setOpen(true)
                setLoading(false)
            }
        }
    };

    const handleContactUs = () => {
        const email = 'flexus@gmail.com';
        const subject = 'Regarding Order Inquiry';
        const body = '';

        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(mailtoLink, '_blank');
    };

    const onFinishFailed = (errorInfo) => {
        // Get all the field names with errors
        const errorFields = errorInfo.errorFields.map(field => field.name[0]);

        // Get all the field instances in the order they appear in the form
        const formFields = Object.keys(formRef.current.getFieldsValue());

        // Find the first field with an error and focus on it
        const firstErrorField = formFields.find(field => errorFields.includes(field));
        if (firstErrorField) {
            const fieldInstance = formRef.current.getFieldInstance(firstErrorField);
            if (fieldInstance) {
                fieldInstance.focus();
            }
        }
    };

    const sizeMap = {
        XS: 'Extra Small',
        S: 'Small',
        M: 'Medium',
        L: 'Large',
        XL: 'Extra Large',
        XXL: 'Extra Extra Large',
    };

    return (
        <>
            <Navbar />

            <Modal
                keepMounted
                open={open}
                onClose={error.length >= 1 ? handleClose : handleShopClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {error.length >= 1 ?
                        <span style={{ alignSelf: 'flex-start', width: '100%' }}>
                            <Typography id="keep-mounted-modal-title" variant="a" component="a" className='form-error-modal'>
                                {error === '"customerZIPCode" length must be 5 characters long' ? 'Postal code must be exactly 5 digits.' : error}
                            </Typography>
                            <Button className='modal-error-close' variant='contained' disableElevation onClick={handleClose}>
                                Close
                            </Button>
                        </span>
                        : <>
                            <div className='order-modal'>
                                <div>
                                    <FcShipped size={60} />
                                    <h1 style={{ marginTop: 0 }}>{orderStatus}</h1>
                                </div>
                                <div>
                                    <p style={{ fontSize: 22 }}>OrderID: <b>{orderID}</b></p>
                                    <p>{orderMessage}</p>
                                </div>
                            </div>
                            <div className='add-button'>
                                <Button className='add-button' size='large' variant='contained' disableElevation onClick={handleShopClose}>
                                    <span>
                                        Continue shopping
                                    </span>
                                </Button>
                                <p style={{ textAlign: 'center', color: 'black', margin: "4px 0" }}>For any queries, <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={handleContactUs}>contact us</span>.</p>
                            </div>
                        </>
                    }
                </Box>
            </Modal>

            <div className={`check-con`}>
                <h1 className='checkout-title' style={{ marginTop: 80 }}>CHECKOUT</h1>
            </div>

            <div className='checkout-2-con'>
                {noUser !== null ? <>
                    <div className='checkout-details'>
                        <Form
                            ref={formRef}
                            name="order_form"
                            className="detail-form"
                            initialValues={{
                                email: user ? user.customerEmail : '',
                                fullname: user ? user.customerName : '',
                                phone: user ? user.customerNumber : '',
                                address: user ? user.customerAddress : '',
                                ZIPCode: user ? user.customerPostal : ''
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            scrollToFirstError={true}
                            requiredMark={false}
                            layout='vertical'
                        >
                            <div className='order-del-title'>
                                <h2>Contact</h2>
                                {noUser && <p>Have an account? <NavLink to='/login' style={{ textDecoration: 'underline' }}>Login</NavLink></p>}
                            </div>

                            <div className='correct-info'>
                                <p className='correct-info-det'>Enter your correct details.</p>
                                <CiCircleInfo />
                            </div>

                            <Form.Item
                                name="fullname"
                                label="Fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Enter your fullname!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input
                                    size='large'
                                    placeholder='Full Name'
                                />
                            </Form.Item>

                            <div
                                className='form-dis'
                            >
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Enter a valid email',
                                        },
                                        {
                                            required: true,
                                            message: 'Enter an email',
                                        },
                                    ]}
                                >
                                    <Input
                                        size='large'
                                        placeholder='Email'
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Mobile Number"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter a phone number',
                                        },
                                    ]}
                                    validateTrigger="onBlur"
                                    tooltip="In case we need to contact you about your order"
                                >
                                    <Input
                                        maxLength={11}
                                        minLength={11}
                                        size='large'
                                        placeholder='Mobile Number'
                                    />
                                </Form.Item>
                            </div>

                            <div className='form-separator'></div>

                            <div className='order-del-title'>
                                <h2>Delivery</h2>
                            </div>

                            <div>
                                <div className='correct-info'>
                                    <p className='correct-info-det'>Enter your current residential address.</p>
                                    <CiCircleInfo />
                                </div>

                                <Form.Item
                                    name="address"
                                    label="Residential Address"
                                    style={{
                                        flexGrow: 3
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter an address!',
                                        },
                                    ]}
                                >
                                    <TextArea
                                        size='large'
                                        placeholder="Residential Address"
                                        autoSize={{
                                            minRows: 1,
                                            maxRows: 6,
                                        }}
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="ZIPCode"
                                    style={{
                                        flexGrow: 1
                                    }}
                                    label="Postal Code"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter a postal code!',
                                        },
                                    ]}
                                >
                                    <Input
                                        size='large'
                                        placeholder='Postal Code'
                                        maxLength={5}
                                        minLength={5}
                                    />
                                </Form.Item>
                            </div>

                            <div className='form-separator'></div>

                            <div style={{ marginBottom: 50 }}>
                                <div style={{ margin: 0 }} className='order-del-title'>
                                    <h2 >Payment</h2>
                                </div>

                                <div>
                                    <p style={{ marginTop: 5, marginBottom: 15 }} className='correct-info-det'>Only one method available.</p>
                                    <p className='cod-con'>
                                        <GiTakeMyMoney color='#333333' size={24} />
                                        CASH ON DELIVERY (COD)
                                    </p>
                                </div>
                            </div>

                            <div className='form-separator visible'></div>

                            <div className='check-items-con visible'>
                                <div>
                                    <p>Subtotal </p>
                                    <p>Shipping </p>

                                    <p style={{ marginTop: 5, fontSize: 24, fontWeight: 600 }}>Total </p>
                                </div>
                                <div>
                                    <p>Rs {totalPrice < 10 ? `0${totalPrice}` : totalPrice}</p>
                                    <p>Free</p>

                                    <p style={{ marginTop: 5, fontSize: 24, fontWeight: 600 }}>
                                        Rs {totalPrice < 10 ? `0${totalPrice}` : totalPrice}
                                    </p>
                                </div>
                            </div>

                            <div className='form-separator visible'></div>

                            <LoadingButton
                                type='primary'
                                loading={loading}
                                variant="contained"
                                size='large'
                                className={`form-button ${clothCart.length === 0 ? 'btn-disabled' : ''}`}
                            >
                                <span style={{ fontSize: 20 }}>
                                    PLACE ORDER
                                </span>
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
                                className='order-item-list'
                                renderItem={(item, index) => {
                                    const itemSize = sizeMap[item.size]

                                    return (
                                        <List.Item
                                            key={index}
                                        >
                                            <List.Item.Meta
                                                className='order-list'
                                                avatar={
                                                    <div style={{ position: 'relative' }}>
                                                        <img
                                                            className='drawer-cart-img'
                                                            style={{
                                                                width: 100, height: 100
                                                            }}
                                                            src={`${REACT_APP_BACKEND_PORT}/images/${item.item.clothImg}`}
                                                        />
                                                        <div className='checkout-item-qty'>
                                                            {item.qty}
                                                        </div>
                                                    </div>
                                                }
                                                title={
                                                    <div style={{ fontSize: 17, marginBottom: 0, flexGrow: 1, lineHeight: 1, marginTop: 10 }}>
                                                        {item.item.clothTitle}
                                                    </div>
                                                }
                                                description={
                                                    <div className='desc-con'>
                                                        <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                                                            <div className='checkout-size'>
                                                                '{item.size.toUpperCase()}'

                                                                <span className='size-hover'>{itemSize}</span>
                                                            </div>
                                                            <div className='checkout-price'>
                                                                <span style={{ fontSize: 17, fontWeight: 500 }} >PKR </span>
                                                                {item.item.clothPrice * item.qty}
                                                            </div>

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

                        <div className='check-items-con change-pos'>
                            <div>
                                <p>Subtotal </p>
                                <p>Shipping </p>

                                <p style={{ marginTop: 5, fontSize: 24, fontWeight: 600 }}>Total </p>
                            </div>
                            <div>
                                <p>Rs {totalPrice < 10 ? `0${totalPrice}` : totalPrice}</p>
                                <p>Free</p>

                                <p style={{ marginTop: 5, fontSize: 24, fontWeight: 600 }}>
                                    Rs {totalPrice < 10 ? `0${totalPrice}` : totalPrice}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
                    :
                    <span className='loader' style={{ position: 'absolute', top: '50px', transform: 'translate(-50%, 50%)' }}></span>
                }
            </div>
        </>
    )
}

export default PlaceOrder;