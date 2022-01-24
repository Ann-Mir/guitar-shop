import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Guitar } from '../../types/guitar';
import Rating from '../rating/rating';


type CardProps = {
  guitar: Guitar;
};

function Card({ guitar }: CardProps): JSX.Element {

  const { previewImg, rating, name, price, comments, id } = guitar;

  return (
    <div className="product-card" data-testid="product-card">
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
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          to={generatePath(AppRoute.Guitar, { id: id })}
          className="button button--mini"
        >
          Подробнее
        </Link>
        <Link
          className="button button--red button--mini button--add-to-cart"
          to={AppRoute.UnderConstruction}
        >
          Купить
        </Link>
      </div>
    </div>
  );
}

export default Card;
