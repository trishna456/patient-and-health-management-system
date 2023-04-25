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

    //message.success('woohoo');
    navigate(`/doctor/book-appointment/${params.doctorId}`);
  };

  return (
    <Layout>
      {/* <div className='card mb-4 p-0 border-0 m-2'> */}
      <div className='card-body p-4'>
        <form onSubmit={handleSubmit} style={{ cursor: 'pointer' }}>
          <h2 className='card-title mb-3'>COVID-19 Questionnaire</h2>
          <div className='card-text mb-1'>
            <label htmlFor='hasFever'>
              Do you have a fever?{' '}
              <input
                id='hasFever'
                type='checkbox'
                checked={hasFever}
                onChange={(event) => setHasFever(event.target.checked)}
              />
            </label>
          </div>
          <div className='card-text mb-1'>
            <label htmlFor='hasCough'>
              Do you have a cough?{' '}
              <input
                id='hasCough'
                type='checkbox'
                checked={hasCough}
                onChange={(event) => setHasCough(event.target.checked)}
              />
            </label>
          </div>
          <div className='card-text mb-1'>
            <label htmlFor='hasBreathShortness'>
              Do you have shortness of breath?{' '}
              <input
                id='hasBreathShortness'
                type='checkbox'
                checked={hasBreathShortness}
                onChange={(event) =>
                  setHasBreathShortness(event.target.checked)
                }
              />
            </label>
          </div>
          <div className='card-text mb-1'>
            <label htmlFor='hasSoreThroat'>
              Do you have a sore throat?{' '}
              <input
                id='hasSoreThroat'
                type='checkbox'
                checked={hasSoreThroat}
                onChange={(event) => setHasSoreThroat(event.target.checked)}
              />
            </label>
          </div>
          <div className='card-text mb-1'>
            <label htmlFor='hasTasteLoss'>
              Have you lost your sense of taste?{' '}
              <input
                id='hasTasteLoss'
                type='checkbox'
                checked={hasTasteLoss}
                onChange={(event) => setHasTasteLoss(event.target.checked)}
              />
            </label>
          </div>
          <div className='card-text mb-1'>
            <label htmlFor='hasSmellLoss'>
              Have you lost your sense of smell?{' '}
              <input
                id='hasSmellLoss'
                type='checkbox'
                checked={hasSmellLoss}
                onChange={(event) => setHasSmellLoss(event.target.checked)}
              />
            </label>
          </div>
          <div className='card-text mb-1'>
            <label htmlFor='hasContactWithCovid'>
              Have you been in contact with anyone who has tested positive for
              COVID-19 in the last 14 days?{' '}
              <input
                id='hasContactWithCovid'
                type='checkbox'
                checked={hasContactWithCovid}
                onChange={(event) =>
                  setHasContactWithCovid(event.target.checked)
                }
              />
            </label>
          </div>
          <button className='btn btn-primary form-btn' type='submit'>
            Submit
          </button>
        </form>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default CovidQuestionnaire;
