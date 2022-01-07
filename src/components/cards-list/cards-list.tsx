import { useSelector } from 'react-redux';
import { CARDS_PER_PAGE } from '../../const';
import { getGuitars, getLoadedDataStatus } from '../../store/guitars-data/selectors';
import { Guitar } from '../../types/guitar';
import Card from '../card/card';
import Spinner from '../spinner/spinner';


function CardsList(): JSX.Element {

  const isDataLoaded = useSelector(getLoadedDataStatus);
  const guitars = useSelector(getGuitars);

  return (
    <div
      className="cards catalog__cards"
      style={{position: 'relative', width: '100%', height: '100%'}}
    >
      {
        isDataLoaded
          ?
          guitars.slice(0, CARDS_PER_PAGE)
            .map((guitar: Guitar) => <Card key={guitar.id} guitar={guitar} />)
          : <Spinner />
      }
    </div>
  );
}

export default CardsList;
