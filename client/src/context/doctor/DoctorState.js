import React, { useReducer } from 'react';
import axios from 'axios';
import DoctorContext from './DoctorContext';
import doctorReducer from './DoctorReducer';
import {
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_DOCTORS,
  CLEAR_FILTER,
  GET_DOCTORS,
  CLEAR_DOCTORS,
} from '../types';

const DoctorState = (props) => {
  const initialState = {
    doctors: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(doctorReducer, initialState);

  // login user data
  const getDoctors = async () => {
    try {
      const res = await axios.get(
        '/api/v1/user/getAllDoctors',

        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );
      if (res.data.success) {
        dispatch({ type: GET_DOCTORS, payload: res.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // set current doctor
  const setCurrent = (doctor) => {
    dispatch({ type: SET_CURRENT, payload: doctor });
  };

  // clear current doctor
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //filter doctors
  const filterDoctors = (text) => {
    dispatch({ type: FILTER_DOCTORS, payload: text });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // clear doctors
  const clearDoctors = () => {
    dispatch({ type: CLEAR_DOCTORS });
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors: state.doctors,
        doctorBookings: state.doctorBookings,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        setCurrent,
        clearCurrent,
        filterDoctors,
        clearFilter,
        getDoctors,
        clearDoctors,
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorState;
