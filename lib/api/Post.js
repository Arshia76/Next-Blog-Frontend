import axios from 'axios';
import { getToken } from '../utils/getToken';

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllPosts = async (
  category = '',
  search = '',
  page = 1,
  take = 4
) => {
  const { data } = await axios.get(
    `${URL}/posts?${category && `category=${category}`}&${
      search && `search=${search}`
    }&take=${take}&page=${page}`
  );
  return data;
};

export const getPostDetail = async (postId) => {
  const { data } = await axios.get(`${URL}/posts/${postId}`);
  return data;
};

export const getPostsOfUser = async (page = 1, take = 4) => {
  const token = await getToken();
  const { data } = await axios.get(
    `${URL}/posts/user/posts?take=${take}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getBokmarkedPostsOfUser = async (page = 1, take = 4) => {
  const token = await getToken();
  const { data } = await axios.get(
    `${URL}/posts/user/bookmarked/posts?take=${take}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const createPost = async (postData) => {
  const token = await getToken();
  const { data } = await axios.post(`${URL}/posts/create/post`, postData, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updatePost = async ([postId, postData]) => {
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

export const updatePostImage = async ([postId, postImage]) => {
  const token = await getToken();
  const { data } = await axios.patch(
    `${URL}/posts/update/postImage/${postId}`,
    postImage,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
