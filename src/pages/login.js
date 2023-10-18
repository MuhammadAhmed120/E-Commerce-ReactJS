import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import { NavLink } from 'react-router-dom';
import { CiLock } from 'react-icons/ci'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from 'react-icons/rx';
import '../index.css'

import Navbar from '../components/navbar'
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    color: 'red',
    boxShadow: 2,
    p: 2.5,
};

const Login = () => {
    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const [error, setError] = useState("")

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        setLoading(true)
        console.log('working')
        try {
            const customerData = {
                customerEmail: values.email,
                customerPassword: values.password,
            }
            const loginCustomer = await axios.post('http://localhost:3001/login', customerData)
            console.log('loginCustomer.data---->', loginCustomer.data)
            setLoading(false)
            localStorage.setItem('UID', loginCustomer.data.token)

            const userUID = localStorage.getItem('UID')
            userUID && navigate('/home')
        } catch (error) {
            console.log(error)
            console.log('error MESSAGE ===>', error.response.data.message)
            setError(error.response.data.message)
            setOpen(true);
            setLoading(false)
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
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2" className='form-error-modal'>
                        <RxCross2 color='red' size={19} /> {error}
                    </Typography>
                    <Button style={{ float: 'right', fontFamily: 'Rajdhani', fontSize: '15px', marginTop: '10px' }} size='small' variant='contained' disableElevation onClick={handleClose}>
                        Close
                    </Button>
                </Box>
            </Modal>

            <Form
                name="normal_login"
                className="form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item>
                    <div className='form-name'>
                        <h2>Login</h2>
                        {/* <FaCircleUser size='25' color='#204dad' /> */}
                        <CiLock size='22' color='#204dad' />
                    </div>
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
                    <Input />
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
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <NavLink className="login-form-forgot" to={'/login'}>
                        Forgot password
                    </NavLink>
                </Form.Item>

                <Form.Item>
                    {/* <Button type="primary" htmlType="submit" className="form-button"> */}
                    <LoadingButton type='primary' loading={loading} variant="contained" className="form-button">
                        Login
                    </LoadingButton>
                    {/* </Button> */}

                    Or <NavLink to={'/'}>register now!</NavLink>
                </Form.Item>
            </Form>
        </>
    );
};

export default Login;