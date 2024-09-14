// src/reducers/bloodDonationReducer.js
const initialState = {
  bloodDonations: [],
  loading: false,
  error: null,
};

const bloodDonationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BLOOD_DONATIONS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_BLOOD_DONATIONS_SUCCESS':
      return { ...state, loading: false, bloodDonations: action.payload };
    case 'FETCH_BLOOD_DONATIONS_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default bloodDonationReducer;
