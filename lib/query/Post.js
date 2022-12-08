import { useQuery, useMutation } from 'react-query';
import {
  commentPost,
  getAllPosts,
  getBokmarkedPostsOfUser,
  getPostDetail,
  updatePost,
  uploadPostImage,
  createPost,
  deletePost,
  getPostsOfUser,
  handleLikePost,
  handleBookmarkPost,
  updatePostImage,
} from '../api/Post';
import * as keys from './keys';

export function useGetAllPosts({
  initialData,
  category,
  search,
  take,
  page,
  onSuccess,
  onError,
}) {
  return useQuery(
    [keys.GET_ALL_POSTS, category, search, take, page],
    () => getAllPosts(category, search, page, take),
    {
      initialData,
      enabled: false,
      onSuccess,
      onError,
      refetchOnWindowFocus: false,
    }
  );
}

export function useGetPostDetail(postId, initialData, onSuccess, onError) {
  return useQuery([keys.GET_POST_DETAIL, postId], () => getPostDetail(postId), {
    initialData,
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });
}

export function useGetBookmarkedPostsOfUser({
  take,
  page,
  onSuccess,
  onError,
}) {
  return useQuery(
    keys.GET_BOOKMARKED_POSTS_OF_USER,
    () => getBokmarkedPostsOfUser(page, take),
    {
      onSuccess,
      onError,
      enabled: false,
    }
  );
}

export function useGetPostsOfUser({ take, page, onSuccess, onError }) {
  return useQuery(keys.GET_POSTS_OF_USER, () => getPostsOfUser(page, take), {
    onSuccess,
    onError,
    enabled: false,
  });
}

export function useCreatePost(onSuccess, onError) {
  return useMutation(createPost, {
    onSuccess,
    onError,
  });
}

export function useUpdatePost(onSuccess, onError) {
  return useMutation(updatePost, {
    onSuccess,
    onError,
  });
}

export function useDeletePost(onSuccess, onError) {
  return useMutation(deletePost, {
    onSuccess,
    onError,
  });
}

export function useHandleLikePost(onSuccess, onError) {
  return useMutation(handleLikePost, {
    onSuccess,
    onError,
  });
}

export function useHandleBookmarkPost(onSuccess, onError) {
  return useMutation(handleBookmarkPost, {
    onSuccess,
    onError,
  });
}

export function useCommentPost(onSuccess, onError) {
  return useMutation(commentPost, {
    onSuccess,
    onError,
  });
}

export function useUploadPostImage(onSuccess, onError) {
  return useMutation(uploadPostImage, {
    onSuccess,
    onError,
  });
}

export function useUpdatePostImage(onSuccess, onError) {
  return useMutation(updatePostImage, {
    onSuccess,
    onError,
  });
}
