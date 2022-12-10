import Head from 'next/head';
import PropTypes from 'prop-types';
import Resource from '../../../public/Resource';

const HeadComponent = (props) => {
  return (
    <Head>
      <title>{props.title || 'Next Blog'}</title>
      <meta
        name='description'
        content={
          props.description ||
          'A Social Media Like Blog Application Built Using NextJs And NestJs'
        }
      />
      <link rel='icon' type='image/x-icon' href={'/Resource/Images/logo.png'} />
    </Head>
  );
};

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default HeadComponent;
