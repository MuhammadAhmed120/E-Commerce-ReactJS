import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import { NavLink } from 'react-router-dom';
import { CiLock } from 'react-icons/ci'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { CiCircleInfo } from 'react-icons/ci'
import { TbLockOpenOff } from "react-icons/tb";
import { useNavigate, useHistory } from 'react-router-dom';
import '../index.css'

import Navbar from '../components/navbar'
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    width: 400,
    backgroundColor: 'background.paper',
    border: 'none',
    color: 'black',
    boxShadow: 2,
    p: 2.5,
    borderRadius: 1
};

const Login = () => {
    const { REACT_APP_BACKEND_PORT } = process.env

    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

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
                customerEmail: values.email,
                customerPassword: values.password,
            }
            const loginCustomer = await axios.post(`${REACT_APP_BACKEND_PORT}/login`, customerData)
            setLoading(false)
            localStorage.setItem('token', loginCustomer.data.token)
            localStorage.setItem('UID', loginCustomer.data.user._id)

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
                setError(error.response.data.message)
                setOpen(true);
                setLoading(false)
            }
        }
    };

    const forgotPassword = () => {
        setError("")
        setOpen(true)
    }

    const [forgotLoad, setForgotLoad] = useState(null)

    const handleResetPass = async (values) => {
        setForgotLoad(true)
        try {
            const customerData = {
                customerEmail: values.customerEmail,
            }
            const resetPasswordLink = await axios.post(`${REACT_APP_BACKEND_PORT}/password/forgot`, customerData)
            console.log(resetPasswordLink)
            setError('Reset email sent successfully.')
            setOpen(true);
            setForgotLoad(false)
            setTimeout(() => {
                setOpen(false);
            }, 10000);
        } catch (error) {
            if (error.message === 'Network Error') {
                console.log(error)
                setError(error.message)
                setOpen(true);
                setForgotLoad(false)
            } else {
                console.log('error MESSAGE ===>', error)
                setError(error.response.data.message)
                setOpen(true);
                setForgotLoad(false)
            }
        }
    }

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
                    {error.length >= 1 ?
                        <>
                            <div style={{ textAlign: 'center', padding: 10 }}>
                                <TbLockOpenOff size={27} />
                            </div>
                            <p style={{ fontSize: 21, margin: 0, textAlign: 'center' }}>
                                {error}
                            </p>
                            <Button className='modal-error-close' variant='contained' disableElevation onClick={handleClose}>
                                Close
                            </Button>
                        </>
                        :
                        <div>
                            <p
                                style={{
                                    fontSize: 14,
                                    marginTop: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap'
                                }}
                            >
                                <CiCircleInfo size={18} />
                                <span>Reset link will be sent to the following email address.
                                </span>
                            </p>

                            <Form
                                name="reset_pass"
                                initialValues={{ remember: true }}
                                onFinish={handleResetPass}
                                requiredMark={false}
                            >

                                <Form.Item
                                    name="customerEmail"
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
                                    <Input size='large' placeholder='Email' />
                                </Form.Item>

                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }} >
                                    <Form.Item style={{ margin: 0 }}>
                                        <LoadingButton loading={forgotLoad} type='primary' variant='contained' disableElevation>
                                            <span>
                                                confirm
                                            </span>
                                        </LoadingButton>
                                    </Form.Item>

                                    <Button variant='contained' disableElevation onClick={handleClose}>
                                        <span>
                                            Close
                                        </span>
                                    </Button>
                                </div>
                            </Form>
                        </div>}
                </Box>
            </Modal >

            <Form
                name="normal_login"
                className="form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                requiredMark={false}
                layout='vertical'
            >
                <Form.Item>
                    <div className='form-name'>
                        <h2>Login</h2>
                        <CiLock size='24' color='#204dad' />
                    </div>
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
                    <Input size='large' placeholder='Email' />
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
                    <Input.Password size='large' placeholder='Password' />
                </Form.Item>

                <Form.Item>
                    <NavLink className="login-form-forgot" onClick={forgotPassword}>
                        Forgot password
                    </NavLink>
                </Form.Item>

                <Form.Item size='large'>
                    <LoadingButton type='primary' loading={loading} variant="contained" className="form-button">
                        <span style={{ fontSize: 17 }}>
                            Login
                        </span>
                    </LoadingButton>

                    Or <NavLink to={'/'}>register now!</NavLink>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;