import Image from 'next/image';
import Resource from '../../../../public/Resource';
import styles from './Hero.module.css';
import Button from '../../../controls/Button';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();
  return (
    <div className={styles.Hero}>
      <Image
        src={Resource.Images.HERO_IMG}
        alt='hero'
        layout='fill'
        objectFit='cover'
      />
      <div className={styles.Content}>
        <h4>Welcome To World Of Writing</h4>
        <h1>
          With <strong>Next Blog</strong>
        </h1>
        <Button
          title={'Start Writing'}
          className='Hero'
          onClick={() => router.push(`${Resource.Routes.POST}/create`)}
        />
      </div>
    </div>
  );
};

export default Hero;
