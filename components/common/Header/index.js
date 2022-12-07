import Link from 'next/link';
import Button from '../../controls/Button';
import Input from '../../controls/Input';
import { useState } from 'react';
import styles from './Header.module.css';
import Resource from '../../../public/Resource';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import useWindowSize from '../../../hooks/useWindowSize';
import { FaHamburger } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { signOut } from 'next-auth/react';

const Header = () => {
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { width } = useWindowSize();

  const { status } = useSession();

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search !== '') {
      e.preventDefault();
      router.push(`${Resource.Routes.POST}?search=${search}`);
      console.log('click');
    }
  };

  return (
    <header className={styles.Header}>
      <ul>
        <li className={styles.Logo}>
          <Image
            src={Resource.Images.LOGO_IMG}
            width={40}
            height={40}
            style={{ marginRight: '8px' }}
          />
          <Link className={styles.Home} href={Resource.Routes.HOME.toString()}>
            NextBlog
          </Link>
        </li>
        {width < 768 && (
          <FaHamburger size={28} fill='#fff' onClick={() => setOpen(true)} />
        )}
        <div className={open ? styles.Open : styles.Close}>
          {width < 768 && (
            <IoClose
              size={35}
              fill='#fff'
              style={{
                marginLeft: 'auto',
                marginRight: '20px',
                marginTop: '25px',
              }}
              onClick={() => setOpen(false)}
            />
          )}
          <li>
            <Link href={Resource.Routes.POST.toString()}>Posts</Link>
          </li>
          {status === 'authenticated' && (
            <li>
              <Link href={`${Resource.Routes.POST.toString()}/create`}>
                Create Post
              </Link>
            </li>
          )}
          <li>
            <Link href={Resource.Routes.ABOUT.toString()}>About</Link>
          </li>
          {status === 'authenticated' ? (
            <>
              <li>
                <Link href={Resource.Routes.PROFILE.toString()}>
                  My Profile
                </Link>
              </li>
              <li>
                <Button
                  className={'Auth'}
                  title={'SignOut'}
                  onClick={() => signOut({ redirect: false })}
                />
              </li>
            </>
          ) : (
            <li>
              <Button
                className={'Auth'}
                title={'Signup'}
                onClick={() => router.push(Resource.Routes.AUTH)}
              />
            </li>
          )}
        </div>
      </ul>
      <div className={styles.Input}>
        <Input
          onChange={onChange}
          value={search}
          className={'Search'}
          containerClassName={'Search'}
          placeholder={'search...'}
          trailingImg={Resource.Svg.SEARCH_SVG}
          imgWidth={22}
          imgHeight={22}
          onKeyDown={handleSearch}
        />
      </div>
    </header>
  );
};

export default Header;
