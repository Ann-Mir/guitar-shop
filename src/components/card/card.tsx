import { useState } from 'react';
import { useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, NOT_FOUND_INDEX } from '../../const';
import { getGuitarsInCart } from '../../store/cart/selectors';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils/common';
import AddToCartButton from '../add-to-cart-button/add-to-cart-button';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import Rating from '../rating/rating';


type CardProps = {
  guitar: Guitar;
};

function Card({ guitar }: CardProps): JSX.Element {

  const { previewImg, rating, name, price, comments, id } = guitar;
  const guitarsInCart = useSelector(getGuitarsInCart);
  const index = guitarsInCart.findIndex((item) => item.id === id);

  const [isAddedToCartModalOpen, setIsAddedToCartModalOpen] = useState<boolean>(false);

  const handleModalSuccessAddClose = () => {
    setIsAddedToCartModalOpen(false);
  };

  const handleAddingToCartSuccess = () => {
    setIsAddedToCartModalOpen(true);
  };

  return (
    <div className="product-card" data-testid="product-card">
      {
        isAddedToCartModalOpen && <ModalSuccessAdd onClose={handleModalSuccessAddClose} />
      }
      <img
        src={previewImg}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <Rating
          rating={rating}
          className={'product-card__rate'}
          comments={comments}
        />
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatPrice(price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          to={generatePath(AppRoute.Guitar, { id: id })}
          className="button button--mini"
        >
          Подробнее
        </Link>
        {
          (index > NOT_FOUND_INDEX) ? (
            <Link
              className="button button--red-border button--mini button--in-cart"
              to={AppRoute.Cart}
            >
              В Корзине
            </Link>
          ) : (
            <AddToCartButton
              className={'button--mini button--add-to-cart'}
              guitar={guitar}
              onSuccess={handleAddingToCartSuccess}
            >
              Купить
            </AddToCartButton>
          )
        }
      </div>
    </div>
  );
}

export default Card;
