import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import { NavLink, useNavigate } from 'react-router-dom';
import { CiLock } from 'react-icons/ci'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navbar from '../components/navbar'
import '../index.css'

import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    color: 'red',
    boxShadow: 2,
    p: 2.5,
    borderRadius: 1
};

const Register = () => {
    const { REACT_APP_BACKEND_PORT } = process.env

    const [loading, setLoading] = useState(null)
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
    const navigate = useNavigate()

    const [error, setError] = useState("")

    useEffect(() => {
        const navigatePage = () => {
            const token = localStorage.getItem('token')
            const UID = localStorage.getItem('UID')
            if (token && UID) {
                navigate('/home')
            }
        }
        navigatePage()
    }, [])

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const customerData = {
                customerName: values.fullname,
                customerEmail: values.email,
                customerPassword: values.password,
                repeatPassword: values.confirm,
                customerNumber: values.phone
            }
            const registerCustomer = await axios.post(`${REACT_APP_BACKEND_PORT}/`, customerData)
            setLoading(false)
            localStorage.setItem('token', registerCustomer.data.token)
            localStorage.setItem('UID', registerCustomer.data.user._id)

            const userToken = localStorage.getItem('token')
            userToken && navigate(-1)
        } catch (error) {
            if (error.message === 'Network Error') {
                console.log(error)
                setError(error.message)
                setOpen(true);
                setLoading(false)
            } else {
                console.log('error MESSAGE ===>', error)
                setError(error.response.data.errorMsg)
                setOpen(true);
                setLoading(false)
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
                    <Typography id="keep-mounted-modal-title" variant="a" component="a" className='form-error-modal' style={{ cursor: 'pointer' }} onClick={handleClose}>
                        {error}
                    </Typography>
                    <Button className='modal-error-close' variant='contained' disableElevation onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Modal>

            <Form
                name="normal_register"
                className="form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                scrollToFirstError={true}
                requiredMark={false}
                layout='vertical'
            >
                <Form.Item>
                    <div className='form-name'>
                        <h2>Register</h2>
                        <CiLock size='24' color='#204dad' />
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
                    <Input size='large' placeholder='Full Name' />
                </Form.Item>

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
                    hasFeedback
                >
                    <Input className='custom-input' size='large' placeholder='Email' />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password size='large' placeholder='Password' minLength={6} />
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
                >
                    <Input
                        maxLength={11}
                        minLength={11}
                        size='large'
                        showCount={false}
                        style={{
                            width: '100%',
                        }}
                        placeholder='Mobile Number'
                    />
                </Form.Item>

                <Form.Item>
                    <LoadingButton type='primary' loading={loading} variant="contained" className="form-button">
                        <span style={{ fontSize: 17 }}>
                            Register
                        </span>
                    </LoadingButton>
                    Or <NavLink to={'/login'}>login now!</NavLink>
                </Form.Item>
            </Form >
        </>
    );
};

export default Register;