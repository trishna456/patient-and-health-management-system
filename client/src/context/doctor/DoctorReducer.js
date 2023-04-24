import {
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_DOCTORS,
  CLEAR_FILTER,
  GET_DOCTORS,
  CLEAR_DOCTORS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case GET_DOCTORS:
      return {
        ...state,
        doctors: action.payload,
        loading: false,
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_DOCTORS:
      return {
        ...state,
        filtered: state.doctors.filter((doctor) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return (
            doctor.firstName.match(regex) ||
            doctor.lastName.match(regex) ||
            doctor.email.match(regex) ||
            doctor.specialization.match(regex) ||
            doctor.covidConsultation.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case CLEAR_DOCTORS:
      return {
        ...state,
        doctors: null,
        filtered: null,
        error: null,
        current: null,
      };
    default:
      return state;
  }
};
