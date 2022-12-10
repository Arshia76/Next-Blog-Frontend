import Image from 'next/image';
import styles from './Comment.module.css';
import PropTypes from 'prop-types';
import moment from 'jalali-moment';

const Comment = (props) => {
  return (
    <div className={styles.Comment}>
      <Image
        src={process.env.NEXT_PUBLIC_URL + props?.user?.avatar}
        alt={props.user.username}
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
      />
      <div className={styles.Content}>
        <div>
          <span>{props.user.username || 'Arshia'}</span>
          <hr />
          <span>
            {moment(props.sentAt).format('MMM DD, YYYY') || 'May 25, 2022'}
          </span>
        </div>
        <p>
          {props.title ||
            `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus 
            cupiditate soluta, exercitationem fuga non nesciunt, 
            libero vel ad harum magnam voluptas esse voluptatum aperiam cum 
            inventore tempora reiciendis molestiae explicabo ipsum! Tempora 
            quo iure officia omnis labore illum suscipit, quia necessitatibus 
            architecto non molestiae quam quos ex sapiente. Veniam, vero temporibus
            unde eveniet pariatur assumenda quae ullam tempore totam. Architecto
            consequatur voluptates nihil inventore quod explicabo fuga itaque dolor
            similique labore repellendus saepe quis laboriosam perspiciatis amet voluptatum necessitatibus unde, iure facere quam. Soluta, dolore dignissimos veritatis aliquid eos officiis ea tenetur exercitationem, reprehenderit facilis a quidem culpa ullam beatae.    `}
        </p>
      </div>
    </div>
  );
};

Comment.propTypes = {
  title: PropTypes.string,
  user: PropTypes.object,
  sentAt: PropTypes.string,
};

export default Comment;
