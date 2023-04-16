import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useDispatch } from 'react-redux';
import {
  INGREDIENT_DETAILS_CLOSE,
  ORDER_DETAILS_CLOSE,
} from '../../services/actions/ingredient-details-actions';
import { useNavigate } from 'react-router-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modal = document.getElementById('modal');

const Modal = ({ children, onCloseModal }) => {
  useEffect(() => {
    const handleESCclose = (e) => {
      if (e.code === 'Escape') {
        return onCloseModal();
      }
    };
    document.addEventListener('keydown', handleESCclose);

    return () => document.removeEventListener('keydown', handleESCclose);
  }, [onCloseModal]);

  return createPortal(
    <>
      <div
        className={styles.modal__content__active}
        // onClick={(e) => {
        //   e.stopPropagation();
        // }}
      >
        {children}
        <div className={styles.closeIcon}>
          <CloseIcon
            onClick={onCloseModal}
            type="primary"
            className={styles.closeIcon}
          />
        </div>
      </div>
      <ModalOverlay onCloseModal={onCloseModal} />
    </>,

    modal
  );
};

Modal.propTypes = {
  children: PropTypes.element,
};

export default Modal;
