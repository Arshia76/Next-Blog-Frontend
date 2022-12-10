import Resource from '../../../public/Resource';
import Image from 'next/image';

const DotLoader = () => {
  return (
    <div
      style={{
        flex: 3,
        zIndex: '10000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        src={Resource.Gif.DOT_LOADER}
        alt='loading...'
        width={200}
        height={200}
        objectFit='cover'
      />
    </div>
  );
};

export default DotLoader;
