import styles from '../../../styles/Detail.module.css';
import Image from 'next/image';
import Comment from '../../../components/page/Detail/Comment';
import Input from '../../../components/controls/Input';
import Button from '../../../components/controls/Button';
import { getAllPosts, getPostDetail } from '../../../lib/api/Post';
import moment from 'jalali-moment';

const PostDetailPage = (props) => {
  const { post } = props;
  return (
    <div className={styles.Detail}>
      <div className={styles.Content}>
        <div className={styles.Top}>
          <h3>{post?.title || 'Manage The Future Of Technology'}</h3>
          <h6>{post?.category?.title || 'technology'}</h6>
        </div>
        <div className={styles.Section}>
          <div className={styles.AuthorImage}>
            <Image
              src={
                'https://www.clinicdermatech.com/images/men-service-face.jpg' ||
                post.creator.avatar
              }
              alt={post?.creator?.username}
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
              objectFit='cover'
            />
            <span className={styles.Author}>
              {post?.creator?.username || 'Arshia'}
            </span>
          </div>
          <span>
            {`Posted On ${moment(post?.createdAt).format('MMM DD, YYYY')}` ||
              'Posted On May 15, 2015'}
          </span>
        </div>
        <div className={styles.Image}>
          <Image
            src={'https://wallpapercave.com/wp/wp1877444.jpg' || post.image}
            alt={post?.title}
            layout='fill'
            objectFit='cover'
            style={{ borderRadius: '5px' }}
          />
        </div>
        <p>
          {post?.description ||
            ` Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          eveniet consequatur est! Debitis nobis tempora hic. Illo asperiores
          amet commodi aperiam, consequatur est culpa velit nam nisi deleniti
          numquam facere dolorum impedit? Accusamus voluptatem atque
          consequuntur illo harum iusto earum, dolor suscipit tempore vel nisi
          sed facilis incidunt id ea neque veritatis dolore expedita quo nam
          veniam! Non nesciunt corrupti veniam iste natus dicta quam laborum
          dolorum maiores inventore a quis facere totam eius praesentium fugiat,
          labore tenetur facilis rem? Veniam, temporibus quaerat saepe porro hic
          itaque totam quia eum dicta, blanditiis ducimus quos praesentium
          aliquid autem quasi quisquam officia? Odio magni modi repellendus
          natus sapiente quos consequatur omnis magnam dolorum recusandae,
          corrupti nisi alias nesciunt quisquam enim adipisci atque quo voluptas
          aut laborum commodi dicta. Vitae, ipsa praesentium? Nemo, dolore!
          Quibusdam repellendus delectus voluptas doloremque, adipisci velit
          distinctio veniam dolor saepe repudiandae aliquid expedita accusamus
          voluptatem eaque facilis perferendis. `}
        </p>
      </div>
      <div className={styles.Comments}>
        <h5>Comments</h5>
        {post?.comments.map((comment) => (
          <Comment
            title={comment.title}
            user={comment.user}
            sentAt={comment.createdAt}
          />
        ))}

        <Input
          type='text'
          kind='textarea'
          className='Comment'
          errorClassName='Comment'
          labelClassName='Comment'
          mainContainerClassName='Comment'
          name='comment'
          placeholder='Write your comment....'
          label='Write your comment'
          rows={6}
          cols={4}
        />
        <Button title={'Confirm'} className='Comment' />
      </div>
    </div>
  );
};

export default PostDetailPage;

export async function getStaticPaths() {
  try {
    const posts = await getAllPosts();
    const paths = posts.data.map((post) => ({
      params: { id: post.id.toString(), index: 'detail' },
    }));

    return { paths, fallback: false };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticProps({ params }) {
  const post = await getPostDetail(params.id);
  console.log(post);
  return {
    props: {
      post,
    },
  };
}