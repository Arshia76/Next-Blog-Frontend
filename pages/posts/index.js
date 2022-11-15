import styles from '../../styles/Posts.module.css';
import Post from '../../components/common/Post';

const PostsPage = () => {
  return (
    <div className={styles.PostsPage}>
      <div className={styles.PostsContainer}>
        <h6 className={styles.PostsHeader}>Posts</h6>
        <div className={styles.Posts}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
      <div className={styles.Categories}>
        <h5>Categories</h5>
        <ul>
          <li>Technology</li>
          <li>Chemistry</li>
          <li>Sports</li>
          <li>Politics</li>
          <li>Economy</li>
        </ul>
      </div>
    </div>
  );
};

export default PostsPage;
