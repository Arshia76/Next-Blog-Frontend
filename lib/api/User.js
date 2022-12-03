import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getCurrentUser = async () => {
  const { data } = await axios.get(`${URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('next-blog-token')}`,
    },
  });

  return data;
};

export const updateUser = async (userData) => {
  const { data } = await axios.patch(`${URL}/users/update`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('next-blog-token')}`,
    },
  });

  return data;
};

export const changePassword = async (userData) => {
  const { data } = await axios.patch(`${URL}/users/changePassword`, userData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('next-blog-token')}`,
    },
  });

  return data;
};
