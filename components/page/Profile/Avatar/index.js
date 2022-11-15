import styles from './Avatar.module.css';
import Button from '../../../controls/Button';
import Image from 'next/image';

const Avatar = (props) => {
  return (
    <div className={styles.Avatar}>
      <h5>Profile</h5>
      <Image
        src={
          props.img ||
          'https://www.clinicdermatech.com/images/men-service-face.jpg'
        }
        alt='profile-image'
        width={120}
        height={120}
        style={{ borderRadius: '50%', marginBottom: '10px' }}
        objectFit='contain'
      />
      <span>{props.username}</span>
      <Button title={'Change Avatar'} className='Profile' />
      <span>{'no file chosen'}</span>
    </div>
  );
};

export default Avatar;
