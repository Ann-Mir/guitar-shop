import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../types/action';
import {Guitars} from '../types/guitar';


export const loadGuitars = createAction(
  ActionType.LoadGuitars,
  (guitars: Guitars) => ({
    payload: {
      guitars,
    },
  }),
);
