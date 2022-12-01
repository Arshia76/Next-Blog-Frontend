import styles from '../styles/Home.module.css';
import Post from '../components/common/Post';
import Hero from '../components/page/Home/Hero';
import { getAllPosts } from '../lib/api/Post';

const HomePage = (props) => {
  const { posts } = props;
  return (
    <div>
      <Hero />
      <div className={styles.Container}>
        <h6 className={styles.LatestPosts}>Latest Posts</h6>
        <div className={styles.Home}>
          {posts.data.map((post) => {
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
