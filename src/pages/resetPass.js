import React, { useState } from 'react';
import { Form, Input } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import { useParams } from 'react-router-dom';
import { CiLock } from 'react-icons/ci'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TbLockOpenOff } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
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

const ResetPass = () => {
    const { REACT_APP_BACKEND_PORT } = process.env

    const [loading, setLoading] = useState(null)
    const navigate = useNavigate()
    const { token } = useParams()

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        navigate('/login')
        setOpen(false)
    };

    const [msg, setMsg] = useState("")

    const onFinish = async (values) => {
        setLoading(true)
        console.log(values)
        try {
            const customerData = {
                newPassword: values.password,
            }
            const passwordChange = await axios.post(`${REACT_APP_BACKEND_PORT}/password/reset/${token}`, customerData)
            console.log(passwordChange)
            setMsg(passwordChange.data.message)
            setOpen(true);
            setLoading(false)
        } catch (error) {
            if (error.message === 'Network Error') {
                console.log(error)
                setMsg(error.message)
                setOpen(true);
                setLoading(false)
            } else {
                console.log('error MESSAGE ===>', error)
                setMsg(error.response.data.message)
                setOpen(true);
                setLoading(false)
            }
        }
        setTimeout(() => {
            setLoading(false)
        }, 10000);
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
                    {/* {msg.length >= 1 ? */}
                    <>
                        <div style={{ textAlign: 'center', padding: 10 }}>
                            <TbLockOpenOff size={27} />
                        </div>
                        <p style={{ fontSize: 21, margin: 0 }}>
                            {msg}
                        </p>
                        <Button style={{ float: 'right', fontFamily: 'Rajdhani', fontSize: '15px', marginTop: '15px' }} variant='contained' disableElevation onClick={handleClose}>
                            Close
                        </Button>
                    </>
                    {/* :
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
                                <span>
                                    Password reset successful.
                                </span>
                            </p>
                            <Button style={{ float: 'right', fontFamily: 'Rajdhani', fontSize: '15px', marginTop: '15px' }} variant='contained' disableElevation onClick={handleClose}>
                                LOGIN
                            </Button>
                        </div>} */}
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
                        <h2>Reset Password</h2>
                        <CiLock size='24' color='#204dad' />
                    </div>
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Password doesnot match!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password size='large' placeholder='Password' />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password size='large' placeholder='Confirm password' />
                </Form.Item>

                <Form.Item>
                    <LoadingButton type='primary' loading={loading} variant="contained" className="form-button">
                        <span style={{ fontSize: 17 }}>
                            confirm password
                        </span>
                    </LoadingButton>
                </Form.Item>
            </Form>
        </>
    );
};

export default ResetPass;