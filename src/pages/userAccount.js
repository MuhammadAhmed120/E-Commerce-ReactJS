import Navbar from '../components/navbar';
import { List } from 'antd';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { RxCross2 } from 'react-icons/rx';
import React, { useEffect, useState, useContext } from 'react';
import CartContext from '../config/cartContext';
import QuanContext from '../config/quanContext';
import { BsArrowRight } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Form, Input, Select } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import '../index.css'
import axios from 'axios';
import Footer from '../components/footer';

const { TextArea } = Input;
const { Option } = Select

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: 'none',
    color: 'red',
    boxShadow: 2,
    p: 2.5,
    borderRadius: 1
};



// const handleEmailChange = (e) => {
//     setEmail(e.target.value);
// }
// const handleNameChange = (e) => {
//     setFullname(e.target.value);
// }


function UserAccount() {
    const BACKEND_PORT = 'http://localhost:3001'

    const [user, setUser] = useState(null)
    const [userOrders, setUserOrders] = useState(null)

    const { customerName, customerEmail, customerNumber, customerAddress, customerPostal } = user || {}

    const token = localStorage.getItem('token')

    const [loader, setLoader] = useState(null)
    const [loading, setLoading] = useState(null)

    useEffect(() => {
        const userData = async () => {
            setLoader(false)
            if (token) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                try {
                    const response = await axios.post(`${BACKEND_PORT}/home/user`, null, { headers });

                    if (response.status === 200) {
                        setUser(response.data.userData)
                        setUserOrders(response.data.userOrders)
                        setMobile(response.data.userData.customerNumber);
                        setAddress(response.data.userData.customerAddress)
                        setPostal(response.data.userData.customerPostal)
                        return setLoader(true)
                    } else {
                        console.error('USER NOT FOUND:', response.data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };
        userData();
    }, [token, loading]);



    const [mobileNum, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [postal, setPostal] = useState('');

    const handleNumberChange = (e) => {
        setMobile(e.target.value);
    }
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }
    const handlePostalChange = (e) => {
        setPostal(e.target.value);
    }

    const updateData = async () => {
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        if (mobileNum !== customerNumber || address !== customerAddress || postal !== customerPostal) {
            setLoading(true)
            const updatedData = {
                customerNumber: mobileNum.toString(),
                customerAddress: address,
                customerPostal: postal.toString()
            }

            try {
                const updatingData = await axios.put(`${BACKEND_PORT}/home/user`, updatedData, { headers });
                console.log(updatingData)
                if (updatingData.status === 200) {
                    // return setLoading(false)
                } else {
                    console.error('USER NOT FOUND:', updatingData.data);
                }
                return setLoading(false)
            } catch (error) {
                if (error.message === 'Network Error') {
                    console.log(error)
                } else {
                    console.log('error MESSAGE ===>', error)
                }
            }
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);


    return (
        <>
            <Navbar />

            <div className='navs'>
                <NavLink className='navs-link' to={'/home'}>
                    Home { }
                </NavLink>
                / { }
                <NavLink className='navs-link' to={'/home/user'}>
                    User { }
                </NavLink>
                /
            </div>

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <RxCross2 style={{ cursor: 'pointer', marginBottom: 15 }} color='black' size={19} onClick={handleClose} />
                    {user &&
                        <Form
                            scrollToFirstError={true}
                            layout='vertical'
                        >
                            <div className='form-dis'>
                                <Form.Item
                                    name="customerNumber"
                                    label="Mobile Number"
                                    layout='vertical'
                                    style={{
                                        flexGrow: 2
                                    }}
                                >
                                    <Input
                                        defaultValue={customerNumber}
                                        onChange={handleNumberChange}
                                        maxLength={11}
                                        minLength={11}
                                        size='large'
                                        style={{
                                            width: '100%',
                                        }}
                                        placeholder='Mobile Number'
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="customerPostal"
                                    label="Postal Code"
                                >
                                    <Input
                                        defaultValue={postal}
                                        onChange={handlePostalChange}
                                        size='large'
                                        placeholder='Postal Code'
                                        maxLength={5}
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item
                                name="customerAddress"
                                label="Residential Address"
                            >
                                <TextArea
                                    defaultValue={customerAddress}
                                    onChange={handleAddressChange}
                                    size='large'
                                    placeholder="Residential Address"
                                    autoSize={{
                                        minRows: 1,
                                        maxRows: 6,
                                    }}
                                />
                            </Form.Item>

                        </Form>
                    }
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem', fontSize: '15px', marginTop: '10px' }} >
                        <LoadingButton loading={loading} type='primary' variant='contained' disableElevation onClick={updateData}>
                            <span>
                                update
                            </span>
                        </LoadingButton>
                        <Button variant='contained' disableElevation onClick={handleClose}>
                            <span>
                                Close
                            </span>
                        </Button>
                    </div>
                </Box>
            </Modal >

            <div className={`check-con`}>
                <h1 className='checkout-title'>My Account </h1>
                {/* <p className='checkout-step'>2</p> */}
            </div>

            <div className='my-account-con'>
                {user !== null ? <>
                    <div className='account-det-con'>
                        <h2>Account Details:</h2>

                        <div className='account-con'>
                            <p style={{ margin: 0 }}>Name: {customerName}</p>
                            <p>Email: {customerEmail}</p>
                            <p>Phone No.: {customerNumber}</p>
                            <p>Address: {customerAddress && customerAddress.length > 0 ? customerAddress : `Not Found`}</p>
                            <p>Postal: {customerPostal && customerPostal.length >= 1 ? customerPostal : `Not Found`}</p>
                            <Button variant='contained' onClick={() => setOpen(true)}>
                                <span style={{ fontSize: 16 }}>
                                    {customerAddress && customerAddress.length > 0 ? `EDIT` : `ADD`} ADDRESS
                                </span>
                            </Button>
                        </div>

                    </div>
                    <div className='order-history-con'>
                        <h2>Order History:</h2>
                        <div className='account-con'>
                            <p style={{ margin: 0 }}>{userOrders ? `Total Orders: ${userOrders.length}` : `No Order History.`}</p>
                            {/* {userOrders && <Button variant='outlined'>
                            <span style={{ fontSize: 15 }}>
                                VIEW ALL
                            </span>
                        </Button>} */}
                        </div>
                    </div>
                </> :
                    <span className='loader' style={{ position: 'absolute', top: '50px', transform: 'translate(-50%, 50%)' }}></span>
                }
            </div >


            <Footer />
        </>
    )
}

export default UserAccount;





// const onFinish = async (values) => {
//     setLoading(true)
//     const userToken = localStorage.getItem('token')

//     try {
//         console.log('values --> ', values)

//         const updatedFields = {};
//         console.log(email)
//         if (values.customerEmail !== email) {
//             updatedFields.customerEmail = values.customerEmail;
//             console.log("email")
//         }
//         if (values.customerName !== fullname) {
//             updatedFields.customerName = values.customerName;
//         }
//         if (values.customerNumber !== mobileNum) {
//             updatedFields.customerNumber = values.customerNumber;
//         }
//         if (values.customerAddress !== address) {
//             updatedFields.customerAddress = values.customerAddress;
//         }
//         if (values.customerPostal !== postal) {
//             updatedFields.customerPostal = values.customerPostal;
//         }

//         console.log('updatedFields ---> ', updatedFields)

//         const headers = {
//             'Authorization': `Bearer ${userToken}`,
//             'Content-Type': 'application/json'
//         };


//         // const placingOrder = await axios.post('http://localhost:3001/home/checkout', customerOrderData, { headers })

//         // console.log('Status ~ ', placingOrder.data.orderStatus)

//         // if (placingOrder.data.status === 200) {
//         //     localStorage.removeItem('cart')
//         //     setTimeout(() => {
//         //         navigation('/home')
//         //     }, 1000);
//         // }
//         setLoading(false)
//     } catch (error) {
//         console.log(error)
//         setLoading(false)
//     }
// };



{/* <Form
    name="normal_login"
    className="detail-form"
    onFinish={onFinish}
    scrollToFirstError={true}
></Form> */}


// {
//     loader ?
//         <>
//             <Form.Item
//                 name="customerName"
//                 label="Fullname"
//                 // tooltip="Please enter your real name!"
//                 rules={[
//                     {
//                         // required: true,
//                         // message: 'Please input your fullname!',
//                         whitespace: true,
//                     },
//                 ]}
//             >
//                 <Input
//                     defaultValue={fullname}
//                     onChange={handleNameChange}
//                     size='large'
//                     disabled={inpDisabled}
//                     placeholder='Full Name'
//                 />
//             </Form.Item>

//             <Form.Item
//                 name="customerEmail"
//                 label="Email"
//                 rules={[
//                     {
//                         type: 'email',
//                         message: 'The input is not valid Email!',
//                     },
//                     // {
//                     //     required: true,
//                     //     message: 'Please input your Email!',
//                     // },
//                 ]}
//             >
//                 <Input
//                     defaultValue={email}
//                     onChange={handleEmailChange}
//                     size='large'
//                     disabled={inpDisabled}
//                     placeholder='Email'
//                 />
//             </Form.Item>


//             <Form.Item
//                 name="customerNumber"
//                 label="Mobile Number"
//                 // rules={[
//                 //     {
//                 //         required: true,
//                 //         message: 'Please input your Mobile number!',
//                 //     },
//                 // ]}
//                 validateTrigger="onBlur"
//             >
//                 <Input
//                     defaultValue={mobileNum}
//                     onChange={handleNumberChange}
//                     maxLength={11}
//                     minLength={11}
//                     disabled={inpDisabled}
//                     size='large'
//                     style={{
//                         width: '100%',
//                     }}
//                     placeholder='Mobile Number'
//                 />
//             </Form.Item>


//             {/* <div className='form-separator'></div> */}

//             <Form.Item
//                 name="customerAddress"
//                 label="Residential Address"
//             // rules={[
//             //     {
//             //         required: true,
//             //         message: 'Please input your address!',
//             //     },
//             // ]}
//             >
//                 <TextArea
//                     defaultValue={address}
//                     onChange={handleAddressChange}
//                     disabled={inpDisabled}
//                     size='large'
//                     placeholder="Residential Address"
//                     autoSize={{
//                         minRows: 1,
//                         maxRows: 6,
//                     }}
//                 />
//             </Form.Item>

//             {/* <Form.Item
//                     name="customerPostal"
//                     label="Postal Code"
//                 // rules={[
//                 //     {
//                 //         required: true,
//                 //         message: 'Please input Postal code!',
//                 //     },
//                 // ]}
//                 >
//                     <Input
//                         defaultValue={postal}
//                         onChange={handlePostalChange}
//                         disabled={inpDisabled}
//                         size='large'
//                         style={{
//                             width: 120,
//                         }}
//                         placeholder='Postal Code'
//                         maxLength={5}
//                     />
//                 </Form.Item>*/}
//             <div className='form-separator'></div>
//         </>
//         :
//         <>
//             <span className='loader'></span>
//             <span style={{ opacity: 0.5, pointerEvents: 'none' }}>
//                 <Form.Item
//                     name="customerName"
//                     label="Fullname"
//                 >
//                     <Input
//                         defaultValue={fullname}
//                         onChange={handleNameChange}
//                         size='large'
//                         disabled
//                         placeholder='Full Name'
//                     />
//                 </Form.Item>

//                 <Form.Item
//                     name="customerEmail"
//                     label="Email"
//                 >
//                     <Input
//                         defaultValue={email}
//                         onChange={handleEmailChange}
//                         size='large'
//                         disabled
//                         placeholder='Email'
//                     />
//                 </Form.Item>


//                 <Form.Item
//                     name="customerNumber"
//                     label="Mobile Number"
//                     validateTrigger="onBlur"
//                 >
//                     <Input
//                         defaultValue={mobileNum}
//                         onChange={handleNumberChange}
//                         maxLength={11}
//                         minLength={11}
//                         disabled
//                         size='large'
//                         style={{
//                             width: '100%',
//                         }}
//                         placeholder='Mobile Number'
//                     />
//                 </Form.Item>

//                 <Form.Item
//                     name="customerAddress"
//                     label="Residential Address"
//                 >
//                     <TextArea
//                         defaultValue={address}
//                         onChange={handleAddressChange}
//                         disabled
//                         size='large'
//                         placeholder="Residential Address"
//                         autoSize={{
//                             minRows: 1,
//                             maxRows: 6,
//                         }}
//                     />
//                 </Form.Item>

//                 {/* <Form.Item
//                         name="customerPostal"
//                         label="Postal Code"
//                     >
//                         <Input
//                             defaultValue={postal}
//                             onChange={handlePostalChange}
//                             disabled
//                             size='large'
//                             style={{
//                                 width: 120,
//                             }}
//                             placeholder='Postal Code'
//                             maxLength={5}
//                         />
//                     </Form.Item> */}
//             </span>
//             <div className='form-separator'></div>
//         </>
// }
// </Form >




// {
//     loader ?
//         <span
//             style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 gap: '1rem',
//                 flexGrow: 1,
//                 // flexWrap: 'wrap'
//             }}
//         >
//             <LoadingButton loading={loading} type='primary' variant="outlined" className="form-button" onClick={toggleEditMode}>
//                 {btnName}
//             </LoadingButton>
//             <LoadingButton loading={loading} type='warning' color="error" variant="contained" className="form-button">
//                 LOGOUT
//             </LoadingButton>
//         </span>
//         :
//         <LoadingButton style={{ opacity: 0.5, pointerEvents: 'none' }} loading={true} type='primary' variant="contained" className="form-button" onClick={toggleEditMode}>
//             {btnName}
//         </LoadingButton>
// }