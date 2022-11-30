import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getCurrentUser = async () => {
  const { data } = await axios.get(`${URL}/users/me`, {
    headers: {
      Authorization: 'some key',
    },
  });

  return data;
};

export const updateUser = async (userId, userData) => {
  const { data } = await axios.patch(
    `${URL}/users/update/${userId}`,
    userData,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'some key',
      },
    }
  );

  return data;
};
