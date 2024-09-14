export const fetchBloodDonations = () => async (dispatch) => {
    dispatch({ type: 'FETCH_BLOOD_DONATIONS_REQUEST' });
    try {
      const data = await fetchUsers();
      dispatch({ type: 'FETCH_BLOOD_DONATIONS_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_BLOOD_DONATIONS_ERROR', payload: error.message });
    }
  };