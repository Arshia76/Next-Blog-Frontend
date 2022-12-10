import Input from '../../../components/controls/Input';
import Button from '../../../components/controls/Button';
import Select from '../../../components/controls/Select';
import File from '../../../components/common/File';
import { useFilePicker } from 'use-file-picker';
import {
  useUpdatePostImage,
  useGetPostDetail,
  useUpdatePost,
} from '../../../lib/query/Post';
import { useGetAllCategories } from '../../../lib/query/Category';
import { useEffect } from 'react';
import { getPostDetail } from '../../../lib/api/Post';
import { useFormik } from 'formik';
import styles from '../../../styles/PostAction.module.css';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import { GET_POST_DETAIL } from '../../../lib/query/keys';
import PrivateRoute from '../../../components/common/PrivateRoute';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Resource from '../../../public/Resource';
import { ImSpinner2 } from 'react-icons/im';

const UpdatePostpage = ({ post }) => {
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (post.creator.id !== session?.userId) {
      router.push(Resource.Routes.HOME);
    }
  }, [post]);

  const queryClient = useQueryClient();

  const { data } = useGetAllCategories();

  const { data: postDetail } = useGetPostDetail(post.id, post);

  const onUpdateSuccess = () => {
    toast.success('post updated successfully');
    formik.resetForm();
    queryClient.invalidateQueries(GET_POST_DETAIL);
  };

  const onUpdateError = (err) => {
    toast.error('Error on Post update');
    console.log(err);
  };

  const { mutate: updatePost, isLoading: isLoadingUpdate } = useUpdatePost(
    onUpdateSuccess,
    onUpdateError
  );

  const [openFileSelector, { plainFiles }] = useFilePicker({
    accept: 'image/*',
  });

  const onSuccessUpload = (data) => {
    console.log(data);
    toast.success('upload');
    const postData = {
      title: values.title,
      description: values.description,
      category: values.category?.value,
      image: data.path,
    };
    updatePost([postDetail.id, postData]);
  };

  const onErrorUpload = (err) => {
    console.log(err.respsone.data);
  };

  const { mutate: updatePostImage, isLoadingImage } = useUpdatePostImage(
    onSuccessUpload,
    onErrorUpload
  );

  const onSubmit = (values) => {
    const postData = {
      title: values.title,
      description: values.description,
      category: values.category?.value,
    };

    if (plainFiles.length) {
      const form = new FormData();
      form.append('postImage', plainFiles[0]);
      updatePostImage([postDetail.id, form]);
      return;
    }

    updatePost([postDetail.id, postData]);
  };

  const formik = useFormik({
    enableReinitialize: true,
    validateOnBlur: false,
    initialValues: {
      title: postDetail && postDetail.title,
      description: postDetail && postDetail.description,
      category: postDetail && {
        label: postDetail.category.title,
        value: postDetail.category.id,
      },
      image: postDetail && process.env.NEXT_PUBLIC_URL + postDetail.image,
    },
    onSubmit,
  });

  if (post.creator.id !== session?.userId) {
    router.push(Resource.Routes.HOME);
    return;
  }

  return (
    <div className={styles.Action}>
      <h5>Update Post</h5>
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
          label='Category'
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
          rows={7}
          name='description'
          label='description'
          value={formik.values.description}
          onChange={formik.handleChange}
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
            title={!isLoadingImage && !isLoadingUpdate && 'Update'}
            isLoader={true}
            img={
              isLoadingImage || isLoadingUpdate ? (
                <ImSpinner2 size={25} color='#fff' />
              ) : null
            }
            className='PostButton'
            type='submit'
            disabled={isLoadingImage || isLoadingUpdate}
          />
          <Button
            title='Cancel'
            className='PostButton-Cancel'
            type={'button'}
            onClick={() => router.back()}
          />
        </div>
      </form>
    </div>
  );
};

export default PrivateRoute(UpdatePostpage);

export async function getServerSideProps({ params }) {
  try {
    const post = await getPostDetail(params.id);

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
}
