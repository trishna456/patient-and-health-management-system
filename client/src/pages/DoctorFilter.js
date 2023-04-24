import React, { useContext, useEffect, useRef } from 'react';
import DoctorContext from '../context/doctor/DoctorContext';

const DoctorFilter = () => {
  const doctorContext = useContext(DoctorContext);
  const text = useRef('');

  const { filterDoctors, clearFilter, filtered } = doctorContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = (e) => {
    if (text.current.value !== '') {
      filterDoctors(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Doctors...'
        onChange={onChange}
      />
    </form>
  );
};

export default DoctorFilter;
