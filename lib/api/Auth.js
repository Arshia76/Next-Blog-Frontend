import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const localLogin = async (userData) => {
  const { data } = await axios.post(
    `${URL}/auth/localLogin`,
    JSON.stringify(userData),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  axios.defaults.headers.common['Authorization'] = data;

  return data;
};

export const localRegister = async (userData) => {
  const { data } = await axios.post(
    `${URL}/auth/localRegister`,
    JSON.stringify(userData),
    {
      headers: {
        'content-type': 'application/json',
      },
    }
  );
  return data;
};
