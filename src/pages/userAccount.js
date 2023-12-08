import Navbar from '../components/navbar';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { RxCross2 } from 'react-icons/rx';
import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { Form, Input, Select } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import '../index.css'
import axios from 'axios';
import Footer from '../components/footer';

const { TextArea } = Input;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    width: 700,
    bgcolor: 'background.paper',
    border: 'none',
    color: 'red',
    boxShadow: 2,
    p: 2.5,
    borderRadius: 1
};

function UserAccount() {
    const { REACT_APP_BACKEND_PORT } = process.env

    const [user, setUser] = useState(null)
    const [userOrders, setUserOrders] = useState(null)
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [loader, setLoader] = useState(null)
    const [loading, setLoading] = useState(null)
    const [mobileNum, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [postal, setPostal] = useState('');
    const token = localStorage.getItem('token')
    const { customerName, customerEmail, customerNumber, customerAddress, customerPostal } = user || {}

    useEffect(() => {
        const userData = async () => {
            setLoader(false)
            if (token) {
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                try {
                    const response = await axios.post(`${REACT_APP_BACKEND_PORT}/home/user`, null, { headers });

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
                const updatingData = await axios.put(`${REACT_APP_BACKEND_PORT}/home/user`, updatedData, { headers });
                console.log(updatingData)
                if (updatingData.status === 200) {
                    handleClose()
                    return setLoading(false)
                } else {
                    console.error('USER NOT FOUND:', updatingData.data);
                }
                return setLoading(false)
            } catch (error) {
                if (error.message === 'Network Error') {
                    console.log(error)
                    setLoading(false)
                } else {
                    console.log('error MESSAGE ===>', error)
                    setLoading(false)
                }
            }
        }
    }

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
                                        minLength={5}
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
                    <div className='account-modal-btn'>
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