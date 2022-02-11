import cn from 'classnames';
import { MouseEvent, ReactNode, useState } from 'react';
import { Guitar } from '../../types/guitar';
import ModalAddToCart from '../modal-add-to-cart/modal-add-to-cart';


type AddToCardButtonProps = {
  className: string;
  children: ReactNode;
  guitar: Guitar;
  onSuccess: () => void;
}

function AddToCartButton({ className, children, guitar, onSuccess }: AddToCardButtonProps): JSX.Element {

  const buttonClasses = cn('button button--red', className);

  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState<boolean>(false);
  // const [isAddedToCartModalOpen, setIsAddedToCartModalOpen] = useState<boolean>(false);

  const handleAddToCardClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    setIsAddToCartModalOpen(true);
  };

  const handleAddToCartModalClose = () => {
    setIsAddToCartModalOpen(false);
  };

  // const handleModalSuccessAddClose = () => {
  //   setIsAddedToCartModalOpen(false);
  // };

  return (
    <>
      {/*{*/}
      {/*  isAddedToCartModalOpen && <ModalSuccessAdd onClose={handleModalSuccessAddClose} />*/}
      {/*}*/}
      {
        isAddToCartModalOpen && (
          <ModalAddToCart
            onClose={handleAddToCartModalClose}
            guitar={guitar}
            onSuccess={onSuccess}
          />
        )
      }
      <button
        className={buttonClasses}
        onClick={handleAddToCardClick}
      >
        {children}
      </button>
    </>
  );
}


export default AddToCartButton;
