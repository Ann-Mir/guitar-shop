import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCommentsAction, fetchGuitarAction } from '../../../store/api-actions';
import { getGuitar, getIsGuitarLoaded } from '../../../store/guitar-data/selectors';
import Breadcrumbs from '../../breadcrumbs/breadcrumbs';
import MainLayout from '../../main-layout/main-layout';
import ProductContainer from '../../product-container/product-container';
import ReviewsWrapper from '../../reviews-wrapper/reviews-wrapper';
import Spinner from '../../spinner/spinner';

type TParams = {
  id: string;
};

function GuitarPage(): JSX.Element {

  const { id } = useParams<TParams>();
  const dispatch = useDispatch();
  const guitar = useSelector(getGuitar);
  const isGuitarLoaded = useSelector(getIsGuitarLoaded);

  useEffect(() => {
    dispatch(fetchGuitarAction(id));
    dispatch(fetchCommentsAction(id));
  }, []);

  return (
    <MainLayout>
      {isGuitarLoaded && guitar ? (
        <>
          <h1 className="page-content__title title title--bigger">{guitar.name}</h1>
          <Breadcrumbs />
          <ProductContainer guitar={guitar} />
          <ReviewsWrapper guitar={guitar}/>
        </>
      ) : <Spinner />}
    </MainLayout>
  );
}


export default GuitarPage;
