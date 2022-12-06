import ReactSelect from 'react-select';
import PropTypes from 'prop-types';

const Select = (props) => {
  return (
    <div className={props.mainContainerClassname}>
      {props.label && (
        <span className={props.labelClassName}>{props.label}</span>
      )}

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {props.leadingImage && props.leadingImage}
        <ReactSelect
          value={props.value}
          options={props.options}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          closeMenuOnSelect={props.closeMenuOnSelect}
          isRtl={props.isRtl}
          isDisabled={props.isDisabled}
          isClearable={props.isClearable}
          isSearchable={props.isSearchable}
          isMulti={props.isMulti}
          isLoading={props.isLoading}
          autoFocus={props.autoFocus}
          placeholder={props.placeholder}
          name={props.name}
          theme={props.theme}
          styles={props.styles}
          menuPlacement={props.menuPlacement}
          menuIsOpen={props.menuIsOpen}
          className={props.className}
          classNamePrefix={props.classNamePrefix}
        />
      </div>
      {props.error && (
        <span className={props.errorClassName}>{props.error}</span>
      )}
    </div>
  );
};

Select.defaultProps = {
  value: null,
  isRtl: false,
  isSearchable: true,
  isClearable: true,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  autoFocus: false,
  // menuIsOpen: false,
  closeMenuOnSelect: true,
  options: [],
  defaultValue: null,
  onChange: (_) => null,
  onBlur: (_) => null,
  onFocus: (_) => null,
  placeholder: null,
  name: null,
  menuPlacement: 'auto',
  className: null,
  classNamePrefix: null,
  mainContainerClassname: null,
  label: null,
  error: null,
  errorClassName: null,
  labelClassName: null,
  leadingImage: null,
};

Select.propTypes = {
  value: PropTypes.any,
  isRtl: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isMulti: PropTypes.bool,
  autoFocus: PropTypes.bool,
  menuIsOpen: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,
  options: PropTypes.array,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  menuPlacement: PropTypes.string,
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  errorClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  mainContainerClassname: PropTypes.string,
  leadingImage: PropTypes.any,
};

export default Select;
