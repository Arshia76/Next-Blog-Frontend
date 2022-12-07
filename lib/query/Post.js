import { useQuery, useMutation } from 'react-query';
import {
  commentPost,
  getAllPosts,
  getBokmarkedPostsOfUser,
  getPostDetail,
  getPostsOfCategory,
  updatePost,
  uploadPostImage,
  createPost,
  deletePost,
  searchPosts,
  getPostsOfUser,
  handleLikePost,
  handleBookmarkPost,
  updatePostImage,
} from '../api/Post';
import * as keys from './keys';

export function useGetAllPosts(initialData, onSuccess, onError) {
  return useQuery(keys.GET_ALL_POSTS, getAllPosts, {
    initialData,
    onSuccess,
    onError,
  });
}

export function useGetPostDetail(postId, initialData, onSuccess, onError) {
  return useQuery([keys.GET_POST_DETAIL, postId], () => getPostDetail(postId), {
    initialData,
    onSuccess,
    onError,
    refetchOnWindowFocus: false,
  });
}

export function useGetBookmarkedPostsOfUser(onSuccess, onError) {
  return useQuery(keys.GET_BOOKMARKED_POSTS_OF_USER, getBokmarkedPostsOfUser, {
    onSuccess,
    onError,
    enabled: false,
  });
}

export function useGetPostsOfUser(onSuccess, onError) {
  return useQuery(keys.GET_POSTS_OF_USER, getPostsOfUser, {
    onSuccess,
    onError,
    enabled: false,
  });
}

export function useGetPostsOfCategory(
  categoryId,
  initialData,
  onSuccess,
  onError
) {
  return useQuery(
    [keys.GET_POSTS_OF_CATEGORY, categoryId],
    () => getPostsOfCategory(categoryId),
    {
      initialData,
      onSuccess,
      onError,
      enabled: false,
    }
  );
}

export function useSearchPosts(postTitle, onSuccess, onError) {
  return useQuery(
    [keys.GET_SEARCH_POSTS, postTitle],
    () => searchPosts(postTitle),
    {
      onSuccess,
      onError,
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
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
