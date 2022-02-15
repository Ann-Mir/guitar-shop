import { useDispatch } from 'react-redux';
import { GUITAR_TYPES } from '../../const';
import { addToCart } from '../../store/actions';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils/common';
import Modal from '../modal/modal';


type AddToCartModalProps = {
  onClose: () => void,
  guitar: Guitar,
  onSuccess: (isAdded: boolean) => void,
}

function ModalAddToCart({ onClose, guitar, onSuccess }: AddToCartModalProps): JSX.Element {

  const {
    previewImg,
    name,
    price,
    vendorCode,
    stringCount,
    type,
  } = guitar;

  const dispatch = useDispatch();

  const handleAddToCartClick = () => {
    dispatch(addToCart(guitar));
    onSuccess(true);
    onClose();
  };

  return (
    <Modal onClose={onClose} >
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className='modal__overlay' data-close-modal onClick={onClose}/>
          <div className="modal__content">
            <h2 className="modal__header title title--medium">Добавить товар в корзину</h2>
            <div className="modal__info">
              <img
                className="modal__img"
                src={`/${previewImg}`}
                width="67"
                height="137"
                alt={name}
              />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">
                  {name}
                </h3>
                <p className="modal__product-params modal__product-params--margin-11">
                  Артикул: {vendorCode}
                </p>
                <p className="modal__product-params">
                  {GUITAR_TYPES[type]}, {stringCount} струнная
                </p>
                <p className="modal__price-wrapper">
                  <span className="modal__price">Цена:</span>
                  <span className="modal__price">{formatPrice(price)} ₽</span>
                </p>
              </div>
            </div>
            <div className="modal__button-container">
              <button
                className="button button--red button--big modal__button modal__button--add"
                onClick={handleAddToCartClick}
                data-testid="modal-add-to-cart-button"
              >
                Добавить в корзину
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={onClose}
              data-testid="modal-add-to-cart-close"
            >
              <span className='button-cross__icon'/>
              <span className='modal__close-btn-interactive-area'/>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}


export default ModalAddToCart;
