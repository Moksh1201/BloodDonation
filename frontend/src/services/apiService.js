// src/services/apiService.js
const API_BASE_URL = 'http://localhost:5000/';

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('username:password') // Update this with actual auth details
    }
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
