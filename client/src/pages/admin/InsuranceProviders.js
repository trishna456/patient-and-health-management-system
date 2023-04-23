import React, { useState, useEffect } from 'react';
import Layout from './../../components/Layout';
import axios from 'axios';
import { message, Table } from 'antd';

const InsuranceProviders = () => {
  const [insuranceProviders, setInsuranceProviders] = useState([]);
  //getUsers
  const getInsuranceProviders = async () => {
    try {
      const res = await axios.get('/api/v1/admin/getAllInsuranceProviders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setInsuranceProviders(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/v1/admin/changeInsuranceProviderAccountStatus',
        {
          insuranceProviderId: record._id,
          userId: record.userId,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error('Something Went Wrong');
    }
  };

  useEffect(() => {
    getInsuranceProviders();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='d-flex'>
          {record.status === 'pending' ? (
            <button
              className='btn btn-success'
              onClick={() => handleAccountStatus(record, 'approved')}
            >
              Approve
            </button>
          ) : (
            <button className='btn btn-danger'>Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className='text-center m-3'>All Insurance Providers</h1>
      <Table columns={columns} dataSource={insuranceProviders} />
    </Layout>
  );
};

export default InsuranceProviders;
