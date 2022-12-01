import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllCategories = async () => {
  const { data } = await axios.get(`${URL}/categories`);
  return data;
};
