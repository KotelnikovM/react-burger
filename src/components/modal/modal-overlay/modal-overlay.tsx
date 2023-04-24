import styles from './modal-overlay.module.css';

type TModalOverlayProps = {
  onCloseModal?: () => void;
};

const ModalOverlay = ({ onCloseModal }: TModalOverlayProps): JSX.Element => {
  return <div className={styles.active} onClick={onCloseModal}></div>;
};

export default ModalOverlay;
