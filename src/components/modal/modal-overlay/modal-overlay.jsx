import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ setActive }) => {
  return <div className={styles.active} onClick={() => setActive(false)}></div>;
};

ModalOverlay.propTypes = {
  setActive: PropTypes.func.isRequired,
};

export default ModalOverlay;
