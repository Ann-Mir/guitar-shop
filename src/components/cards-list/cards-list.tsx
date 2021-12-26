import { useSelector } from 'react-redux';
import { getGuitars } from '../../store/guitars-data/selectors';
import { Guitar } from '../../types/guitar';
import Card from '../card/card';


const CARDS_PER_PAGE = 9;

function CardsList(): JSX.Element {

  const guitars = useSelector(getGuitars);

  return (
    <div className="cards catalog__cards"> {
      guitars
        .slice(0, CARDS_PER_PAGE)
        .map((guitar: Guitar) => <Card key={guitar.id} guitar={guitar} />)
    }
    </div>
  );
}

export default CardsList;
