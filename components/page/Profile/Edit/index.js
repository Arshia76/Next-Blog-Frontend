import styles from './Edit.module.css';
import Input from '../../../controls/Input';
import Button from '../../../controls/Button';

const Edit = () => {
  return (
    <div className={styles.Edit}>
      <form>
        <h6>Edit Details</h6>
        <div className={styles.Flex}>
          <Input
            type='text'
            className='Edit'
            errorClassName='Edit'
            labelClassName='Edit'
            mainContainerClassName='Edit'
            name='Username'
            label='Username'
            //   value={formik.values.title}
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   error={
            //     formik.errors.title && formik.touched.title
            //       ? formik.errors.title
            //       : null
            //   }
          />
          <Input
            type='text'
            className='Edit'
            errorClassName='Edit'
            labelClassName='Edit'
            mainContainerClassName='Edit'
            name='PhoneNumber'
            label='PhoneNumber'
            //   value={formik.values.title}
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   error={
            //     formik.errors.title && formik.touched.title
            //       ? formik.errors.title
            //       : null
            //   }
          />
        </div>
        <Button title='Edit' className='Edit' />
      </form>
      <hr />
      <form style={{ marginTop: '25px' }}>
        <h6>Change Password</h6>
        <div className={styles.Flex}>
          <Input
            type='password'
            className='Edit'
            errorClassName='Edit'
            labelClassName='Edit'
            mainContainerClassName='Edit'
            name='CurrentPassword'
            label='CurrentPassword'
            //   value={formik.values.title}
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   error={
            //     formik.errors.title && formik.touched.title
            //       ? formik.errors.title
            //       : null
            //   }
          />
          <Input
            type='password'
            className='Edit'
            errorClassName='Edit'
            labelClassName='Edit'
            mainContainerClassName='Edit'
            name='NewPassword'
            label='NewPassword'
            //   value={formik.values.title}
            //   onChange={formik.handleChange}
            //   onBlur={formik.handleBlur}
            //   error={
            //     formik.errors.title && formik.touched.title
            //       ? formik.errors.title
            //       : null
            //   }
          />
        </div>
        <Button title='Save' className='Save' />
      </form>
    </div>
  );
};

export default Edit;
