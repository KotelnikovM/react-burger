import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  INGREDIENT_DETAILS_CLOSE,
  ORDER_DETAILS_CLOSE,
} from '../../../services/actions/ingredient-details-actions';
import styles from './modal-overlay.module.css';

const ModalOverlay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseModal = () => {
    dispatch({ type: INGREDIENT_DETAILS_CLOSE });
    dispatch({ type: ORDER_DETAILS_CLOSE });
    navigate(-1);
  };

  return <div className={styles.active} onClick={handleCloseModal}></div>;
};

export default ModalOverlay;
