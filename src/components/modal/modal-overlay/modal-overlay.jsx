import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ active, setActive }) => {
  return (
    <div
      className={active ? styles.active : styles.modal}
      onClick={() => setActive(false)}
    ></div>
  );
};

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
};

export default ModalOverlay;
