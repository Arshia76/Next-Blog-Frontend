import styles from '../styles/Home.module.css';
import Post from '../components/common/Post';
import Hero from '../components/page/Home/Hero';
import { getAllPosts } from '../lib/api/Post';

const HomePage = (props) => {
  const { posts } = props;
  console.log(posts.data);
  return (
    <div>
      <Hero />
      <div className={styles.Container}>
        <h6 className={styles.LatestPosts}>Latest Posts</h6>
        <div className={styles.Home}>
          {posts.data.map((post) => {
            console.log(post);
            return <Post key={post.id} data={post} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  try {
    const data = await getAllPosts();
    return {
      props: {
        posts: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
