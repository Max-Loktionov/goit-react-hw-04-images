import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal(props) {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
  });
  const onBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  const onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  return createPortal(
    <div className={style.overlay} onClick={onBackdrop}>
      <div className={style.modal}>{props.children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;
