import { CARDS_PER_PAGE, DEFAULT_PAGE } from './const';
import { Guitars } from './types/guitar';


export const mockGuitars: Guitars = [
  {
    id: 1,
    name: 'Честер Bass',
    vendorCode: 'SO757575',
    type: 'electric',
    description:'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
    previewImg: 'img/guitar-1.jpg',
    stringCount: 7,
    rating: 4,
    price: 17500,
    comments: [
      {
        id: '0',
        userName: 'Максим',
        advantage: 'Цена=качество.',
        disadvantage: 'Покрытие.',
        comment: 'Неплохо, но дорого.',
        rating: 4,
        createAt: '2021-09-28T13:00:41.845Z',
        guitarId: 1,
      },
      {
        id: '1',
        userName: 'Максим',
        advantage: 'Цена=качество.',
        disadvantage: 'Покрытие.',
        comment: 'Неплохо, но дорого.',
        rating: 3,
        createAt: '2021-09-29T13:00:41.845Z',
        guitarId: 1,
      },
      {
        id: '2',
        userName: 'Максим',
        advantage: 'Цена=качество.',
        disadvantage: 'Покрытие.',
        comment: 'Неплохо, но дорого.',
        rating: 5,
        createAt: '2021-09-30T13:00:41.845Z',
        guitarId: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'CURT Z300',
    vendorCode: 'TK129049',
    type: 'electric',
    description: 'Эргономичность гитары и качество сборки являются, пожалуй, её главными преимуществами. Идеальное расположение в руках музыканта дополняется прочностью конструкции из клёна.',
    previewImg: 'img/guitar-8.jpg',
    stringCount: 7,
    rating: 3.5,
    price: 29500,
    comments: [
      {
        id: '9237bc4b',
        userName: 'Паша',
        advantage: 'Хорошый звук.',
        disadvantage: 'Не рекомендую!',
        comment: 'В целом для домашнего использования и дворовых песен в самый раз!',
        rating: 4,
        createAt: '2022-01-07T13:00:41.846Z',
        guitarId: 2,
      },
    ],
  },
  {
    id: 3,
    name: 'Roman LX',
    vendorCode: 'RO111111',
    type: 'ukulele',
    description: 'Укулеле класса премиум от компании CURT, собравшая в себе все самые необходимые качесва: лёгкость корпуса, прочность струн и компактный размер.',
    previewImg: 'img/guitar-6.jpg',
    stringCount: 4,
    rating: 4,
    price: 6800,
    comments: [
      {
        id: '24c1-44e4-9b69',
        userName: 'Максим',
        advantage: 'Цена=качество.',
        disadvantage: 'Покрытие.',
        comment: 'Неплохо, но дорого.',
        rating: 4,
        createAt: '2021-09-28T13:00:41.845Z',
        guitarId: 1,
      },
      {
        id: 'e6802eecc984',
        userName: 'Максим',
        advantage: 'Цена=качество.',
        disadvantage: 'Покрытие.',
        comment: 'Неплохо, но дорого.',
        rating: 3,
        createAt: '2021-09-29T13:00:41.845Z',
        guitarId: 1,
      },
    ],
  },
];

export const mockState = {
  DATA: {
    guitars: mockGuitars,
    isDataLoaded: true,
    guitarsCount: 0,
  },
  SEARCH: {
    guitars: [],
  },
  FILTER: {
    minPrice: 1700,
    maxPrice: 35000,
  },
  PAGINATION: {
    currentPage: DEFAULT_PAGE,
    limit: CARDS_PER_PAGE,
    start: 0,
  },
};
