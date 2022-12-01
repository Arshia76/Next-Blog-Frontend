import { Post } from '../../components/common/Post';
import {
  useGetBookmarkedPostsOfUser,
  useGetPostsOfUser,
} from '../../lib/query/Post';

import { useRouter } from 'next/router';

const UserPostsPage = () => {
  const router = useRouter();
  const { data: bookmarkedPosts } = useGetBookmarkedPostsOfUser();
  const { data: userPosts } = useGetPostsOfUser();
  return <div></div>;
};

export default UserPostsPage;
