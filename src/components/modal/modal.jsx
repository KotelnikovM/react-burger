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

const modal = document.getElementById('modal');

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleESCclose = (e) => {
      if (e.code === 'Escape') {
        dispatch({ type: INGREDIENT_DETAILS_CLOSE });
        dispatch({ type: ORDER_DETAILS_CLOSE });
        navigate(-1);
      }
    };
    document.addEventListener('keydown', handleESCclose);

    return () => document.removeEventListener('keydown', handleESCclose);
  }, [navigate, dispatch]);

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
      <ModalOverlay />
    </>,

    modal
  );
};

Modal.propTypes = {
  children: PropTypes.element,
};

export default Modal;
