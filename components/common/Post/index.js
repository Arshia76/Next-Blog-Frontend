import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import styles from './Post.module.css';
import { useRouter } from 'next/router';
import Resource from '../../../public/Resource';
import moment from 'jalali-moment';
import {
  BsFillHeartFill,
  BsHeart,
  BsBookmark,
  BsFillBookmarkFill,
} from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  useHandleBookmarkPost,
  useHandleLikePost,
} from '../../../lib/query/Post';

const Post = ({ data }) => {
  const { data: user } = useSession();
  const router = useRouter();
  const [post, setPost] = useState(data);

  const onLikeSuccess = (data) => {
    console.log(data);
    setPost(data);
  };

  const onBookmarkSuccess = (data) => {
    setPost(data);
  };

  const { mutate: handleLike } = useHandleLikePost(onLikeSuccess);
  const { mutate: handleBookmark } = useHandleBookmarkPost(onBookmarkSuccess);

  const handleLikePost = () => {
    handleLike(post.id);
  };

  const handleBookmarkPost = () => {
    handleBookmark(post.id);
  };

  return (
    <div className={styles.Post}>
      <div className={styles.Image}>
        <Image
          src={
            `${process.env.NEXT_PUBLIC_URL}${post.image}` ||
            'https://wallpapercave.com/wp/wp1877444.jpg'
          }
          alt={post.title || 'Manage The Future Of Technology'}
          layout='fill'
          objectFit='cover'
          style={{ borderRadius: '5px' }}
        />
      </div>
      <div className={styles.SectionOne}>
        <span>
          {moment(post.createdAt).format('MMM DD, YYYY') || 'May 15, 2015'}
        </span>
        <span>{post.category.title || 'Technology'}</span>
      </div>
      <h3>{post.title || 'Manage The Future Of Technology'}</h3>
      <p>
        {post.description ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero labore laboriosam nihil illo voluptatum, hic numquam expedita maiores maxime esse.'}
      </p>
      <div className={styles.SectionTwo}>
        <span
          onClick={() =>
            router.push(`${Resource.Routes.POST}/${post.id}/detail`)
          }
        >
          Read More
        </span>
        <div>
          <Image
            src={
              `${process.env.NEXT_PUBLIC_URL}${post?.creator?.avatar}` ||
              'https://www.clinicdermatech.com/images/men-service-face.jpg'
            }
            alt={post?.creator?.username || 'Arshia'}
            width={45}
            height={45}
            className={styles.AuthorImage}
            objectFit='contain'
          />
          <span>{post?.creator?.username || 'Arshia'}</span>
        </div>
      </div>
      <div className={styles.SectionThree}>
        <div>
          <FaRegComment size={22} fill='#877E81' />
          <span>{post?.comments?.length || 0}</span>
        </div>
        <div onClick={handleLikePost}>
          {post?.likes?.some((like) => like.user === user?.userId) ? (
            <BsFillHeartFill size={22} fill='#877E81' />
          ) : (
            <BsHeart size={22} fill='#877E81' />
          )}
          <span>{post?.likes?.length || 0}</span>
        </div>
        <div onClick={handleBookmarkPost}>
          {post.bookmarkedByUsers.some((u) => u.id === user?.userId) ? (
            <BsFillBookmarkFill size={22} fill='#877E81' />
          ) : (
            <BsBookmark size={22} fill='#877E81' />
          )}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  data: PropTypes.object,
};

export default Post;
