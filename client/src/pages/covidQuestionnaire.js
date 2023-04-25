import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { message } from 'antd';

const CovidQuestionnaire = () => {
  const [hasFever, setHasFever] = useState(false);
  const [hasCough, setHasCough] = useState(false);
  const [hasBreathShortness, setHasBreathShortness] = useState(false);
  const [hasSoreThroat, setHasSoreThroat] = useState(false);
  const [hasTasteLoss, setHasTasteLoss] = useState(false);
  const [hasSmellLoss, setHasSmellLoss] = useState(false);
  const [hasContactWithCovid, setHasContactWithCovid] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  // // login user data
  // const getUserData = async () => {
  //   try {
  //     const res = await axios.post(
  //       '/api/v1/doctor/getDoctorById',
  //       { doctorId: params.doctorId },
  //       {
  //         headers: {
  //           Authorization: 'Bearer ' + localStorage.getItem('token'),
  //         },
  //       }
  //     );
  //     if (res.data.success) {
  //       setDoctors(res.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getUserData();
  //   //eslint-disable-next-line
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const covidFormData = {
      hasFever,
      hasCough,
      hasBreathShortness,
      hasSoreThroat,
      hasTasteLoss,
      hasSmellLoss,
      hasContactWithCovid,
    };
    //pass data to doctor
    console.log(covidFormData);
    message.success('woohoo');
    navigate(`/doctor/book-appointment/${params.doctorId}`);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h2>COVID-19 Questionnaire</h2>
        <div>
          <label htmlFor='hasFever'>
            Do you have a fever?
            <input
              id='hasFever'
              type='checkbox'
              checked={hasFever}
              onChange={(event) => setHasFever(event.target.checked)}
            />
          </label>
        </div>
        <div>
          <label htmlFor='hasCough'>
            Do you have a cough?
            <input
              id='hasCough'
              type='checkbox'
              checked={hasCough}
              onChange={(event) => setHasCough(event.target.checked)}
            />
          </label>
        </div>
        <div>
          <label htmlFor='hasBreathShortness'>
            Do you have shortness of breath?
            <input
              id='hasBreathShortness'
              type='checkbox'
              checked={hasBreathShortness}
              onChange={(event) => setHasBreathShortness(event.target.checked)}
            />
          </label>
        </div>
        <div>
          <label htmlFor='hasSoreThroat'>
            Do you have a sore throat?
            <input
              id='hasSoreThroat'
              type='checkbox'
              checked={hasSoreThroat}
              onChange={(event) => setHasSoreThroat(event.target.checked)}
            />
          </label>
        </div>
        <div>
          <label htmlFor='hasTasteLoss'>
            Have you lost your sense of taste?
            <input
              id='hasTasteLoss'
              type='checkbox'
              checked={hasTasteLoss}
              onChange={(event) => setHasTasteLoss(event.target.checked)}
            />
          </label>
        </div>
        <div>
          <label htmlFor='hasSmellLoss'>
            Have you lost your sense of smell?
            <input
              id='hasSmellLoss'
              type='checkbox'
              checked={hasSmellLoss}
              onChange={(event) => setHasSmellLoss(event.target.checked)}
            />
          </label>
        </div>
        <div>
          <label htmlFor='hasContactWithCovid'>
            Have you been in contact with anyone who has tested positive for
            COVID-19 in the last 14 days?
            <input
              id='hasContactWithCovid'
              type='checkbox'
              checked={hasContactWithCovid}
              onChange={(event) => setHasContactWithCovid(event.target.checked)}
            />
          </label>
        </div>
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </Layout>
  );
};

export default CovidQuestionnaire;
