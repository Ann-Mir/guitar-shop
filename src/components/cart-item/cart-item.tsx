import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GUITAR_TYPES } from '../../const';
import { updateCartGuitarQuantity } from '../../store/actions';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils/common';
import ModalCartDelete from '../modal-cart-delete/modal-cart-delete';


const MAX_QUANTITY = 99;
const MIN_QUANTITY = 0;
const QUANTITY_STEP = 1;

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
    if (evt.target.value === '') {
      return;
    }
    let value = Number(evt.target.value);
    if (value === MIN_QUANTITY) {
      value = MIN_QUANTITY + QUANTITY_STEP;
    }
    if (value < MIN_QUANTITY) {
      value = Math.abs(value);
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

  const handleMinusButtonClick = () => {
    if (quantity === (MIN_QUANTITY + QUANTITY_STEP)) {
      setIsRemoveModalOpen(true);
    } else {
      dispatch(updateCartGuitarQuantity(guitar, (Number(quantity) - QUANTITY_STEP)));
    }
  };

  const handlePlusButtonClick = () => {
    if (quantity === MAX_QUANTITY) {
      return;
    }
    dispatch(updateCartGuitarQuantity(guitar, (Number(quantity) + QUANTITY_STEP)));
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
        <span className="button-cross__icon" />
        <span className="cart-item__close-button-interactive-area" />
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
          onClick={handleMinusButtonClick}
          disabled={Number(quantity) === MIN_QUANTITY}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref='#icon-minus'/>
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
          value={
            quantity === MIN_QUANTITY
              ? MIN_QUANTITY + QUANTITY_STEP
              : Number(quantity).toString().replace(/^0+/, '')
          }
        />
        <button
          className="quantity__button"
          aria-label="Увеличить количество"
          data-testid="plus-button"
          onClick={handlePlusButtonClick}
          disabled={quantity === MAX_QUANTITY}
        >
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref='#icon-plus'/>
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
