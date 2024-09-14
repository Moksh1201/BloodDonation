import React, { useState, useEffect } from 'react';
import './Donor.css';
import { getDonors, getDonorById, createDonor, updateDonor, deleteDonor } from '../services/donorService';

const Donor = () => {
  const [donors, setDonors] = useState([]);
  const [donor, setDonor] = useState(null);
  const [formData, setFormData] = useState({ id: '', name: '', bloodType: '', location: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    const response = await getDonors();
    setDonors(response.data);
  };

  const handleCreate = async () => {
    await createDonor(formData);
    fetchDonors();
    resetForm();
  };

  const handleUpdate = async () => {
    await updateDonor(selectedId, formData);
    fetchDonors();
    resetForm();
    setIsUpdating(false);
  };

  const handleDelete = async (id) => {
    await deleteDonor(id);
    fetchDonors();
  };

  const resetForm = () => {
    setFormData({ id: '', name: '', bloodType: '', location: '' });
    setSelectedId(null);
  };

  const startUpdate = (donor) => {
    setFormData(donor);
    setSelectedId(donor.id);
    setIsUpdating(true);
  };

  return (
    <div className="donor-container">
      <div className="sidebar">
        <h2>Donor Management</h2>
        <ul>
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Donors</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
      </div>
      <div className="main-content">
        <div className="top-section">
          <h1>Donor Information</h1>
          <button className="button" onClick={() => setIsCreating(true)}>Add Donor</button>
        </div>

        {isCreating || isUpdating ? (
          <div className="donor-form">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Blood Type"
              value={formData.bloodType}
              onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
            />
            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
            <button onClick={isUpdating ? handleUpdate : handleCreate}>
              {isUpdating ? 'Update Donor' : 'Create Donor'}
            </button>
          </div>
        ) : null}

        <table className="donor-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood Type</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.name}</td>
                <td>{donor.bloodType}</td>
                <td>{donor.location}</td>
                <td>
                  <button onClick={() => startUpdate(donor)}>Edit</button>
                  <button onClick={() => handleDelete(donor.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donor;
