import { useState, useEffect } from 'react';
import Paginator from '../../components/common/Paginator';
import styles from '../../styles/Posts.module.css';
import Post from '../../components/common/Post';
import { getAllPosts } from '../../lib/api/Post';
import { useGetAllPosts } from '../../lib/query/Post';
import { useGetAllCategories } from '../../lib/query/Category';
import { useRouter } from 'next/router';
import Resource from '../../public/Resource';
import DotLoader from '../../components/common/DotLoader';

const PostsPage = (props) => {
  const { posts } = props;
  const [activePage, setActivePage] = useState(1);
  const [category, setCategory] = useState('');

  const router = useRouter();

  const { data, isLoading, isFetching, refetch } = useGetAllPosts({
    initialData: posts,
    category: category,
    search: router?.query?.search,
    page: activePage,
  });

  const handleActivePage = (page) => {
    setActivePage(page);
  };

  useEffect(() => {
    refetch();
  }, [activePage, category, router.query.search]);

  const { data: categories, isLoading: isLoadingCategories } =
    useGetAllCategories();

  if (isLoadingCategories) {
    return <DotLoader />;
  }

  return (
    <>
      <div className={styles.PostsPage}>
        {isLoading || isFetching ? (
          <DotLoader />
        ) : (
          <>
            <div className={styles.PostsContainer}>
              <h6 className={styles.PostsHeader}>Posts</h6>
              <div className={styles.Posts}>
                {data && data.length ? (
                  data.map((post) => {
                    return <Post key={post.id} data={post} />;
                  })
                ) : (
                  <h4>No Post To Show</h4>
                )}
              </div>
            </div>
          </>
        )}
        <div className={styles.Categories}>
          <h5>Categories</h5>
          <ul>
            <li
              onClick={() => {
                setCategory('');
                router.replace(`${Resource.Routes.POST}`, undefined, {
                  shallow: true,
                });
              }}
            >
              All Posts
            </li>
            {categories && categories.length
              ? categories.map((category) => (
                  <li
                    key={category.id}
                    onClick={() => {
                      setActivePage(1);
                      setCategory(category.id);
                    }}
                  >
                    {category.title}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
      {data && data.count > process.env.NEXT_PUBLIC_TAKE && (
        <Paginator
          firstPage={data?.firstPage || 1}
          lastPage={data?.lastPage}
          nextPage={data?.nextPage}
          previousPage={data?.previousPage}
          itemsPerPage={data.count / 4}
          activePage={activePage}
          total={data.count}
          setActivePage={handleActivePage}
        />
      )}
    </>
  );
};

export default PostsPage;

export async function getStaticProps() {
  try {
    const { data } = await getAllPosts();
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
