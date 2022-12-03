import styles from './Avatar.module.css';
import Button from '../../../controls/Button';
import Image from 'next/image';
import PropTypes from 'prop-types';

const Avatar = (props) => {
  const { userData } = props;
  return (
    <div className={styles.Avatar}>
      <h5>Profile</h5>
      <Image
        src={
          'https://www.clinicdermatech.com/images/men-service-face.jpg' ||
          userData.avatar
        }
        alt='profile-image'
        width={120}
        height={120}
        style={{ borderRadius: '50%', marginBottom: '10px' }}
        objectFit='contain'
      />
      <span>{userData?.username || 'arshia'}</span>
      <Button title={'Change Avatar'} className='Profile' />
      <span>{'no file chosen'}</span>
    </div>
  );
};

Avatar.propTypes = {
  userData: PropTypes.object,
};

export default Avatar;
