import styles from './modal-overlay.module.css';

const ModalOverlay = ({ onCloseModal }) => {
  return <div className={styles.active} onClick={onCloseModal}></div>;
};

export default ModalOverlay;
