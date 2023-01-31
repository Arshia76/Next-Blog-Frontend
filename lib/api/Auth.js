import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const localLogin = async (userData) => {
  const { data } = await axios.post(
    `${URL}/auth/localLogin`,
    JSON.stringify(userData),
    {
      headers: {
        'content-type': 'application/json',
        'accept-encoding': '*',
        charset: 'utf-8',
      },
    }
  );

  return data;
};

export const localRegister = async (userData) => {
  const { data } = await axios.post(
    `${URL}/auth/localRegister`,
    JSON.stringify(userData),
    {
      headers: {
        'content-type': 'application/json',
        'accept-encoding': '*',
        charset: 'utf-8',
      },
    }
  );
  return data;
};
