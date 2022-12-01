import Link from 'next/link';
import Button from '../../controls/Button';
import Input from '../../controls/Input';
import { useState } from 'react';
import styles from './Header.module.css';
import Resource from '../../../public/Resource';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSearchPosts } from '../../../lib/query/Post';

const Header = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onSuccess = (data) => {
    console.log(data);
    router.push(Resource.Routes.POST + '?search=' + search);
  };

  const { data, refetch } = useSearchPosts(search || '', onSuccess);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && search !== '') {
      e.preventDefault();
      refetch();
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
          onKeyDown={handleSearch}
        />
      </div>
    </header>
  );
};

export default Header;
