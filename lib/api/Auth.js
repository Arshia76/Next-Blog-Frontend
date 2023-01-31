import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const localLogin = async (userData) => {
  const { data } = await axios.post(`${URL}/auth/localLogin`, userData);

  return data;
};

export const localRegister = async (userData) => {
  const { data } = await axios.post(`${URL}/auth/localRegister`, userData);
  return data;
};
