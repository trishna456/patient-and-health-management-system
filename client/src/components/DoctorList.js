import React from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div className='card mb-4 p-0 border-0 m-2'>
      <div
        className='card-body p-4'
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/doctor/covidQuestionnaire/${doctor._id}`)} //navigate(`/doctor/book-appointment/${doctor._id}`)
      >
        <h5 className='card-title mb-3'>
          Dr. {doctor.firstName} {doctor.lastName}
        </h5>
        <p className='card-text mb-1'>
          <b>Specialization:</b> {doctor.specialization}
        </p>
        <p className='card-text mb-1'>
          <b>Covid Consultation:</b> {doctor.covidConsultation}
        </p>
        <p className='card-text mb-1'>
          <b>Experience:</b> {doctor.experience} years
        </p>
        <p className='card-text mb-1'>
          <b>Fees Per Consultation:</b> ${doctor.feesPerCunsaltation}
        </p>
        <p className='card-text mb-0'>
          <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
        </p>
        <button
          className='btn btn-primary mt-3'
          //onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
          onClick={() => {
            navigate(`/doctor/covidQuestionnaire/${doctor._id}`);
          }}
        >
          Book an Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorList;
