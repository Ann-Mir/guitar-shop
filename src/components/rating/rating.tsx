import cn from 'classnames';
import { nanoid } from 'nanoid';
import { Comments } from '../../types/comment';


const MAX_STARS = 5;

type RatingProps = {
  rating: number,
  className?: string,
  comments?: Comments
}

function Rating({ rating, className, comments }: RatingProps): JSX.Element {

  const classes = cn('rate', className);
  const fullStars = Math.floor(rating);
  const emptyStars = MAX_STARS - fullStars;

  return (
    <div className={classes} aria-hidden="true">
      <span className="visually-hidden">Рейтинг:</span>
      {[...Array(fullStars)].map(() => (
        <svg key={nanoid()} width="12" height="11" aria-hidden="true" data-testid="full-star">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
      ))}
      {
        emptyStars > 0 ?
          [...Array(emptyStars)].map(() => (
            <svg key={nanoid()} width="12" height="11" aria-hidden="true" data-testid="empty-star">
              <use xlinkHref="#icon-star"></use>
            </svg>
          ))
          : null
      }
      <span className="rate__count">{comments ? comments.length : ''}</span>
      <span className="rate__message"></span>
    </div>
  );
}


export default Rating;
