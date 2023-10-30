import React, { useState } from 'react';
import {  Checkbox, Form, Input, Select } from 'antd';
import LoadingButton from '@mui/lab/LoadingButton';
import { NavLink, useNavigate } from 'react-router-dom';
import { CiLock } from 'react-icons/ci'
import '../index.css'

import Navbar from '../components/navbar'

import axios from 'axios';

const { Option } = Select

const Register = () => {
    const [loading, setLoading] = useState(null)

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

            <Form
                name="normal_login"
                className="form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                scrollToFirstError={true}
            >

                <Form.Item>
                    <div className='form-name'>
                        <h2>Register</h2>
                        <CiLock size='22' color='#204dad' />
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

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
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
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[
                        {
                            required: false,
                            message: 'Please input your phone number!',
                        },
                    ]}
                    validateTrigger="onBlur"
                    help={
                        <p style={{ float: 'right', margin: '4px 0' }}>(Optional)</p>
                    }
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

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                </Form.Item>

                <Form.Item>

                    <LoadingButton type='primary' loading={loading} variant="contained" className="form-button">
                        Register
                    </LoadingButton>
                    Or <NavLink to={'/login'}>login now!</NavLink>
                </Form.Item>
            </Form >
        </>
    );
};

export default Register;