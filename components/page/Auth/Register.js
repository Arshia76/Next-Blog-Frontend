import styles from './Auth.module.css';
import Side from './Side';
import Input from '../../controls/Input';
import Button from '../../controls/Button';

const Register = (props) => {
  return (
    <div className={styles.Auth}>
      <form>
        <h4>Register</h4>
        <Input
          type='text'
          className='Auth'
          mainContainerClassName='Auth'
          placeholder='username'
        />
        <Input
          type='text'
          className='Auth'
          mainContainerClassName='Auth'
          placeholder='phoneNumber'
        />
        <Input
          type='password'
          className='Auth'
          mainContainerClassName='Auth'
          placeholder='password'
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
