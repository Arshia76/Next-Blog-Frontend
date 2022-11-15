import styles from './Auth.module.css';
import Input from '../../controls/Input';
import Button from '../../controls/Button';
import Side from './Side';

const Login = (props) => {
  return (
    <div className={styles.Auth}>
      <form>
        <h4>Login</h4>
        <Input
          type='text'
          className='Auth'
          mainContainerClassName='Auth'
          placeholder='username'
        />
        <Input
          type='password'
          className='Auth'
          mainContainerClassName='Auth'
          placeholder='password'
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
