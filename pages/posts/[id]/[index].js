import { useState } from 'react';
import styles from '../../../styles/Detail.module.css';
import Image from 'next/image';
import Comment from '../../../components/page/Detail/Comment';
import Input from '../../../components/controls/Input';
import Button from '../../../components/controls/Button';
import { getAllPosts, getPostDetail } from '../../../lib/api/Post';
import moment from 'jalali-moment';
import {
  useCommentPost,
  useGetPostDetail,
  useDeletePost,
} from '../../../lib/query/Post';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { GET_POST_DETAIL } from '../../../lib/query/keys';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Resource from '../../../public/Resource';
import { ImSpinner2 } from 'react-icons/im';

const PostDetailPage = (props) => {
  const router = useRouter();

  const { post } = props;

  const { status, data } = useSession();

  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');

  const onCommentSuccess = () => {
    toast.success('Commented Successfully');
    queryClient.invalidateQueries(GET_POST_DETAIL);
    setComment('');
  };

  const onCommentError = (err) => {
    toast.error(err.response.data.message);
  };

  const { mutate: commentPost, isLoading } = useCommentPost(
    onCommentSuccess,
    onCommentError
  );

  const handleCommentPost = (e) => {
    e.preventDefault();
    if (!comment) {
      toast.error('Please Enter Your Commnet');
      return;
    }

    commentPost([post.id, { title: comment }]);
  };

  const { data: postData } = useGetPostDetail(post.id, post);

  const onSuccessDelete = () => {
    toast.success('Post Removed Successully');
    router.push(Resource.Routes.HOME);
  };

  const onErrorDelete = (err) => {
    toast.error(err.response.data.message || 'Error On Deleting Post');
  };

  const { mutate: deletePost, isLoading: isLoadingDelete } = useDeletePost(
    onSuccessDelete,
    onErrorDelete
  );

  const handleDeletePost = () => {
    deletePost(postData.id);
  };

  return (
    <div className={styles.Detail}>
      <div className={styles.Content}>
        <div className={styles.Top}>
          <h3>{postData?.title || 'Manage The Future Of Technology'}</h3>
          <h6>{postData?.category?.title || 'technology'}</h6>
        </div>
        <div className={styles.Section}>
          <div className={styles.AuthorImage}>
            <Image
              src={process.env.NEXT_PUBLIC_URL + postData?.creator?.avatar}
              alt={postData?.creator?.username}
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
              objectFit='cover'
            />
            <span className={styles.Author}>
              {postData?.creator?.username || 'Arshia'}
            </span>
          </div>
          <span>
            {`Posted On ${moment(postData?.createdAt).format(
              'MMM DD, YYYY'
            )}` || 'Posted On May 15, 2015'}
          </span>
        </div>
        <div className={styles.Image}>
          <Image
            src={process.env.NEXT_PUBLIC_URL + postData?.image}
            alt={postData?.title}
            layout='fill'
            objectFit='cover'
            style={{ borderRadius: '5px' }}
          />
        </div>
        <p>
          {postData?.description ||
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
        {post?.creator?.id === data?.userId && (
          <div className={styles.Buttons}>
            <Button
              className={'Update'}
              title='update'
              onClick={() =>
                router.push(`${Resource.Routes.POST}/${post.id}/update`)
              }
            />
            <Button
              className={'Delete'}
              title={!isLoadingDelete && 'delete'}
              onClick={handleDeletePost}
              isLoader={true}
              img={isLoadingDelete && <ImSpinner2 size={25} color='#fff' />}
              disabled={isLoadingDelete}
            />
          </div>
        )}
      </div>
      <div className={styles.Comments}>
        <h5>Comments</h5>
        {postData?.comments.map((comment) => (
          <Comment
            title={comment.title}
            user={comment.user}
            sentAt={comment.createdAt}
          />
        ))}

        {status === 'authenticated' ? (
          <>
            <Input
              type='text'
              kind='textarea'
              className='Comment'
              errorClassName='Comment'
              labelClassName='Comment'
              mainContainerClassName='Comment'
              name='comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Write your comment....'
              label='Write your comment'
              rows={6}
              cols={4}
            />
            <Button
              title={!isLoading && 'Confirm'}
              img={isLoading && <ImSpinner2 size={25} color='#fff' />}
              className='Comment'
              disabled={isLoading}
              isLoader={true}
              onClick={handleCommentPost}
            />
          </>
        ) : (
          <h6
            onClick={() => router.push(Resource.Routes.AUTH)}
            style={{
              marginTop: '25px',
              fontSize: '20px',
              border: '1px solid #D68A50',
              padding: '8px',
              color: 'white',
              borderRadius: '4px',
              width: 'fit-content',
              backgroundColor: '#D68A50',
              cursor: 'pointer',
            }}
          >
            Please Sign In To Comment
          </h6>
        )}
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
    revalidate: 60 * 60,
  };
}
