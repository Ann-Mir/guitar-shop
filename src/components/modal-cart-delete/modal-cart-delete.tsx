import { useDispatch } from 'react-redux';
import { GUITAR_TYPES } from '../../const';
import { removeItemFromCart } from '../../store/actions';
import { Guitar } from '../../types/guitar';
import { formatPrice } from '../../utils/common';
import Modal from '../modal/modal';


type ModalCartDeleteProps = {
  onClose: () => void,
  guitar: Guitar,
}

function ModalCartDelete({ onClose, guitar }: ModalCartDeleteProps): JSX.Element {

  const {
    previewImg,
    name,
    price,
    type,
    vendorCode,
    stringCount,
  } = guitar;

  const dispatch = useDispatch();

  const handleRemoveItemClick = () => {
    dispatch(removeItemFromCart(guitar));
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="modal is-active">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onClose}></div>
          <div className="modal__content">
            <h2 className="modal__header title title--medium title--red">
              Удалить этот товар?
            </h2>
            <div className="modal__info">
              <img
                className="modal__img"
                src={previewImg}
                width="67"
                height="137"
                alt={name}
              />
              <div className="modal__info-wrapper">
                <h3 className="modal__product-name title title--little title--uppercase">
                  Гитара {name}
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
                className="button button--small modal__button"
                data-testid="modal-remove-from-cart-button"
                onClick={handleRemoveItemClick}
              >
                Удалить товар
              </button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                onClick={onClose}
              >
                Продолжить покупки
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              data-testid="modal-cart-delete-close"
              onClick={onClose}
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}


export default ModalCartDelete;
