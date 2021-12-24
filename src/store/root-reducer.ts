import {combineReducers} from 'redux';
import {guitarsData} from './guitars-data/guitars-data';


export enum NameSpace {
  data = 'DATA',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: guitarsData,
});

export type RootState = ReturnType<typeof rootReducer>;
