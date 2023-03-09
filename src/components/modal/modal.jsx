import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

const modal = document.getElementById('modal');

const Modal = ({ active, setActive, children }) => {
  useEffect(() => {
    const handleESCclose = (e) => {
      if (e.code === 'Escape') {
        setActive(false);
      }
    };
    document.addEventListener('keydown', handleESCclose);

    return () => document.removeEventListener('keydown', handleESCclose);
  }, [active]);

  return createPortal(
    <div
      className={
        !active ? styles.modal__content : styles.modal__content__active
      }
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </div>,

    modal
  );
};

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element,
};

export default Modal;
