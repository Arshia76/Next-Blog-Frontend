import styles from '../styles/About.module.css';

const AboutPage = () => {
  return (
    <div className={styles.AboutPage}>
      <h6>About</h6>
      <div>
        <h1>Next Blog</h1>
        <p>A Social Media Like Blog Built With NextJs And NestJs</p>
        <span>Version 1.0.0</span>
      </div>
    </div>
  );
};

export default AboutPage;
