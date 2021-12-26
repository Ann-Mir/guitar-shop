import { APIRoute } from '../const';
import { ThunkActionResult } from '../types/action';
import { Guitar } from '../types/guitar';
import { loadGuitars } from './action';


export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch,
    _getState,
    api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars);
    dispatch(loadGuitars(data));
  };
