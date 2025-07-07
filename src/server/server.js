// src/server/server.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const postData = async (endpoint, data) => {
  return await axios.post(`${BASE_URL}${endpoint}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getData = async (endpoint) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response.data;
};

export const deleteData = async (endpointWithId) => {
  return await axios.delete(`${BASE_URL}${endpointWithId}`);
};

export const putData = async (endpointWithId, data) => {
  return await axios.put(`${BASE_URL}${endpointWithId}`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
