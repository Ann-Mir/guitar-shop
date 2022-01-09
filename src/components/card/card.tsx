import { nanoid } from 'nanoid';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Guitar } from '../../types/guitar';


const MAX_STARS = 5;

type CardProps = {
  guitar: Guitar;
};

function Card({ guitar }: CardProps): JSX.Element {

  const { previewImg, rating, name, price, comments } = guitar;
  const fullStars = Math.floor(rating);
  const emptyStars = MAX_STARS - fullStars;

  return (
    <div className="product-card">
      <img
        src={previewImg}
        width="75"
        height="190"
        alt={name}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate" aria-hidden="true">
          <span className="visually-hidden">Рейтинг:</span>
          {[...Array(fullStars)].map(() => (
            <svg key={nanoid()} width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
          ))}
          {
            emptyStars > 0 ?
              [...Array(emptyStars)].map(() => (
                <svg key={nanoid()} width="12" height="11" aria-hidden="true">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              ))
              : null
          }
          <span className="rate__count">{comments ? comments.length : 0}</span>
          <span className="rate__message"></span>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link
          to={generatePath(AppRoute.Guitar, { id: 1 })}
          className="button button--mini"
        >
          Подробнее
        </Link>
        <a
          className="button button--red button--mini button--add-to-cart"
          href="#"
        >
          Купить
        </a>
      </div>
    </div>
  );
}

export default Card;
