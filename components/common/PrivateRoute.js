import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Resource from '../../public/Resource';

const PrivateRoute = (Component) => {
  const Auth = (props) => {
    const { status } = useSession();
    const router = useRouter();

    if (status === 'unauthenticated') {
      router.replace(Resource.Routes.AUTH);
    }

    if (status === 'authenticated')
      return (
        <div>
          <Component {...props} />
        </div>
      );
  };
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default PrivateRoute;
