import { useQuery } from 'react-query';
import { getAllCategories } from '../api/Category';
import * as keys from './keys';

export function useGetAllCategories(onSuccess, onError) {
  return useQuery(keys.GET_ALL_CATEGORIES, getAllCategories, {
    onSuccess,
    onError,
  });
}
