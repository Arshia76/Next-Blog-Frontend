import axios from 'axios';
import { getToken } from '../utils/getToken';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllPosts = async () => {
  const { data } = await axios.get(`${URL}/posts`);
  return data;
};

export const getPostDetail = async (postId) => {
  const { data } = await axios.get(`${URL}/posts/${postId}`);
  return data;
};

export const getPostsOfCategory = async (categoryId) => {
  const { data } = await axios.get(`${URL}/posts/category/${categoryId}`);
  return data;
};

export const getPostsOfUser = async () => {
  const token = await getToken();
  const { data } = await axios.get(`${URL}/posts/user/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getBokmarkedPostsOfUser = async () => {
  const token = await getToken();
  const { data } = await axios.get(`${URL}/posts/user/bookmarked/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const searchPosts = async (postTitle) => {
  const { data } = await axios.get(`${URL}/posts/search/${postTitle}`);
  return data;
};

export const createPost = async (postData) => {
  const token = await getToken();
  const { data } = await axios.post(`${URL}/posts/create`, postData, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updatePost = async (postId, postData) => {
  const token = await getToken();
  const { data } = await axios.patch(
    `${URL}/posts/update/post/${postId}`,
    postData,
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const deletePost = async (postId) => {
  const token = await getToken();
  const { data } = await axios.delete(`${URL}/posts/delete/post/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const handleBookmarkPost = async (postId) => {
  const token = await getToken();
  const { data } = await axios.patch(
    `${URL}/posts/handle/bookmark/post/${postId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const handleLikePost = async (postId) => {
  const token = await getToken();
  const { data } = await axios.patch(
    `${URL}/posts/handle/like/${postId}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const commentPost = async ([postId, title]) => {
  const token = await getToken();
  const { data } = await axios.post(
    `${URL}/posts/comment/${postId}`,
    JSON.stringify(title),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const uploadPostImage = async (postImage) => {
  const token = await getToken();
  const { data } = await axios.post(
    `${URL}/posts/upload/postImage`,
    postImage,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
