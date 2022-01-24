import { useState } from 'react';
import { Guitar, GuitarTypes } from '../../types/guitar';


type GuitarDetailsProps = {
  guitar: Guitar,
}

const GUITAR_TYPES: GuitarTypes = {
  electric: 'Электрогитара',
  acoustic: 'Акустическая гитара',
  ukulele: 'Укулеле',
};

function GuitarDetails({ guitar }: GuitarDetailsProps): JSX.Element {

  const { vendorCode, type, stringCount, description } = guitar;

  const [isCharacteristicsActive, setIsCharacteristicsActive] = useState(true);

  const handleTabClick = () => {
    setIsCharacteristicsActive((prevState) => !prevState);
  };

  return (
    <div className="tabs">
      <a
        className={`button ${isCharacteristicsActive ? '' : 'button--black-border'} button--medium tabs__button`}
        href="#characteristics"
        onClick={handleTabClick}
        data-testid="characteristics-link"
      >
        Характеристики
      </a>
      <a
        className={`button ${isCharacteristicsActive ? 'button--black-border': ''} button--medium tabs__button`}
        href="#description"
        onClick={handleTabClick}
        data-testid="description-link"
      >
        Описание
      </a>
      <div
        className={`tabs__content ${isCharacteristicsActive ? '' : 'hidden'}`}
        id="characteristics"
      >
        <table className="tabs__table">
          <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">{vendorCode}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">{GUITAR_TYPES[type]}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{stringCount} струнная</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className={`tabs__content ${isCharacteristicsActive ? 'hidden' : ''}`}
        id="description"
      >
        <p className="tabs__product-description">
          {description}
        </p>
      </div>
    </div>
  );
}


export default GuitarDetails;
