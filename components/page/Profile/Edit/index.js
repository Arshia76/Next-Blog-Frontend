import styles from './Edit.module.css';
import Input from '../../../controls/Input';
import Button from '../../../controls/Button';
import { useUpdateUser, useChangePassword } from '../../../../lib/query/User';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const Edit = ({ userData }) => {
  const onSuccessUpdateUser = () => {
    toast.success('User updated successfully');
  };

  const onErrorUpdateUser = (err) => {
    console.log(err);
    err.response.data.message.forEach((error) => toast.error(error));
  };

  const { mutate: updateUser } = useUpdateUser(
    onSuccessUpdateUser,
    onErrorUpdateUser
  );

  const onSubmitUserUpdate = (values) => {
    updateUser(values);
  };

  const validationSchemaUpdateUser = yup.object({
    username: yup.string().required('Please Enter username'),
    phoneNumber: yup.string().required('Please Enter PhoneNumber'),
  });

  const userUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: userData?.username,
      phoneNumber: userData?.phoneNumber,
    },
    validationSchema: validationSchemaUpdateUser,
    onSubmit: onSubmitUserUpdate,
  });

  const onSuccessChangePassword = () => {
    toast.success('Password changed successfully');
    changePassword.resetForm();
  };

  const onErrorChangePassword = (err) => {
    toast.error(err.response.data.message);
  };

  const { mutate: changePasswordFun } = useChangePassword(
    onSuccessChangePassword,
    onErrorChangePassword
  );

  const onSubmitChangePassword = (values) => {
    changePasswordFun(values);
  };

  const validationSchemaChangePassword = yup.object({
    currentPassword: yup.string().required('Please Enter currentPassword'),
    newPassword: yup.string().required('Please Enter newPassword'),
  });

  const changePassword = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
    },
    validationSchema: validationSchemaChangePassword,
    onSubmit: onSubmitChangePassword,
  });

  return (
    <div className={styles.Edit}>
      <form onSubmit={userUpdate.handleSubmit}>
        <h6>Edit Details</h6>
        <div className={styles.Flex}>
          <Input
            type='text'
            className='Edit'
            errorClassName='Edit'
            labelClassName='Edit'
            mainContainerClassName='Edit'
            name='username'
            label='Username'
            value={userUpdate.values.username}
            onChange={userUpdate.handleChange}
            error={
              userUpdate.errors.username && userUpdate.touched.username
                ? userUpdate.errors.username
                : null
            }
          />
          <Input
            type='text'
            className='Edit'
            errorClassName='Edit'
            labelClassName='Edit'
            mainContainerClassName='Edit'
            name='phoneNumber'
            label='PhoneNumber'
            value={userUpdate.values.phoneNumber}
            onChange={userUpdate.handleChange}
            error={
              userUpdate.errors.phoneNumber && userUpdate.touched.phoneNumber
                ? userUpdate.errors.title
                : null
            }
          />
        </div>
        <Button title='Edit' className='Edit' type='submit' />
      </form>
      <hr />
      <form
        onSubmit={changePassword.handleSubmit}
        style={{ marginTop: '25px' }}
      >
        <h6>Change Password</h6>
        <div className={styles.Flex}>
          <Input
            type='password'
            className='Edit'
            errorClassName='Edit'
            labelClassName='Edit'
            mainContainerClassName='Edit'
            name='currentPassword'
            label='CurrentPassword'
            value={changePassword.values.currentPassword}
            onChange={changePassword.handleChange}
            error={
              changePassword.errors.currentPassword &&
              changePassword.touched.currentPassword
                ? changePassword.errors.currentPassword
                : null
            }
          />
          <Input
            type='password'
            className='Edit'
            errorClassName='Edit'
            labelClassName='Edit'
            mainContainerClassName='Edit'
            name='newPassword'
            label='NewPassword'
            value={changePassword.values.newPassword}
            onChange={changePassword.handleChange}
            error={
              changePassword.errors.newPassword &&
              changePassword.touched.newPassword
                ? changePassword.errors.newPassword
                : null
            }
          />
        </div>
        <Button title='Save' className='Save' type='submit' />
      </form>
    </div>
  );
};

Edit.propTypes = {
  userData: PropTypes.object,
};

export default Edit;
