import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import styles from './modal.module.css';
import ModalOverlay from './modal-overlay/modal-overlay';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modal = document.getElementById('modal');

type TModalProps = {
  children: JSX.Element;
  onCloseModal?: () => void;
};

const Modal = ({ children, onCloseModal }: TModalProps): JSX.Element | null => {
  useEffect(() => {
    const handleESCclose = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        return onCloseModal ? onCloseModal() : undefined;
      }
    };
    document.addEventListener('keydown', handleESCclose);

    return () => document.removeEventListener('keydown', handleESCclose);
  }, [onCloseModal]);

  return modal
    ? createPortal(
        <>
          <div className={styles.modal__content__active}>
            {children}
            <div className={styles.closeIcon} data-test="modal-close-icon">
              <CloseIcon onClick={onCloseModal} type="primary" />
            </div>
          </div>
          <ModalOverlay onCloseModal={onCloseModal} />
        </>,

        modal
      )
    : null;
};

export default Modal;
