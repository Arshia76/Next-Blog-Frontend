import styles from '../styles/Home.module.css';
import Post from '../components/common/Post';
import Hero from '../components/page/Home/Hero';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <div className={styles.Container}>
        <h6 className={styles.LatestPosts}>Latest Posts</h6>
        <div className={styles.Home}>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
