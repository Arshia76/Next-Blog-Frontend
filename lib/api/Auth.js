import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const localLogin = async (userData) => {
  const { data } = await axios.post(`${URL}/auth/localLogin`, userData, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });

  return data;
};

export const localRegister = async (userData) => {
  const { data } = await axios.post(`${URL}/auth/localRegister`, userData, {
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
  });
  return data;
};
