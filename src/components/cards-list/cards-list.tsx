import { useSelector } from 'react-redux';
import { CARDS_PER_PAGE } from '../../const';
import { getGuitars, getLoadedDataStatus } from '../../store/guitars-data/selectors';
import { Guitar } from '../../types/guitar';
import Card from '../card/card';
import PlaceholderLoading from 'react-placeholder-loading';


function CardsList(): JSX.Element {

  const isDataLoaded = useSelector(getLoadedDataStatus);
  const guitars = useSelector(getGuitars);

  return (
    <div
      data-testid="catalog"
      className="cards catalog__cards"
      style={{position: 'relative', width: '100%', height: '100%'}}
    >
      {
        isDataLoaded && guitars.length === 0 && (
          <p style={{fontSize: '18px', fontWeight: 'bold', width: '100%'}}>
            По вашему запросу ничего не найдено
          </p>
        )
      }
      {
        isDataLoaded && (
          guitars.slice(0, CARDS_PER_PAGE)
            .map((guitar: Guitar) => <Card key={guitar.id} guitar={guitar} />)
        )
      }
      {
        !isDataLoaded && (
          [...Array(CARDS_PER_PAGE)].map(
            (index) => (
              <PlaceholderLoading
                key={index}
                shape="rect"
                width={220}
                height={310}
                colorStart="#f6f8fa"
                colorEnd="#b6b8b9"
              />))
        )
      }
    </div>
  );
}

export default CardsList;
