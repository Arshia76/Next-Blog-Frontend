import styles from './Auth.module.css';
import Side from './Side';
import Input from '../../controls/Input';
import Button from '../../controls/Button';
import { useLocalRegister } from '../../../lib/query/Auth';
import { useFormik } from 'formik';
import * as yup from 'yup';

const Register = (props) => {
  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (err) => {
    console.log(err);
  };

  const { mutate } = useLocalRegister(onSuccess, onError);

  const onSubmit = (values, { resetForm }) => {
    console.log(values);

    mutate(values);
  };

  const validationSchema = yup.object({
    username: yup.string().required('Please Enter Username'),
    phoneNumber: yup.string().required('Please Enter PhoneNumber'),
    password: yup.string().required('Please Enter Password'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      phoneNumber: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });
  return (
    <div className={styles.Auth}>
      <form onSubmit={formik.handleSubmit}>
        <h4>Register</h4>
        <Input
          type='text'
          className='Auth'
          mainContainerClassName='Auth'
          errorClassName='Auth'
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
          type='text'
          className='Auth'
          mainContainerClassName='Auth'
          errorClassName='Auth'
          placeholder='phoneNumber'
          name='phoneNumber'
          value={formik.values.username}
          onChange={formik.handleChange}
          error={
            formik.errors.phoneNumber && formik.touched.phoneNumber
              ? formik.errors.phoneNumber
              : null
          }
        />
        <Input
          type='password'
          className='Auth'
          mainContainerClassName='Auth'
          errorClassName='Auth'
          placeholder='password'
          name='password'
          value={formik.values.username}
          onChange={formik.handleChange}
          error={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : null
          }
        />
        <span onClick={() => props.setState('Login')}>
          Have an account? <strong>Login</strong>
        </span>
        <Button title={'Register'} className='Auth' />
      </form>
      <Side />
    </div>
  );
};

export default Register;
