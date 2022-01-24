import { Guitar } from '../../types/guitar';
import GuitarDetails from '../guitar-details/guitar-details';
import Rating from '../rating/rating';


type ProductContainerProps = {
  guitar: Guitar,
}

function ProductContainer({ guitar }: ProductContainerProps): JSX.Element {

  const { previewImg, rating, name, price } = guitar;

  return (
    <div className="product-container">
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
        <Rating rating={rating} className={'product-container__rating'} />
        <GuitarDetails guitar={guitar} />
      </div>
      <div className="product-container__price-wrapper">
        <p className="product-container__price-info product-container__price-info--title">
          Цена:
        </p>
        <p className="product-container__price-info product-container__price-info--value">
          {price} ₽
        </p>
        <a
          className="button button--red button--big product-container__button"
          href="#"
        >
          Добавить в корзину
        </a>
      </div>
    </div>
  );
}


export default ProductContainer;
