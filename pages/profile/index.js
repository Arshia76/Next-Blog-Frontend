import styles from '../../styles/Profile.module.css';
import Avatar from '../../components/page/Profile/Avatar';
import Edit from '../../components/page/Profile/Edit';
import { BsFileEarmarkPostFill } from 'react-icons/bs';
import { FiBookmark } from 'react-icons/fi';
import PrivateRoute from '../../components/common/PrivateRoute';
import { useRouter } from 'next/router';
import Resource from '../../public/Resource';
import { useGetCurrentUser } from '../../lib/query/User';

const ProfilePage = () => {
  const router = useRouter();
  const { data } = useGetCurrentUser();
  return (
    <div className={styles.ProfilePage}>
      <div className={styles.Group}>
        <Avatar userData={data} />
        <div className={styles.Action}>
          <span
            onClick={() =>
              router.push(`${Resource.Routes.PROFILE}/posts?search=userPosts`)
            }
          >
            <BsFileEarmarkPostFill size={20} style={{ marginRight: '10px' }} />
            My Posts
          </span>
          <span
            onClick={() =>
              router.push(`${Resource.Routes.PROFILE}/posts?search=bookmark`)
            }
          >
            <FiBookmark size={22} style={{ marginRight: '10px' }} /> Bookmarked
            Posts
          </span>
        </div>
      </div>
      <Edit />
    </div>
  );
};

export default PrivateRoute(ProfilePage);
