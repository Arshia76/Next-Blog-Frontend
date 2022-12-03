import axios from 'axios';
import { getToken } from '../utils/getToken';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getCurrentUser = async () => {
  const token = await getToken();
  const { data } = await axios.get(`${URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const updateUser = async (userData) => {
  const token = await getToken();
  const { data } = await axios.patch(`${URL}/users/update`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const changePassword = async (userData) => {
  const token = await getToken();
  const { data } = await axios.patch(`${URL}/users/changePassword`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
