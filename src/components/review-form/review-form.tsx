import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostingStatus } from '../../const';
import { setPostingStatus } from '../../store/actions';
import { postCommentAction } from '../../store/api-actions';
import { getPostingStatus } from '../../store/guitar-data/selectors';
import { CommentPost } from '../../types/comment';
import Modal from '../modal/modal';
import ReviewSuccess from '../review-success/review-success';

type ReviewFormProps = {
  id: number;
  name: string;
  onClose: () => void;
};

function ReviewForm({ id, name, onClose }: ReviewFormProps): JSX.Element {

  const dispatch = useDispatch();
  const postingStatus = useSelector(getPostingStatus);

  const [userName, setUserName] = useState<string>('');
  const [isUserNameValid, setIsUserNameValid] = useState(true);

  const [advantage, setAdvantage] = useState<string>('');

  const [disadvantage, setDisadvantage] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const [rating, setRating] = useState<number | null>(null);
  const [isRatingValid, setIsRatingValid] = useState(true);


  const handleRatingClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsRatingValid(true);
    setRating(Number(evt.target.value));
  };

  const handleUserNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setIsUserNameValid(true);
    setUserName(evt.target.value);
  };

  const handleAdvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setAdvantage(evt.target.value);
  };

  const handleDisadvantageChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setDisadvantage(evt.target.value);
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const checkIfFormValid = () => {
    if (!userName) {
      setIsUserNameValid(false);
    }
    if(!rating) {
      setIsRatingValid(false);
    }

    return userName && rating && advantage && disadvantage && comment;
  };

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();

    if (postingStatus === PostingStatus.Posting) {
      return;
    }

    dispatch(setPostingStatus(PostingStatus.Posting));

    const isValid = checkIfFormValid();

    if (isValid) {
      const commentPost: CommentPost = {
        guitarId: id,
        userName: userName,
        advantage: advantage,
        disadvantage: disadvantage,
        comment: comment,
        rating: Number(rating),
      };
      dispatch(postCommentAction(commentPost));
    } else {
      dispatch(setPostingStatus(PostingStatus.Unknown));
    }
  };

  return (
    <Modal onClose={onClose}>
      {
        postingStatus === PostingStatus.Success ? <ReviewSuccess onClose={onClose} /> : (
          <div className="modal is-active modal--review modal-for-ui-kit">
            <div className="modal__wrapper">
              <div className="modal__overlay" data-close-modal onClick={onClose}></div>
              <div className="modal__content">
                <h2 className="modal__header modal__header--review title title--medium">
                  Оставить отзыв
                </h2>
                <h3 className="modal__product-name title title--medium-20 title--uppercase">
                  {name}
                </h3>
                <form className="form-review" onSubmit={handleFormSubmit}>
                  <div className="form-review__wrapper">
                    <div className="form-review__name-wrapper">
                      <label
                        className="form-review__label form-review__label--required"
                        htmlFor="user-name"
                      >
                        Ваше Имя
                      </label>
                      <input
                        className="form-review__input form-review__input--name"
                        id="user-name"
                        type="text"
                        autoComplete="off"
                        value={userName}
                        onChange={handleUserNameChange}
                      />
                      {
                        !isUserNameValid && (
                          <span className="form-review__warning">
                            Заполните поле
                          </span>
                        )
                      }
                    </div>
                    <div>
                      <span className="form-review__label form-review__label--required">
                        Ваша Оценка
                      </span>
                      <div className="rate rate--reverse" onChange={handleRatingClick}>
                        <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" />
                        <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                        <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" />
                        <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                        <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" />
                        <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                        <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" />
                        <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                        <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" />
                        <label className='rate__label' htmlFor='star-1' title='Ужасно' />
                        <span className="rate__count" />
                        {
                          !isRatingValid && (
                            <span className="rate__message">
                              Поставьте оценку
                            </span>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <label className="form-review__label" htmlFor="pros">
                    Достоинства
                  </label>
                  <input
                    className="form-review__input"
                    id="pros"
                    type="text"
                    autoComplete="off"
                    value={advantage}
                    onChange={handleAdvantageChange}
                    required
                  />
                  <label className="form-review__label" htmlFor="disadv">
                    Недостатки
                  </label>
                  <input
                    className="form-review__input"
                    id="disadv"
                    type="text"
                    autoComplete="off"
                    value={disadvantage}
                    onChange={handleDisadvantageChange}
                    required
                  />
                  <label className="form-review__label" htmlFor="comment">
                    Комментарий
                  </label>
                  <textarea
                    className='form-review__input form-review__input--textarea'
                    id='comment'
                    rows={10}
                    autoComplete='off'
                    value={comment}
                    onChange={handleCommentChange}
                    required
                  />
                  <button
                    className="button button--medium-20 form-review__button"
                    type="submit"
                    disabled={postingStatus === PostingStatus.Posting}
                  >
                    Отправить отзыв
                  </button>
                </form>
                <button
                  className="modal__close-btn button-cross"
                  type="button"
                  aria-label="Закрыть"
                  onClick={onClose}
                >
                  <span
                    className='button-cross__icon'
                  />
                  <span className="modal__close-btn-interactive-area"></span>
                </button>
              </div>
            </div>
          </div>
        )
      }
    </Modal>
  );
}

export default ReviewForm;
