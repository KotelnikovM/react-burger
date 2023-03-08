import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? styles.active : styles.modal}
      onClick={() => setActive(false)}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default ModalOverlay;
