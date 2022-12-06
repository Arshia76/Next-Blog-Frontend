import { useQuery, useMutation } from 'react-query';
import {
  changePassword,
  getCurrentUser,
  updateUser,
  updateUserImage,
  uploadUserImage,
} from '../api/User';
import * as keys from './keys';

export function useGetCurrentUser(onSuccess, onError) {
  return useQuery(keys.GET_CURRENT_USER, getCurrentUser, {
    onSuccess,
    onError,
  });
}

export function useUpdateUser(onSuccess, onError) {
  return useMutation(updateUser, {
    onSuccess,
    onError,
  });
}

export function useChangePassword(onSuccess, onError) {
  return useMutation(changePassword, {
    onSuccess,
    onError,
  });
}

export function useUploadAvatar(onSuccess, onError) {
  return useMutation(uploadUserImage, {
    onSuccess,
    onError,
  });
}

export function useUpdateAvatar(onSuccess, onError) {
  return useMutation(updateUserImage, {
    onSuccess,
    onError,
  });
}
