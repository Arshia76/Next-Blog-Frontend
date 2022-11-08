import styles from './Checkbox.module.css';
import PropTypes from 'prop-types';
import Check from 'react-custom-checkbox';

const Checkbox = (props) => {
  const classes = [styles.Checkbox];
  const containerClasses = [styles.CheckboxContainer];
  const labelClasses = [styles.CheckboxLabel];
  if (props.className) classes.push(styles[props.className]);
  if (props.labelClassName) labelClasses.push(styles[props.labelClassName]);
  if (props.containerClassName)
    containerClasses.push(styles[props.containerClassName]);
  return (
    <Check
      icon={props.icon}
      name={props.name}
      checked={props.checked}
      disabled={props.disabled}
      label={props.label}
      onChange={props.onChange}
      right={props.right}
      value={props.value}
      borderColor={props.borderColor}
      borderStyle={props.borderStyle}
      borderWidth={props.borderWidth}
      borderRadius={props.borderRadius}
      labelClassName={labelClasses.join(' ')}
      containerClassName={containerClasses.join(' ')}
      className={classes.join(' ')}
    />
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  containerClassName: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.name,
  value: PropTypes.number,
  right: PropTypes.bool,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  borderColor: PropTypes.string,
  borderStyle: PropTypes.object,
  borderWidth: PropTypes.number,
  borderRadius: PropTypes.number,
  icon: PropTypes.any,
};

export default Checkbox;
