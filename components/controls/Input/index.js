import { forwardRef } from 'react';
import Image from 'next/image';
import styles from './Input.module.css';
import PropTypes from 'prop-types';

const Input = forwardRef((props, ref) => {
  const mainContainerClasses = [styles.MainContainer];
  const containerClasses = [styles.Container];
  const classes = [styles.Input];
  const errorClasses = [styles.Error];
  const labelClasses = [styles.Label];
  if (props.className) classes.push(styles[props.className]);
  if (props.mainContainerClassName)
    mainContainerClasses.push(styles[props.mainContainerClassName]);
  if (props.containerClassName)
    containerClasses.push(styles[props.containerClassName]);
  if (props.errorClassName) errorClasses.push(styles[props.errorClassName]);
  if (props.labelClassName) labelClasses.push(styles[props.labelClassName]);
  return (
    <div className={mainContainerClasses.join(' ')}>
      {props.label && (
        <label className={labelClasses.join(' ')} htmlFor={props.id}>
          {props.label}
        </label>
      )}

      <div className={containerClasses.join(' ')}>
        {props.leadingImg && (
          <Image
            src={props.leadingImg}
            alt='leadingImage'
            width={props.imgWidth}
            height={props.imgHeight}
          />
        )}
        {props.kind === 'input' ? (
          <input
            ref={ref}
            className={classes.join(' ')}
            type={props.type}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            id={props.id}
            title={props.title}
            disabled={props.disabled}
            maxLength={props.maxLength}
            minLength={props.minLength}
            name={props.name}
            value={props.value}
            inputMode={props.inputMode}
            onClick={props.onClick}
            onInput={props.onInput}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            onChange={props.onChange}
          />
        ) : (
          <textarea
            ref={ref}
            className={classes.join(' ')}
            type={'text'}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            id={props.id}
            title={props.title}
            disabled={props.disabled}
            name={props.name}
            value={props.value}
            maxLength={props.maxLength}
            minLength={props.minLength}
            rows={props.rows}
            cols={props.cols}
            inputMode={props.inputMode}
            onClick={props.onClick}
            onInput={props.onInput}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            onChange={props.onChange}
          />
        )}
        {props.trailingImg && (
          <Image
            src={props.trailingImg}
            alt='trailingImage'
            width={props.imgWidth}
            height={props.imgHeight}
          />
        )}
      </div>
      {props.error && (
        <span className={errorClasses.join(' ')}>{props.error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.defaultProps = {
  type: null,
  id: null,
  name: null,
  readOnly: false,
  label: null,
  trailingImg: null,
  leadingImg: null,
  placeholder: null,
  maxLength: null,
  minLength: null,
  className: null,
  error: null,
  value: null,
  style: null,
  disabled: false,
  kind: 'input',
  cols: null,
  rows: null,
  onChange: (_) => null,
  onBlur: (_) => null,
  onFocus: (_) => null,
  onInput: (_) => null,
  onClick: (_) => null,
};

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  trailingImg: PropTypes.string,
  leadingImg: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  className: PropTypes.string,
  value: PropTypes.string,
  kind: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onInput: PropTypes.func,
  onClick: PropTypes.func,
};

export default Input;
