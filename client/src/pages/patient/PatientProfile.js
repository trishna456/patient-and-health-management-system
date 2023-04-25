import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Form, Input, Row, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/features/alertSlice';
import { DatePicker } from 'antd';
import moment from 'moment';

const PatientProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [patient, setPatient] = useState(null);
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // update doc ==========
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        '/api/v1/patient/updateProfile',
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate('/');
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something Went Wrrong ');
    }
  };
  // update doc ==========

  //getDOc Details
  const getPatientInfo = async () => {
    try {
      const res = await axios.post(
        '/api/v1/patient/getPatientInfo',
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        setPatient(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPatientInfo();
    console.log(patient);
    console.log(user);

    if (user && user._id === params.id) {
      setPatient(user);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 style={{ textAlign: 'center' }}>Manage Patient Profile </h1>
      {patient && (
        <Form
          layout='vertical'
          onFinish={handleFinish}
          className='m-3'
          initialValues={{
            ...patient,
          }}
        >
          <h4 className=''>Personal Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label='First Name'
                name='name'
                required
                rules={[{ required: true }]}
              >
                <Input type='text' placeholder='First Name' />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label='Last Name'
                name='lastName'
                required
                rules={[{ required: true }]}
              >
                <Input type='text' placeholder='Last Name' />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label='Phone No'
                name='phone'
                required
                rules={[{ required: true }]}
              >
                <Input type='text' placeholder='Contact Number' />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label='Email'
                name='email'
                required
                rules={[{ required: true }]}
              >
                <Input type='email' placeholder='Email Address' />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label='Date Of Birth'
                name='dob'
                required
                rules={[{ required: true }]}
              >
                <DatePicker
                  aria-required={'true'}
                  className='mb-3'
                  format='DD-MM-YYYY'
                  onChange={(value) => {
                    setDate(moment(value).format('DD-MM-YYYY'));
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <h4>Medical History Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label='Height'
                name='height'
                required
                rules={[{ required: true }]}
              >
                <Input type='text' placeholder='Height' />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label='Weight'
                name='weight'
                required
                rules={[{ required: true }]}
              >
                <Input type='text' placeholder='Weight' />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label='Blood Type'
                name='bloodType'
                required
                rules={[{ required: true }]}
              >
                <select name='bloodType' id='bloodType'>
                  <option value='A+ve'>A+</option>
                  <option value='A-ve'>A-</option>
                  <option value='B+ve'>B+</option>
                  <option value='B-ve'>B-</option> 
                  <option value='AB+ve'>AB+</option> 
                  <option value='AB-ve'>AB-</option> 
                  <option value='O+ve'>O+</option> 
                  <option value='O-ve'>O-</option> 
                </select>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Allergies' name='allergies'>
                <Input type='text' placeholder='Allergies' />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label='Premedications'
                name='premedications'
                required
                rules={[{ required: true }]}
              >
                <Input type='text' placeholder='Premedications' />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              {/* <Form.Item
                  label='Do you Smoke? '
                  name='smoking'
                  required
                  rules={[{ required: true }]}
                > */}

              <div>
                <label htmlFor='smoking'>
                  Do you Smoke?{' '}
                  <input
                    id='smoking'
                    type='checkbox'
                    //checked={smoking}
                    //onChange={(event) => setHasFever(event.target.checked)}
                  />
                </label>
              </div>
              {/* </Form.Item> */}
            </Col>
          </Row>

          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className='btn btn-primary form-btn' type='submit'>
              Update
            </button>
          </Col>
        </Form>
      )}
    </Layout>
  );
};

export default PatientProfile;
