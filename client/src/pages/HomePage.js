import React, { useEffect, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Layout from './../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';
import DoctorContext from '../context/doctor/DoctorContext';
import DoctorFilter from './DoctorFilter';
const HomePage = () => {
  const doctorContext = useContext(DoctorContext);

  const { doctors, filtered, getDoctors, loading } = doctorContext;

  useEffect(() => {
    getDoctors();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1 className='text-center'>Home Page</h1>
      <DoctorFilter />

      {doctors !== null && !loading && (
        <TransitionGroup>
          <Row>
            {filtered !== null
              ? filtered.map((doctor) => (
                  <CSSTransition
                    key={doctor._id}
                    timeout={500}
                    classNames='item'
                  >
                    <DoctorList doctor={doctor} />
                  </CSSTransition>
                ))
              : doctors.map((doctor) => (
                  <CSSTransition
                    key={doctor._id}
                    timeout={500}
                    classNames='item'
                  >
                    <Row>
                      <DoctorList doctor={doctor} />
                    </Row>
                  </CSSTransition>
                ))}
          </Row>
        </TransitionGroup>
      )}
    </Layout>
  );
};

export default HomePage;
