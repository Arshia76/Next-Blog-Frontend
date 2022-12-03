import { useQuery, useMutation } from 'react-query';
import { changePassword, getCurrentUser, updateUser } from '../api/User';
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
