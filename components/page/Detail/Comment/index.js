import Image from 'next/image';
import styles from './Comment.module.css';

const Comment = (props) => {
  return (
    <div className={styles.Comment}>
      <Image
        src={
          props.img ||
          'https://www.clinicdermatech.com/images/men-service-face.jpg'
        }
        alt={props.user}
        width={80}
        height={80}
        style={{ borderRadius: '50%' }}
      />
      <div className={styles.Content}>
        <div>
          <span>{props.user || 'Arshia'}</span>
          <hr />
          <span>{props.sent_at || 'May 25, 2022'}</span>
        </div>
        <p>
          {props.comment ||
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

export default Comment;
