import { useState, useEffect } from 'react';
import styles from '../../styles/Posts.module.css';
import Post from '../../components/common/Post';
import { getAllPosts } from '../../lib/api/Post';
import { useGetPostsOfCategory, useSearchPosts } from '../../lib/query/Post';
import { useGetAllCategories } from '../../lib/query/Category';
import { useRouter } from 'next/router';
import Resource from '../../public/Resource';

const PostsPage = (props) => {
  const { posts } = props;
  const [category, setCategory] = useState('');
  const router = useRouter();

  const [postsData, setPostsData] = useState(posts);

  const onSuccess = (data) => {
    setPostsData(data);
  };

  const { refetch: search } = useSearchPosts(
    (router && router?.query?.search) || '',
    onSuccess
  );

  useEffect(() => {
    if (router.query.search) {
      search();
    } else {
      setPostsData(posts);
    }
  }, [router.query.search]);

  const onSuccessCategoryPosts = (data) => {
    setPostsData(data);
  };

  const { refetch } = useGetPostsOfCategory(
    category,
    posts,
    onSuccessCategoryPosts
  );
  const { data: categories } = useGetAllCategories();

  useEffect(() => {
    if (category !== '') {
      refetch();
    }
  }, [category]);

  return (
    <div className={styles.PostsPage}>
      <div className={styles.PostsContainer}>
        <h6 className={styles.PostsHeader}>Posts</h6>
        <div className={styles.Posts}>
          {postsData && postsData.data.length ? (
            postsData.data.map((post) => {
              return <Post key={post.id} data={post} />;
            })
          ) : (
            <h4>No Post To Show</h4>
          )}
        </div>
      </div>
      <div className={styles.Categories}>
        <h5>Categories</h5>
        <ul>
          <li
            onClick={() =>
              router.replace(Resource.Routes.POST, undefined, { shallow: true })
            }
          >
            All Posts
          </li>
          {categories &&
            categories.length &&
            categories.map((category) => (
              <li key={category.id} onClick={() => setCategory(category.id)}>
                {category.title}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PostsPage;

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
