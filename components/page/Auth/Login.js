import styles from './Auth.module.css';
import Input from '../../controls/Input';
import Button from '../../controls/Button';
import Side from './Side';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import Resource from '../../../public/Resource';

const Login = (props) => {
  const router = useRouter();

  const Login = async (values) => {
    // setLoading(true);
    const res = await signIn('credentials', {
      ...values,
      redirect: false,
    });
    console.log(res);

    if (res.ok) {
      router.replace(Resource.Routes.HOME);
      // toast.success('Logged in successfuly');
      // setLoading(false);
    } else {
      console.log('failed');
      // toast.error(res.error);
      // setLoading(false);
    }
  };

  const onSubmit = (values, { resetForm }) => {
    console.log(values);

    Login(values);
  };

  const validationSchema = yup.object({
    username: yup.string().required('Please Enter Username'),
    password: yup.string().required('Please Enter Password'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });
  return (
    <div className={styles.Auth}>
      <form onSubmit={formik.handleSubmit}>
        <h4>Login</h4>
        <Input
          type='text'
          className='Auth'
          mainContainerClassName='Auth'
          placeholder='username'
          name='username'
          value={formik.values.username}
          onChange={formik.handleChange}
          error={
            formik.errors.username && formik.touched.username
              ? formik.errors.username
              : null
          }
        />
        <Input
          type='password'
          className='Auth'
          mainContainerClassName='Auth'
          placeholder='password'
          name='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : null
          }
        />
        <span>Forgot your password?</span>
        <span onClick={() => props.setState('Register')}>
          Dont have an account? <strong>Register</strong>
        </span>
        <Button title={'Login'} className='Auth' />
      </form>
      <Side />
    </div>
  );
};

export default Login;
