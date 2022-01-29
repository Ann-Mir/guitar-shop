import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import { ESCAPE_KEY_CODE } from '../../const';


type ModalTypeProps = {
  children: ReactNode;
  onClose: () => void;
};


function Modal({ children, onClose }: ModalTypeProps): JSX.Element {

  let modalRoot = document.getElementById('modal-root');

  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }

  useEffect(() => {

    const handleEscKeydown = (evt: KeyboardEvent) => {
      if (evt.key === ESCAPE_KEY_CODE){
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKeydown);

    return function () {
      window.removeEventListener('keydown', handleEscKeydown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <FocusLock>
      <RemoveScroll>
        {children}
      </RemoveScroll>
    </FocusLock>,
    modalRoot,
  );
}


export default Modal;
