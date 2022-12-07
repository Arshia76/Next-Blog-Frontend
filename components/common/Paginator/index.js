import styles from './Paginator.module.css';
import PropTypes from 'prop-types';

const Paginator = ({
  nextPage,
  firstPage,
  previousPage,
  lastPage,
  total,
  activePage,
  itemsPerPage,
  setActivePage,
}) => {
  return (
    <div className={styles.Paginator}>
      {firstPage && (
        <span className={styles.FirstPage} onClick={() => setActivePage('1')}>
          {'<<'}
        </span>
      )}
      {previousPage && (
        <span
          className={styles.PreviousPage}
          onClick={() => setActivePage(previousPage)}
        >
          {'<'}
        </span>
      )}
      {Array.from(Array(total).keys())
        .slice(0, itemsPerPage ? Math.ceil(itemsPerPage) : 5)
        .map((item) => ++item)
        .map((item, index) => {
          return (
            <span
              className={
                activePage.toString() === item.toString() && styles.Active
              }
              key={index}
              onClick={() => setActivePage(item)}
            >
              {item}
            </span>
          );
        })}
      {nextPage && (
        <span
          className={styles.NextPage}
          onClick={() => setActivePage(nextPage)}
        >
          {'>'}
        </span>
      )}
      {lastPage && (
        <span
          className={styles.LastPage}
          onClick={() => setActivePage(lastPage)}
        >
          {'>>'}
        </span>
      )}
    </div>
  );
};

Paginator.propTypes = {
  firstPage: PropTypes.number,
  nextPage: PropTypes.number,
  lastPage: PropTypes.number,
  previousPage: PropTypes.number,
  activePage: PropTypes.number,
  total: PropTypes.number,
  itemsPerPage: PropTypes.number,
  setActivePage: PropTypes.func,
};

export default Paginator;
