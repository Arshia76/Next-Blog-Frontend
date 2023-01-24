import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Post from '../components/common/Post';
import Hero from '../components/page/Home/Hero';
import { getAllPosts } from '../lib/api/Post';
import Paginator from '../components/common/Paginator';
import { useGetAllPosts } from '../lib/query/Post';
import DotLoader from '../components/common/DotLoader';

const HomePage = (props) => {
  const { posts } = props;
  const [activePage, setActivePage] = useState(1);

  const {
    data: allPosts,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllPosts({
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
          {allPosts && allPosts?.data?.length
            ? allPosts.data.slice(0, 4).map((post) => {
                return <Post key={post.id} data={post} />;
              })
            : null}
        </div>
      </div>
      {isFetching || isLoading ? (
        <DotLoader />
      ) : (
        allPosts &&
        allPosts.count > process.env.NEXT_PUBLIC_TAKE && (
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
        )
      )}
    </div>
  );
};

export default HomePage;

export async function getStaticProps() {
  try {
    const { data } = await getAllPosts();
    console.log(data);
    return {
      props: {
        posts: data,
      },
      revalidate: 60 * 60,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
