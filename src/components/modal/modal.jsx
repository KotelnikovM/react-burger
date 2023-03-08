import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modal = document.getElementById('modal');

const Modal = ({ active, setActive, children }) => {
  document.onkeydown = (e) => {
    if (e.code === 'Escape') {
      setActive(false);
    }
  };

  return createPortal(
    <ModalOverlay active={active} setActive={setActive}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </ModalOverlay>,
    modal
  );
};

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
