import Input from '../../components/controls/Input';
import Button from '../../components/controls/Button';
import Select from '../../components/controls/Select';
import File from '../../components/common/File';
import { useCreatePost, useUploadPostImage } from '../../lib/query/Post';
import { useGetAllCategories } from '../../lib/query/Category';
import { useFilePicker } from 'use-file-picker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styles from '../../styles/PostAction.module.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Resource from '../../public/Resource';
import { ImSpinner2 } from 'react-icons/im';

const CreatePostpage = () => {
  const router = useRouter();

  const { data } = useGetAllCategories();

  const onCreateSuccess = () => {
    toast.success('post created successfully');
    formik.resetForm();
    router.push(Resource.Routes.HOME);
  };

  const onCreateError = (err) => {
    toast.error('Error on Post Creation');
    console.log(err);
  };

  const { mutate: createPost, isLoading: isLoadingCreate } = useCreatePost(
    onCreateSuccess,
    onCreateError
  );

  const [openFileSelector, { plainFiles }] = useFilePicker({
    accept: 'image/*',
  });

  const onSuccessUpload = (data) => {
    console.log(data);
    toast.success('upload');
    const postData = {
      title: formik.values.title,
      description: formik.values.description,
      category: formik.values.category?.value,
      image: data.path,
    };
    createPost(postData);
  };

  const onErrorUpload = (err) => {
    console.log(err.respsone.data);
  };

  const { mutate: uploadImage, isLoading: isLoadingImage } = useUploadPostImage(
    onSuccessUpload,
    onErrorUpload
  );

  const validationSchema = yup.object({
    title: yup.string().required('Please Enter The Title'),
    description: yup.string().required('Please Enter The Description'),
    category: yup.object().required('Please Enter The Category'),
  });

  const onSubmit = () => {
    if (plainFiles.length === 0) {
      toast.error('Please Select Post Image');
      return;
    }
    const formData = new FormData();
    formData.append('postImage', plainFiles[0]);
    uploadImage(formData);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      image: '',
    },
    validateOnBlur: false,
    validationSchema,
    onSubmit,
  });

  return (
    <div className={styles.Action}>
      <h5>Create Post</h5>
      <form onSubmit={formik.handleSubmit}>
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
          errorClassName='PostSelectError'
          label='category'
          value={formik.values.category}
          options={
            data &&
            data.map((category) => ({
              label: category.title,
              value: category.id,
            }))
          }
          onChange={(selectedField) =>
            formik.setFieldValue('category', selectedField)
          }
          handleBlur={formik.handleBlur}
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
          rows={7}
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
          <Button
            title={!isLoadingCreate && !isLoadingImage && 'Create'}
            isLoader={true}
            img={
              isLoadingCreate || isLoadingImage ? (
                <ImSpinner2 size={25} color='#fff' />
              ) : null
            }
            className='PostButton'
            disabled={isLoadingCreate || isLoadingImage}
          />
          <Button
            title='Cancel'
            className='PostButton-Cancel'
            onClick={() => router.back()}
            type='button'
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePostpage;
