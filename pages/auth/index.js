import Login from '../../components/page/Auth/Login';
import Register from '../../components/page/Auth/Register';
import styles from '../../styles/Auth.module.css';
import { useState } from 'react';

const Auth = () => {
  const [state, setState] = useState('Register');
  return (
    <div className={styles.AuthPage}>
      {state === 'Register' ? (
        <Register setState={setState} />
      ) : (
        <Login setState={setState} />
      )}
    </div>
  );
};

export default Auth;
