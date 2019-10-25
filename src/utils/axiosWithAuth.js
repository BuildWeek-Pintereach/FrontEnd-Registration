// this is where I get the token from backend and put it in localstorage

import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'https://bw-backend.herokuapp.com',
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }
  });
};