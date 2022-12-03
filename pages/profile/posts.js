import { useEffect, useState } from 'react';
import Post from '../../components/common/Post';
import PrivateRoute from '../../components/common/PrivateRoute';
import {
  useGetBookmarkedPostsOfUser,
  useGetPostsOfUser,
} from '../../lib/query/Post';
import { useRouter } from 'next/router';
import styles from '../../styles/UserPosts.module.css';

const UserPostsPage = () => {
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  const onSuccess = (data) => {
    setPosts(data);
  };

  const { refetch: refetchBookmark } = useGetBookmarkedPostsOfUser(onSuccess);
  const { refetch: refetchUserPosts } = useGetPostsOfUser(onSuccess);

  useEffect(() => {
    if (router.query.search.toString() === 'userPosts') {
      refetchUserPosts();
    } else if (router.query.search.toString() === 'bookmark') {
      refetchBookmark();
    }
  }, [router.query]);

  return (
    <div className={styles.UserPostContainer}>
      <h3 className={styles.Header}>
        {router.query.search === 'bookmark'
          ? 'BookmarkedPosts'
          : router.query.search === 'userPosts'
          ? 'UserPosts'
          : null}
      </h3>
      <div className={styles.Posts}>
        {posts && posts.data && posts.data.length ? (
          posts.data.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                created_at={post.createdAt}
                category={post.category?.title}
                img={'https://wallpapercave.com/wp/wp1877444.jpg' || post.image}
                authorImage={post.creator?.avatar}
                authorName={post.creator?.username}
                comments={post.comments}
                likes={post.likes}
              />
            );
          })
        ) : (
          <div>no data to show</div>
        )}
      </div>
    </div>
  );
};

export default PrivateRoute(UserPostsPage);
