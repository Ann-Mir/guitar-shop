import { useState, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute, NOT_FOUND_INDEX } from '../../const';
import { getGuitarsInCart } from '../../store/cart/selectors';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils/common';
import ModalAddToCart from '../modal-add-to-cart/modal-add-to-cart';
import ModalSuccessAdd from '../modal-success-add/modal-success-add';
import Rating from '../rating/rating';


type CardProps = {
  guitar: Guitar;
};

function Card({ guitar }: CardProps): JSX.Element {

  const { previewImg, rating, name, price, comments, id } = guitar;
  const guitarsInCart = useSelector(getGuitarsInCart);
  const index = guitarsInCart.findIndex((item) => item.id === id);

  const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState<boolean>(false);
  const [isAddedToCartModalOpen, setIsAddedToCartModalOpen] = useState<boolean>(false);

  const handleAddToCardClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsAddToCartModalOpen(true);
  };

  const handleAddToCartModalClose = () => {
    setIsAddToCartModalOpen(false);
  };

  const handleModalSuccessAddClose = () => {
    setIsAddedToCartModalOpen(false);
  };

  return (
    <div className="product-card" data-testid="product-card">
      {
        isAddedToCartModalOpen && <ModalSuccessAdd onClose={handleModalSuccessAddClose} />
      }
      {
        isAddToCartModalOpen && (
          <ModalAddToCart
            onClose={handleAddToCartModalClose}
            guitar={guitar}
            onSuccess={setIsAddedToCartModalOpen}
          />
        )
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
            <Link
              className="button button--red button--mini button--add-to-cart"
              to="/"
              onClick={handleAddToCardClick}
            >
              Купить
            </Link>
          )
        }
      </div>
    </div>
  );
}

export default Card;
