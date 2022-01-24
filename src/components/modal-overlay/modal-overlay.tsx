import React, {ReactNode} from 'react';
import cn from 'classnames';

import './modal-overlay.css';


type ModalOverlayProps = {
  children: ReactNode;
  className?: string;
  onClose: () => void;
};

function ModalOverlay({ children, className, onClose }: ModalOverlayProps): JSX.Element {

  const classNames = cn('overlay', className);

  const handleClick = (evt: React.SyntheticEvent) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classNames} onClick={handleClick}>
      {children}
    </div>
  );
}


export default ModalOverlay;
