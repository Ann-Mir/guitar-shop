import { Comment } from '../../types/comment';
import Rating from '../rating/rating';


type ReviewProps = {
  review: Comment,
}

function Review({ review }: ReviewProps): JSX.Element {

  const {
    createAt,
    rating,
    advantage,
    disadvantage,
    comment,
    userName,
  } = review;

  const date = new Date(createAt).toLocaleString('ru',
    { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">
          {userName}
        </h4>
        <span className="review__date">{date}</span>
      </div>
      <Rating rating={rating} className={'review__rating-panel'} />
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">
        {advantage}
      </p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">
        {comment}
      </p>
    </div>
  );
}


export default Review;
