import Link from 'next/link';
import Button from '../../controls/Button';
import Input from '../../controls/Input';
import { useState } from 'react';
import styles from './Header.module.css';
import Resource from '../../../public/Resource';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onChange = (e) => {
    setSearch(e.target.value);
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
        <div>
          <li>
            <Link href={Resource.Routes.POST.toString()}>Posts</Link>
          </li>
          <li>
            <Link href={Resource.Routes.ABOUT.toString()}>About</Link>
          </li>
          <li>
            <Button
              className={'Auth'}
              title={'Signup'}
              onClick={() => router.push(Resource.Routes.AUTH)}
            />
          </li>
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
        />
      </div>
    </header>
  );
};

export default Header;
