// src/components/BloodDonationList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../services/apiService'; 

const BloodDonationList = () => {
  const dispatch = useDispatch();
  const bloodDonations = useSelector((state) => state.bloodDonation.bloodDonations);
  const loading = useSelector((state) => state.bloodDonation.loading);
  const error = useSelector((state) => state.bloodDonation.error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers();
        dispatch({ type: 'FETCH_BLOOD_DONATIONS_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_BLOOD_DONATIONS_ERROR', payload: err.message });
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="blood-donation-list">
      <h1>Blood Donations</h1>
      {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : (
        <ul>
          {bloodDonations.map((donation) => (
            <li key={donation.id}>
              <p>Donor ID: {donation.donorid}</p>
              <p>Blood Type: {donation.bloodtype}</p>
              <p>Location: {donation.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BloodDonationList;
