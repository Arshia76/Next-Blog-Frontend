import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = (props) => {
  const classes = [styles.Button];
  if (props.className) classes.push(styles[props.className]);
  if (props.isLoader) classes.push(styles['Loader']);
  return (
    <button
      className={classes.join(' ')}
      id={props.id}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
      type={props.type}
    >
      {props.img && <span>{props.img}</span>}
      {props.title}
    </button>
  );
};

Button.defaultProps = {
  img: null,
  id: null,
  className: null,
  alt: null,
  style: {},
  onClick: null,
  title: null,
  disabled: false,
  isLoader: false,
  type: 'submit',
};

Button.propTypes = {
  img: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  isLoader: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
