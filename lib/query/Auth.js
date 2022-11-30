import { useMutation } from 'react-query';
import { localLogin, localRegister } from '../api/Auth';

export function useLocalLogin(onSuccess, onError) {
  return useMutation(localLogin, {
    onSuccess,
    onError,
  });
}

export function useLocalRegister(onSuccess, onError) {
  return useMutation(localRegister, {
    onSuccess,
    onError,
  });
}
