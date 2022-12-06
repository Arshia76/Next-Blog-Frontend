import { GrAttachment } from 'react-icons/gr';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './File.module.css';

const File = (props) => {
  return (
    <div className={styles.FileContainer} onClick={props.onClick}>
      <div className={styles.FileName}>
        <GrAttachment size={20} />
        <span>
          {props.content && props.content.length
            ? props.content?.[0].name
            : 'Select Image'}
        </span>
      </div>
      {props.showPreview && props.content && props.content.length ? (
        <div className={styles.FileImage}>
          <Image
            src={URL.createObjectURL(props.content?.[0])}
            alt={props.content?.[0]?.name}
            layout='fill'
            objectFit='cover'
          />
        </div>
      ) : null}
    </div>
  );
};

File.propTypes = {
  content: PropTypes.array,
  showPreview: PropTypes.bool,
  onClick: PropTypes.func,
};

export default File;
