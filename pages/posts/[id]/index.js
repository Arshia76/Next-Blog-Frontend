import styles from '../../../styles/Detail.module.css';
import Image from 'next/image';

const PostDeatailpage = (props) => {
  return (
    <div className={styles.Detail}>
      <div className={styles.Content}>
        <div className={styles.Top}>
          <h3>{props.title || 'Manage The Future Of Technology'}</h3>
          <h6>{props.category || 'technology'}</h6>
        </div>
        <div className={styles.Section}>
          <div className={styles.AuthorImage}>
            <Image
              src={
                props.authorImage ||
                'https://www.clinicdermatech.com/images/men-service-face.jpg'
              }
              alt={props.authorName}
              width={50}
              height={50}
              style={{ borderRadius: '50%' }}
              objectFit='cover'
            />
            <span className={styles.Author}>
              {props.authorName || 'Arshia'}
            </span>
          </div>
          <span>{props.created_at || 'Posted On May 15, 2015'}</span>
        </div>
        <div className={styles.Image}>
          <Image
            src={props.img || 'https://wallpapercave.com/wp/wp1877444.jpg'}
            alt={props.title}
            layout='fill'
            objectFit='cover'
            style={{ borderRadius: '5px' }}
          />
        </div>
        <p>
          {props.description ||
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
    </div>
  );
};

export default PostDeatailpage;
