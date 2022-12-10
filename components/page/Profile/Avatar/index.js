import styles from './Avatar.module.css';
import Button from '../../../controls/Button';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useUpdateAvatar } from '../../../../lib/query/User';
import { toast } from 'react-toastify';
import { useFilePicker } from 'use-file-picker';
import { ImSpinner2 } from 'react-icons/im';

const Avatar = (props) => {
  const { userData } = props;

  const [openFileSelector, { plainFiles }] = useFilePicker({
    accept: 'image/*',
  });

  const onSuccess = () => {
    toast.success('Uploaded Successfully');
  };

  const onError = (err) => {
    toast.error(err.response.data.message || 'Error In Updating Avatar');
  };

  const { mutate, isLoading } = useUpdateAvatar(onSuccess, onError);

  const updateAvatar = (e) => {
    e.preventDefault();
    if (plainFiles.length !== 0) {
      const formData = new FormData();
      formData.append('avatar', plainFiles[0]);
      mutate(formData);
    }
  };

  return (
    <div className={styles.Avatar}>
      <h5>Profile</h5>
      <Image
        onClick={openFileSelector}
        src={
          plainFiles.length
            ? URL.createObjectURL(plainFiles[0])
            : userData && `${process.env.NEXT_PUBLIC_URL}${userData.avatar}`
        }
        alt='profile-image'
        width={120}
        height={120}
        style={{ borderRadius: '50%', marginBottom: '10px' }}
        objectFit='cover'
      />
      <span>{userData?.username || 'arshia'}</span>
      <Button
        title={!isLoading && 'Change Avatar'}
        isLoader={true}
        disabled={isLoading}
        img={isLoading && <ImSpinner2 size={25} color='#fff' />}
        className='Profile'
        onClick={updateAvatar}
      />
      <span>{plainFiles.length ? plainFiles[0].name : 'no file chosen'}</span>
    </div>
  );
};

Avatar.propTypes = {
  userData: PropTypes.object,
};

export default Avatar;
