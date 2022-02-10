import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import Modal from '../modal/modal';


type ModalSuccessAddProps = {
  onClose: () => void,
}

function ModalSuccessAdd({ onClose }: ModalSuccessAddProps): JSX.Element {

  const history = useHistory();

  const handleCartClick = () => {
    history.push(AppRoute.Cart);
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="modal is-active modal--success">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={onClose}></div>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref="#icon-success"></use>
            </svg>
            <p className="modal__message">
              Товар успешно добавлен в корзину
            </p>
            <div className="modal__button-container modal__button-container--add">
              <button
                className="button button--small modal__button"
                onClick={handleCartClick}
                data-testid="modal-success-add-to-cart"
              >
                Перейти в корзину
              </button>
              <button
                className="button button--black-border button--small modal__button modal__button--right"
                data-testid="modal-success-add-close"
                onClick={onClose}
              >
                Продолжить покупки
              </button>
            </div>
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
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


export default ModalSuccessAdd;
