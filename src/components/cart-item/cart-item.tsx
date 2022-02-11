import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GUITAR_TYPES } from '../../const';
import { updateCartGuitarQuantity } from '../../store/actions';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils/common';
import ModalCartDelete from '../modal-cart-delete/modal-cart-delete';


const MAX_QUANTITY = 99;
const MIN_QUANTITY = 0;

type CartItemProps = {
  guitar: Guitar;
}

function CartItem({ guitar }: CartItemProps): JSX.Element {

  const {
    previewImg,
    name,
    price,
    type,
    vendorCode,
    stringCount,
    quantity,
  } = guitar;

  const dispatch = useDispatch();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    let value = Number(evt.target.value);
    if (value < MIN_QUANTITY) {
      value = MIN_QUANTITY;
    }
    if (value > MAX_QUANTITY) {
      value = MAX_QUANTITY;
    }
    dispatch(updateCartGuitarQuantity(guitar, value));
  };

  const handleRemoveButtonClick = () => {
    setIsRemoveModalOpen(true);
  };

  const handleModalCartDeleteCloseClick = () => {
    setIsRemoveModalOpen(false);
  };

  return (
    <div className="cart-item" data-testid="cart-item">
      {isRemoveModalOpen && (
        <ModalCartDelete onClose={handleModalCartDeleteCloseClick} guitar={guitar} />
      )}
      <button
        className="cart-item__close-button button-cross"
        data-testid="delete-from-cart-button"
        type="button" aria-label="Удалить"
        onClick={handleRemoveButtonClick}
      >
        <span className="button-cross__icon"></span>
        <span className="cart-item__close-button-interactive-area"></span>
      </button>
      <div className="cart-item__image">
        <img
          src={previewImg}
          width="55"
          height="130"
          alt={`${GUITAR_TYPES[type]} ${name}`}
        />
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{`${GUITAR_TYPES[type]} ${name}`}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{GUITAR_TYPES[type]}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{formatPrice(price)} ₽</div>
      <div className="quantity cart-item__quantity">
        <button
          className="quantity__button"
          aria-label="Уменьшить количество"
          data-testid="minus-button"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"></use>
          </svg>
        </button>
        <input
          className="quantity__input"
          type="number"
          placeholder="1"
          id="2-count"
          name="2-count"
          min="0"
          max="99"
          onChange={handleInputChange}
          value={quantity}
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          data-testid="plus-button"
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"></use>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">
        {formatPrice(price * Number(quantity))} ₽
      </div>
    </div>
  );
}


export default CartItem;