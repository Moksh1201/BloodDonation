import axios from '../api/axios';

export const getDonors = () => {
  return axios.get('/donor/');
};

export const getDonorById = (id) => {
  return axios.get(`/donor/${id}`);
};

export const createDonor = (donor) => {
  return axios.post('/donor/', donor);
};

export const updateDonor = (id, donor) => {
  return axios.put(`/donor/${id}`, donor);
};

export const deleteDonor = (id) => {
  return axios.delete(`/donor/${id}`);
};
