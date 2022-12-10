import { useState } from 'react';
import styles from './Auth.module.css';
import Side from './Side';
import File from '../../common/File';
import Input from '../../controls/Input';
import Button from '../../controls/Button';
import { useLocalRegister } from '../../../lib/query/Auth';
import { useUploadAvatar } from '../../../lib/query/User';
import { useFilePicker } from 'use-file-picker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { ImSpinner2 } from 'react-icons/im';

const Register = (props) => {
  const [loading, setLoading] = useState(false);

  const onSuccessRegister = async () => {
    setLoading(true);
    toast.success('Registered Successfully');
    const res = await signIn('credentials', {
      username: formik.values.username,
      password: formik.values.password,
      redirect: false,
    });
    console.log(res);

    if (res.ok) {
      setLoading(false);
      router.replace(Resource.Routes.HOME);
      toast.success('Logged in successfuly');
    } else {
      setLoading(false);
      console.log('failed');
      toast.error('Error In Login');
    }
  };

  const onErrorRegister = (err) => {
    toast.error(err.response.data.message || 'Error In Login');
  };

  const onSuccessUpload = (data) => {
    console.log(data);
    toast.success('upload');
    const userData = {
      username: formik.values.username,
      password: formik.values.password,
      phoneNumber: formik.values.phoneNumber,
      avatar: data.path,
    };
    register(userData);
  };

  const onErrorUpload = (err) => {
    toast.error(err.response.data.message || 'Error In Upload');
  };

  const { mutate: register, isLoading } = useLocalRegister(
    onSuccessRegister,
    onErrorRegister
  );
  const { mutate: upload } = useUploadAvatar(onSuccessUpload, onErrorUpload);

  const [openFileSelector, { plainFiles }] = useFilePicker({
    accept: 'image/*',
  });

  const onSubmit = (values) => {
    const userData = {
      username: values.username,
      phoneNumber: values.phoneNumber,
      password: values.password,
    };

    if (plainFiles.length) {
      const form = new FormData();
      form.append('avatar', plainFiles[0]);
      upload(form);
      return;
    }

    register(userData);
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
          value={formik.values.phoneNumber}
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
          value={formik.values.password}
          onChange={formik.handleChange}
          error={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : null
          }
        />
        <File
          onClick={openFileSelector}
          content={plainFiles}
          showPreview={true}
        />
        <span onClick={() => props.setState('Login')}>
          Have an account? <strong>Login</strong>
        </span>
        <Button
          title={!isLoading && !loading && 'Register'}
          isLoader={true}
          disabled={loading || isLoading}
          img={
            loading || isLoading ? <ImSpinner2 size={25} color='#fff' /> : null
          }
          className='Auth'
        />
      </form>
      <Side />
    </div>
  );
};

export default Register;
