import { useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostingStatus } from '../../const';
import { setPostingStatus } from '../../store/actions';
import { getAreCommentsLoaded, getSortedComments } from '../../store/guitar-data/selectors';
import { Guitar } from '../../types/guitar';
import ReviewForm from '../review-form/review-form';
import Review from '../review/review';

type ReviewsWrapperProps = {
  guitar: Guitar
}

const COMMENTS_STEP = 3;

function ReviewsWrapper({ guitar }: ReviewsWrapperProps): JSX.Element {

  const dispatch = useDispatch();
  const comments = useSelector(getSortedComments);
  const areCommentsLoaded = useSelector(getAreCommentsLoaded);
  const { name, id } = guitar;
  const [commentsShown, setCommentsShown] = useState(COMMENTS_STEP);

  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  const handleReviewFormClose = () => {
    setIsReviewFormVisible(false);
    dispatch(setPostingStatus(PostingStatus.Unknown));
  };

  const handleShowMoreCommentsClick = () => {
    setCommentsShown((prevState) => prevState + COMMENTS_STEP);
  };

  const handleUpButtonClick = () => {
    setCommentsShown(COMMENTS_STEP);
  };

  const handleReviewButtonClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsReviewFormVisible(true);
  };

  return (
    <section className="reviews">
      {
        isReviewFormVisible && <ReviewForm id={id} name={name} onClose={handleReviewFormClose} />
      }
      <h3 className="reviews__title title title--bigger">
        Отзывы
      </h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="/"
        onClick={handleReviewButtonClick}
      >
        Оставить отзыв
      </a>
      {
        !areCommentsLoaded && (
          <p>Комментарии загружаются...</p>
        )
      }
      {
        areCommentsLoaded && comments && comments.slice(0, commentsShown).map(
          (review) => <Review key={review.id} review={review} />)
      }
      {
        (areCommentsLoaded && comments && (comments.length > commentsShown)) && (
          <button
            className="button button--medium reviews__more-button"
            onClick={handleShowMoreCommentsClick}
            data-testid="show-more-button"
          >
            Показать еще отзывы
          </button>
        )
      }
      {
        commentsShown > COMMENTS_STEP && (
          <a
            className="button button--up button--red-border button--big reviews__up-button"
            style={{zIndex: '1'}}
            href="#header"
            onClick={handleUpButtonClick}
            data-testid="up-button"
          >
            Наверх
          </a>
        )
      }
    </section>
  );
}


export default ReviewsWrapper;
