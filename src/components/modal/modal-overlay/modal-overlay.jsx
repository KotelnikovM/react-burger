import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  INGREDIENT_DETAILS_CLOSE,
  ORDER_DETAILS_CLOSE,
} from '../../../services/actions/ingredient-details-actions';
import styles from './modal-overlay.module.css';

const ModalOverlay = ({ setActive }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.active}
      onClick={() => {
        dispatch({ type: INGREDIENT_DETAILS_CLOSE });
        dispatch({ type: ORDER_DETAILS_CLOSE });
      }}
    ></div>
  );
};

// ModalOverlay.propTypes = {
//   setActive: PropTypes.func.isRequired,
// };

export default ModalOverlay;
