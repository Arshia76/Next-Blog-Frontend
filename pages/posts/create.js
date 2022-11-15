import Input from '../../components/controls/Input';
import Button from '../../components/controls/Button';
import Select from '../../components/controls/Select';
import File from '../../components/common/File';
import { useFilePicker } from 'use-file-picker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from '../../styles/PostAction.module.css';

const CreatePostpage = () => {
  const [openFileSelector, { filesContent, plainFiles, loading }] =
    useFilePicker({
      accept: 'image/*',
    });

  const validationSchema = yup.object({
    title: yup.string().required('Please Enter The Title'),
    description: yup.string().required('Please Enter The Description'),
    category: yup.string().required('Please Enter The Category'),
    image: yup.string().required('Please Enter The Image'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      image: '',
    },
    validationSchema,
  });

  return (
    <div className={styles.Action}>
      <h5>Create Post</h5>
      <form onSubmit={formik.onSubmit}>
        <Input
          type='text'
          className='PostInput'
          errorClassName='PostInput'
          labelClassName='PostInput'
          mainContainerClassName='PostInput'
          name='title'
          label='title'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.title && formik.touched.title
              ? formik.errors.title
              : null
          }
        />
        <Select
          className='PostSelect'
          classNamePrefix='PostSelect'
          labelClassName='PostSelectLabel'
          mainContainerClassname='PostSelectContainer'
          label='Category'
          onChange={(category) => formik.setFieldValue('category', category)}
          onBlur={formik.handleBlur}
          error={
            formik.errors.category && formik.touched.category
              ? formik.errors.category
              : null
          }
        />
        <Input
          type='text'
          kind='textarea'
          className='PostInput'
          errorClassName='PostInput'
          labelClassName='PostInput'
          mainContainerClassName='PostInput'
          name='description'
          label='description'
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.description && formik.touched.description
              ? formik.errors.description
              : null
          }
        />
        <File
          onClick={openFileSelector}
          content={plainFiles}
          showPreview={true}
        />
        <div className={styles.Buttons}>
          <Button title='Create' className='PostButton' />
          <Button title='Cancel' className='PostButton-Cancel' />
        </div>
      </form>
    </div>
  );
};

export default CreatePostpage;
