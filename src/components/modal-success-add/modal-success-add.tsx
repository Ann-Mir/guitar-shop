import { useHistory, useLocation } from 'react-router-dom';
import { AppRoute } from '../../const';
import Modal from '../modal/modal';


type ModalSuccessAddProps = {
  onClose: () => void,
}

function ModalSuccessAdd({ onClose }: ModalSuccessAddProps): JSX.Element {

  const history = useHistory();

  const { pathname } = useLocation();

  const handleCartClick = () => {
    history.push(AppRoute.Cart);
    onClose();
  };

  const handleShoppingClick = () => {
    if (pathname !== AppRoute.Guitars) {
      history.push(AppRoute.Guitars);
    }
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <div className="modal is-active modal--success">
        <div className="modal__wrapper">
          <div className='modal__overlay' data-close-modal onClick={onClose}/>
          <div className="modal__content">
            <svg className="modal__icon" width="26" height="20" aria-hidden="true">
              <use xlinkHref='#icon-success'/>
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
                onClick={handleShoppingClick}
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
              <span className='button-cross__icon'/>
              <span className='modal__close-btn-interactive-area'/>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}


export default ModalSuccessAdd;
