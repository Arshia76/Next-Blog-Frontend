import styles from '../../styles/Profile.module.css';
import Avatar from '../../components/page/Profile/Avatar';
import Edit from '../../components/page/Profile/Edit';
import { BsFileEarmarkPostFill } from 'react-icons/bs';
import { FiBookmark } from 'react-icons/fi';

const ProfilePage = () => {
  return (
    <div className={styles.ProfilePage}>
      <div className={styles.Group}>
        <Avatar />
        <div className={styles.Action}>
          <span>
            <BsFileEarmarkPostFill size={20} style={{ marginRight: '10px' }} />
            My Posts
          </span>
          <span>
            <FiBookmark size={22} style={{ marginRight: '10px' }} /> Bookmarked
            Posts
          </span>
        </div>
      </div>
      <Edit />
    </div>
  );
};

export default ProfilePage;
