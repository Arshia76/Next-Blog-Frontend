import { useQuery, useMutation } from 'react-query';
import {
  bookmarkPost,
  commentPost,
  likePost,
  unlikePost,
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
} from '../api/Post';
import * as keys from './keys';

export function useGetAllPosts(onSuccess, onError) {
  return useQuery(keys.GET_ALL_POSTS, getAllPosts, {
    onSuccess,
    onError,
  });
}

export function useGetPostDetail(postId, onSuccess, onError) {
  return useQuery([keys.GET_POST_DETAIL, postId], () => getPostDetail(postId), {
    onSuccess,
    onError,
  });
}

export function useGetBookmarkedPostsOfUser(userId, onSuccess, onError) {
  return useQuery(
    [keys.GET_BOOKMARKED_POSTS_OF_USER, userId],
    () => getBokmarkedPostsOfUser(userId),
    {
      onSuccess,
      onError,
      enabled: false,
    }
  );
}

export function useGetPostsOfUser(userId, onSuccess, onError) {
  return useQuery(
    [keys.GET_POSTS_OF_USER, userId],
    () => getPostsOfUser(userId),
    {
      onSuccess,
      onError,
      enabled: false,
    }
  );
}

export function useGetPostsOfCategory(categoryId, onSuccess, onError) {
  return useQuery(
    [keys.GET_POSTS_OF_CATEGORY, categoryId],
    () => getPostsOfCategory(categoryId),
    {
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

export function useLikePost(onSuccess, onError) {
  return useMutation(likePost, {
    onSuccess,
    onError,
  });
}

export function useUnlikePost(onSuccess, onError) {
  return useMutation(unlikePost, {
    onSuccess,
    onError,
  });
}

export function useBookmarkPost(onSuccess, onError) {
  return useMutation(bookmarkPost, {
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
