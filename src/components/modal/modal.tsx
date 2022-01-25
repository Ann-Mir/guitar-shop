import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FocusLock from 'react-focus-lock';
import {RemoveScroll} from 'react-remove-scroll';
import { ESCAPE_KEY_CODE } from '../../const';


type ModalTypeProps = {
  children: ReactNode;
  onClose: () => void;
};

const modalRoot = document.getElementById('modal-root')!;

function Modal({ children, onClose }: ModalTypeProps): JSX.Element {

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === ESCAPE_KEY_CODE){
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscKeydown);
    return function () {
      window.removeEventListener('keydown', handleEscKeydown);
    };
  });

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
