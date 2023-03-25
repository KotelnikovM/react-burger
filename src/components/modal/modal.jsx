import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useDispatch } from 'react-redux';
import { INGREDIENT_DETAILS_CLOSE } from '../../services/actions/ingredient-details-actions';

const modal = document.getElementById('modal');

const Modal = ({ setActive, children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleESCclose = (e) => {
      if (e.code === 'Escape') {
        dispatch({ type: INGREDIENT_DETAILS_CLOSE });
      }
    };
    document.addEventListener('keydown', handleESCclose);

    return () => document.removeEventListener('keydown', handleESCclose);
  }, [dispatch]);

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
      {/* <ModalOverlay setActive={setActive} /> */}
      <ModalOverlay />
    </>,

    modal
  );
};

// Modal.propTypes = {
//   setActive: PropTypes.func.isRequired,
//   children: PropTypes.element,
// };

export default Modal;
