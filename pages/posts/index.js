import { useState, useEffect } from 'react';
import styles from '../../styles/Posts.module.css';
import Post from '../../components/common/Post';
import { getAllPosts } from '../../lib/api/Post';
import { useGetPostsOfCategory } from '../../lib/query/Post';
import { useGetAllCategories } from '../../lib/query/Category';

const PostsPage = (props) => {
  const { posts } = props;
  const [category, setCategory] = useState('');
  // const onGetCategoryPostsSuccess = (data) => {
  //   console.log(data);
  //   setData(data);
  // };
  const { data: categoryPosts, refetch } = useGetPostsOfCategory(
    category,
    posts
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
          {categoryPosts &&
            categoryPosts.data.map((post) => {
              return <Post key={post.id} data={post} />;
            })}
        </div>
      </div>
      <div className={styles.Categories}>
        <h5>Categories</h5>
        <ul>
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
