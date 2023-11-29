import { useEffect, useState, useContext, useRef } from 'react';
import Navbar from '../components/navbar';
import { List } from 'antd';
import CartContext from '../config/cartContext';
import QuanContext from '../config/quanContext';
import { BsArrowRight } from 'react-icons/bs'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { GiTakeMyMoney } from 'react-icons/gi';
import { CiCircleInfo } from 'react-icons/ci'
import { Form, Input, Select } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import '../index.css'
import axios from 'axios';
import Footer from '../components/footer';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { FcShipped } from "react-icons/fc";

const { TextArea } = Input;
const { Option } = Select

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    // height: 450,
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

const layout = {
    labelCol: {
        span: 8
    },
    wrapperCol: {
        span: 16
    }
};


function PlaceOrder() {
    const { cartNum, setCartNum } = useContext(CartContext)
    const { quanNum, setQuanNum } = useContext(QuanContext)
    const [clothCart, setClothCart] = useState([])
    const [itemDel, setItemDel] = useState(null)


    useEffect(() => {
        const savedCart = (JSON.parse(localStorage.getItem('cart')) || [])
        setClothCart(savedCart)
    }, [quanNum])

    const [user, setUser] = useState(null);

    const token = localStorage.getItem('token')

    useEffect(() => {
        const userData = async () => {
            if (token) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                try {
                    const response = await axios.post('http://localhost:3001/home/user', null, { headers });

                    if (response.status === 200) {
                        setUser(response.data.userData)
                    } else {
                        console.error('USER NOT FOUND:', response.data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        userData();
    }, [token]);

    let totalQuan = clothCart.map(v => v.qty).reduce((acc, qty) => acc + qty, 0)
    let totalPrice = clothCart.reduce((acc, qty) => acc + Number(qty.item.clothPrice) * Number(qty.qty), 0)


    const [loading, setLoading] = useState(null)



    const location = useLocation()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        navigate('/home');
        setQuanNum(0);
        setCartNum(0);
        setClothCart([]);
    };

    // useEffect(() => {
    //     const navigatePage = () => {
    //         clothCart.length === 0 ? navigate('/home') : ''
    //     }
    //     navigatePage()
    // }, [clothCart])

    const [orderStatus, setOrderStatus] = useState("")
    const [orderMessage, setOrderMessage] = useState("")
    const [orderID, setOrderID] = useState("")

    const onFinish = async (values) => {
        setLoading(true)
        const userToken = localStorage.getItem('token')

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

            if (placingOrder.data.status === 200) {
                setOrderStatus(placingOrder.data.orderDetails.status)
                setOrderMessage(placingOrder.data.orderDetails.message)
                setOrderID(placingOrder.data.orderDetails.orderID)
                setOpen(true)

                localStorage.removeItem('cart')
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setOrderMessage(error.message)
            setLoading(false)
        }
    };

    const handleContactUs = () => {
        const email = 'flexus@gmail.com';
        const subject = 'Regarding Order Inquiry';
        const body = '';

        const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(mailtoLink, '_blank');
    };

    const formRef = useRef(null);

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

    return (
        <>
            <Navbar />

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
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
                        <Button className='add-button' size='small' variant='contained' disableElevation onClick={handleClose}>
                            <span>
                                Continue shopping
                            </span>
                        </Button>
                        <p style={{ textAlign: 'center', color: 'black', margin: "4px 0" }}>For any queries, <span style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue' }} onClick={handleContactUs}>contact us</span>.</p>
                    </div>
                </Box>
            </Modal>

            <p className='disclaimer'>Delivery only available in <b style={{ marginLeft: 5 }}> KARACHI</b>, Pakistan</p>

            <div className='navs'>
                <NavLink className='navs-link' to={'/home'}>
                    Home { }
                </NavLink>
                / { }
                <NavLink className='navs-link' to={'/home/checkout'}>
                    Checkout { }
                </NavLink>
                / { }
                <NavLink className='navs-link' to={'/home/checkout/order'}>
                    Order { }
                </NavLink>
                /
            </div>

            <div className={`check-con`}>
                <h1 className='checkout-title'>CHECKOUT </h1>
                <p className='checkout-step'>2</p>
            </div>

            <div className='checkout-2-con'>
                {user ? <>
                    <div className='form-separator visible'></div>

                    <div className='checkout-details'>
                        <Form
                            ref={formRef}
                            // {...layout}
                            name="normal_login"
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
                                <h2>Contact:</h2>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", gap: "0.5rem", marginTop: -5, marginBottom: 15 }}>
                                <p style={{ color: "#9399a2", fontSize: 15, fontWeight: 500, margin: 0 }} >Enter your correct details.</p>
                                <CiCircleInfo />
                            </div>

                            <Form.Item
                                name="fullname"
                                label="Fullname"
                                // tooltip="Please enter your real name!"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your fullname!',
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
                                // {...layout}
                                className='form-dis'
                            >
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid Email!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your Email!',
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
                                            message: 'Please input your Mobile number!',
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
                                <h2>Delivery Address:</h2>
                            </div>

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: "flex-end", gap: "0.5rem", marginTop: -5, marginBottom: 15 }}>
                                    <p style={{ color: "#9399a2", fontSize: 15, fontWeight: 500, margin: 0 }} >Enter your current residential address.</p>
                                    <CiCircleInfo />
                                </div>

                                {/* <div className='form-dis'> */}
                                <Form.Item
                                    name="address"
                                    label="Residential Address"
                                    style={{
                                        flexGrow: 3
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your address!',
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
                                            message: 'Please input Postal code!',
                                        },
                                    ]}
                                >
                                    <Input
                                        size='large'
                                        placeholder='Postal Code'
                                        maxLength={5}
                                    />
                                </Form.Item>
                                {/* </div> */}

                            </div>


                            <div className='form-separator'></div>

                            {/* display: 'flex', alignItems: 'center', gap: '1rem', */}
                            <div style={{ marginBottom: 50 }}>
                                <div style={{ margin: 0 }} className='order-del-title'>
                                    <h2 >Payment Method:</h2>
                                </div>

                                <div>
                                    <p style={{ color: "#9399a2", fontSize: 15, fontWeight: 500, marginTop: 5, marginBottom: 15 }}>Only one method available.</p>
                                    <p className='cod-con'>
                                        <GiTakeMyMoney color='white' size={22} /> CASH ON DELIVERY
                                    </p>
                                </div>
                            </div>

                            <LoadingButton
                                type='primary'
                                loading={loading}
                                variant="contained"
                                size='small'
                                className={`form-button ${clothCart.length === 0 ? 'btn-disabled' : ''}`}
                            >
                                <span style={{ fontSize: 20 }}>
                                    PLACE ORDER
                                </span>
                            </LoadingButton>

                        </Form >
                    </div >

                    {/* <div className='form-separator'></div> */}

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
                                                avatar={
                                                    <div style={{ position: 'relative' }}>
                                                        <img
                                                            className='drawer-cart-img'
                                                            style={{
                                                                width: 100, height: 100
                                                            }}
                                                            src={`http://localhost:3001/images/${item.item.clothImg}`}
                                                        />
                                                        <div className='checkout-item-qty'>
                                                            {item.qty}
                                                        </div>
                                                    </div>
                                                }
                                                title={
                                                    <>
                                                        <div style={{ fontSize: 17, marginBottom: -10 }}>
                                                            {item.item.clothTitle}
                                                        </div>

                                                        {/* <div className='checkout-item-qty'>
                                                        {item.qty}
                                                    </div> */}
                                                    </>
                                                }
                                                description={
                                                    <div className='desc-con'>
                                                        <div className='checkout-price'>
                                                            <span style={{ fontSize: 17, fontWeight: 500 }} >PKR </span>
                                                            {item.item.clothPrice * item.qty}
                                                        </div>
                                                        <div style={{ fontWeight: 600, fontSize: 17, margin: "-6px 0" }}>
                                                            {/* SIZE: */}
                                                            {item.size.toUpperCase()}
                                                        </div>
                                                        {/* <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            
                                                        </div> */}
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
                                <p>Subtotal </p>
                                <p>Delivery Fees </p>

                                <div className='form-separator' style={{ margin: '8px 0', background: '#9399a2' }}></div>

                                <p>Total </p>
                            </div>
                            <div>
                                <p>Rs. {totalPrice < 10 ? `0${totalPrice}` : totalPrice}/-</p>
                                <p>Rs. 80/-</p>

                                <div className='form-separator' style={{ margin: '8px auto', background: '#9399a2' }}></div>

                                <p style={{ fontSize: 24, fontWeight: 600 }}>
                                    Rs.
                                    {totalPrice < 10 ? `0${totalPrice + 80}` : totalPrice + 80}/-
                                </p>
                            </div>
                        </div>
                    </div>

                </>
                    :
                    <span className='loader' style={{ position: 'absolute', top: '50px', transform: 'translate(-50%, 50%)' }}></span>
                }
            </div >

            <Footer />

        </>
    )
}

export default PlaceOrder;