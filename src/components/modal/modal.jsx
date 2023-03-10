import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';

const modal = document.getElementById('modal');

const Modal = ({ setActive, children }) => {
  useEffect(() => {
    const handleESCclose = (e) => {
      if (e.code === 'Escape') {
        setActive(false);
      }
    };
    document.addEventListener('keydown', handleESCclose);

    return () => document.removeEventListener('keydown', handleESCclose);
  }, [setActive]);

  return createPortal(
    <>
      <div
        className={styles.modal__content__active}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
      <ModalOverlay setActive={setActive} />
    </>,

    modal
  );
};

Modal.propTypes = {
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
