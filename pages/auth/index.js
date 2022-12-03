import { useState, useEffect } from 'react';
import Resource from '../../public/Resource';
import Login from '../../components/page/Auth/Login';
import Register from '../../components/page/Auth/Register';
import styles from '../../styles/Auth.module.css';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const Auth = () => {
  const [state, setState] = useState('Register');
  const { status, data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace(Resource.Routes.HOME);
    }
  }, [status, router]);

  if (status === 'unauthenticated');
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
