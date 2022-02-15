import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAreCommentsLoaded, getComments } from '../../store/guitar-data/selectors';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils/common';
import AddToCartButton from '../add-to-cart-button/add-to-cart-button';
import GuitarDetails from '../guitar-details/guitar-details';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import Rating from '../rating/rating';


type ProductContainerProps = {
  guitar: Guitar,
}

function ProductContainer({ guitar }: ProductContainerProps): JSX.Element {

  const { previewImg, rating, name, price } = guitar;
  const comments = useSelector(getComments);
  const areCommentsLoaded = useSelector(getAreCommentsLoaded);

  const [isAddedToCartModalOpen, setIsAddedToCartModalOpen] = useState(false);

  const handleModalSuccessAddClose = () => {
    setIsAddedToCartModalOpen(false);
  };

  const handleAddingToCartSuccess = () => {
    setIsAddedToCartModalOpen(true);
  };

  return (
    <div className="product-container">
      {
        isAddedToCartModalOpen && <ModalSuccessAdd onClose={handleModalSuccessAddClose} />
      }
      <img
        className="product-container__img"
        src={`/${previewImg}`}
        width="90"
        height="235"
        alt={name}
      />
      <div className="product-container__info-wrapper">
        <h2 className="product-container__title title title--big title--uppercase">
          {name}
        </h2>
        {
          areCommentsLoaded && (
            <Rating
              rating={rating}
              comments={comments}
              className={'product-container__rating'}
            />)
        }
        <GuitarDetails guitar={guitar} />
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">
          Цена:
        </p>
        <p className="product-container__price-info product-container__price-info--value">
          {formatPrice(price)} ₽
        </p>
        <AddToCartButton
          className={'button--big product-container__button'}
          guitar={guitar}
          onSuccess={handleAddingToCartSuccess}
        >
          Добавить в корзину
        </AddToCartButton>
      </div>
    </div>
  );
}


export default ProductContainer;
