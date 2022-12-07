import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Post from '../components/common/Post';
import Hero from '../components/page/Home/Hero';
import { getAllPosts } from '../lib/api/Post';
import Paginator from '../components/common/Paginator';
import { useGetAllPosts } from '../lib/query/Post';

const HomePage = (props) => {
  const { posts } = props;
  const [activePage, setActivePage] = useState(1);

  const { data: allPosts, refetch } = useGetAllPosts({
    initialData: posts,
    page: activePage,
  });

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    refetch();
  }, [activePage]);

  return (
    <div>
      <Hero />
      <div className={styles.Container}>
        <h6 className={styles.LatestPosts}>Latest Posts</h6>
        <div className={styles.Home}>
          {allPosts.data.map((post) => {
            console.log(post);
            return <Post key={post.id} data={post} />;
          })}
        </div>
      </div>
      {allPosts && allPosts.count > process.env.NEXT_PUBLIC_TAKE && (
        <Paginator
          firstPage={allPosts?.firstPage || 1}
          lastPage={allPosts?.lastPage}
          nextPage={allPosts?.nextPage}
          previousPage={allPosts?.previousPage}
          itemsPerPage={allPosts.count / process.env.NEXT_PUBLIC_TAKE}
          activePage={activePage}
          total={allPosts.count}
          setActivePage={handleActivePage}
        />
      )}
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
