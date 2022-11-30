import Image from 'next/image';
import styles from './Post.module.css';
import { useRouter } from 'next/router';
import Resource from '../../../public/Resource';
import {
  BsFillHeartFill,
  BsHeart,
  BsBookmark,
  BsFillBookmarkFill,
} from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';

const Post = (props) => {
  const router = useRouter();
  return (
    <div className={styles.Post}>
      <div className={styles.Image}>
        <Image
          src={props.img || 'https://wallpapercave.com/wp/wp1877444.jpg'}
          alt={props.title || 'Manage The Future Of Technology'}
          layout='fill'
          objectFit='cover'
          style={{ borderRadius: '5px' }}
        />
      </div>
      <div className={styles.SectionOne}>
        <span>{props.created_at || 'May 15, 2015'}</span>
        <span>{props.category || 'Technology'}</span>
      </div>
      <h3>{props.title || 'Manage The Future Of Technology'}</h3>
      <p>
        {props.description ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero labore laboriosam nihil illo voluptatum, hic numquam expedita maiores maxime esse.'}
      </p>
      <div className={styles.SectionTwo}>
        <span onClick={() => router.push(`${Resource.Routes.POST}/1`)}>
          Read More
        </span>
        <div>
          <Image
            src={
              props.authorImg ||
              'https://www.clinicdermatech.com/images/men-service-face.jpg'
            }
            alt={props.authorName || 'Arshia'}
            width={45}
            height={45}
            className={styles.AuthorImage}
            objectFit='contain'
          />
          <span>{props.authorName || 'Arshia'}</span>
        </div>
      </div>
      <div className={styles.SectionThree}>
        <div>
          <FaRegComment size={22} fill='#877E81' />
          <span>23</span>
        </div>
        <div>
          <BsHeart size={22} fill='#877E81' />
          <span>52</span>
        </div>
        <div>
          <BsBookmark size={22} fill='#877E81' />
        </div>
      </div>
    </div>
  );
};

export default Post;
