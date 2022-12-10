import { useEffect, useState } from 'react';
import Post from '../../components/common/Post';
import PrivateRoute from '../../components/common/PrivateRoute';
import Paginator from '../../components/common/Paginator';
import {
  useGetBookmarkedPostsOfUser,
  useGetPostsOfUser,
} from '../../lib/query/Post';
import { useRouter } from 'next/router';
import styles from '../../styles/UserPosts.module.css';
import DotLoader from '../../components/common/DotLoader';

const UserPostsPage = () => {
  const router = useRouter();
  const [activePage, setActivePage] = useState(1);

  const [posts, setPosts] = useState([]);

  const onSuccess = (data) => {
    setPosts(data);
  };

  const { refetch: refetchBookmark, isFetching: isFetchingBookmarkPosts } =
    useGetBookmarkedPostsOfUser({
      page: activePage,
      onSuccess,
    });
  const { refetch: refetchUserPosts, isFetching: isFetchingUserPosts } =
    useGetPostsOfUser({
      page: activePage,
      onSuccess,
    });

  useEffect(() => {
    if (router?.query?.search?.toString() === 'userPosts') {
      refetchUserPosts();
    } else if (router?.query?.search?.toString() === 'bookmark') {
      refetchBookmark();
    }
  }, [router.query, activePage]);

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  if (isFetchingBookmarkPosts || isFetchingUserPosts) {
    return <DotLoader />;
  }

  return (
    <div className={styles.UserPostContainer}>
      <h3 className={styles.Header}>
        {router.query && router.query.search === 'bookmark'
          ? 'BookmarkedPosts'
          : router.query && router.query.search === 'userPosts'
          ? 'UserPosts'
          : null}
      </h3>
      <div className={styles.Posts}>
        {posts && posts.data && posts.data.length ? (
          posts.data.map((post) => {
            return <Post key={post.id} data={post} page={activePage} />;
          })
        ) : (
          <div>no data to show</div>
        )}
      </div>
      {posts && posts.count > process.env.NEXT_PUBLIC_TAKE && (
        <Paginator
          firstPage={posts?.firstPage || 1}
          lastPage={posts?.lastPage}
          nextPage={posts?.nextPage}
          previousPage={posts?.previousPage}
          itemsPerPage={posts.count / process.env.NEXT_PUBLIC_TAKE}
          activePage={activePage}
          total={posts.count}
          setActivePage={handleActivePage}
        />
      )}
    </div>
  );
};

export default PrivateRoute(UserPostsPage);
