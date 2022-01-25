import { useState } from 'react';
import { Guitar } from '../../types/guitar';
import ReviewForm from '../review-form/review-form';
import ReviewSuccessModal from '../review-success-modal/review-success-modal';
import Review from '../review/review';

type ReviewsWrapperProps = {
  guitar: Guitar
}

const COMMENTS_STEP = 3;

function ReviewsWrapper({ guitar }: ReviewsWrapperProps): JSX.Element {

  const comments = guitar.comments?.slice().reverse();
  const { name, id } = guitar;
  const [commentsShown, setCommentsShown] = useState(COMMENTS_STEP);


  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [isReviewSuccessModalVisible, setIsReviewSuccessModalVisible] = useState(false);

  const handleReviewFormClose = () => {
    setIsReviewFormVisible(false);
  };

  const handleShowMoreCommentsClick = () => {
    setCommentsShown((prevState) => prevState + COMMENTS_STEP);
  };

  const handleUpButtonClick = () => {
    setCommentsShown(COMMENTS_STEP);
  };

  const handleReviewButtonClick = () => {
    setIsReviewFormVisible(true);
  };

  return (
    <section className="reviews">
      {
        isReviewFormVisible && <ReviewForm id={id} name={name} onClose={handleReviewFormClose} />
      }
      {
        isReviewSuccessModalVisible && <ReviewSuccessModal onClose={handleReviewFormClose} />
      }
      <h3 className="reviews__title title title--bigger">
        Отзывы
      </h3>
      <a
        className="button button--red-border button--big reviews__sumbit-button"
        href="#"
        onClick={handleReviewButtonClick}
      >
        Оставить отзыв
      </a>
      {
        comments && comments.slice(0, commentsShown).map(
          (review) => <Review key={review.id} review={review} />)
      }
      {
        (comments && (comments.length > commentsShown)) && (
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
