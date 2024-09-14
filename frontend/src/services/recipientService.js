import axios from '../api/axios';

export const getRecipients = () => {
  return axios.get('/recipients');
};

export const getRecipientById = (id) => {
  return axios.get(`/recipients/${id}`);
};

export const createRecipient = (recipient) => {
  return axios.post('/recipients', recipient);
};

export const updateRecipient = (id, recipient) => {
  return axios.put(`/recipients/${id}`, recipient);
};

export const deleteRecipient = (id) => {
  return axios.delete(`/recipients/${id}`);
};
