import styles from '../../styles/Profile.module.css';
import Avatar from '../../components/page/Profile/Avatar';
import Edit from '../../components/page/Profile/Edit';

const ProfilePage = () => {
  return (
    <div className={styles.ProfilePage}>
      <Avatar />
      <Edit />
    </div>
  );
};

export default ProfilePage;
