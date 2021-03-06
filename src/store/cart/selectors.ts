import { PromoCode, PromoCodeStatus } from '../../const';
import { Guitars } from '../../types/guitar';
import {NameSpace} from '../root-reducer';
import { State } from '../../types/state';
import {createSelector} from 'reselect';

const MAX_PERCENT = 100;

export const getGuitarsInCart = (state: State): Guitars => state[NameSpace.cartGuitars].cartGuitars;
export const getQuantityInCart = createSelector(
  getGuitarsInCart,
  (guitars) => guitars.reduce(
    (total, item) => total + Number(item.quantity), 0));

export const getTotalCartPrice = createSelector(
  getGuitarsInCart,
  (guitars) => guitars.reduce(
    (total, guitar) => total + Number(guitar.quantity) * guitar.price, 0));

export const getCoupon = (state: State): PromoCode | '' => state[NameSpace.cartGuitars].coupon;
export const getPromoCodeStatus = (state: State): PromoCodeStatus => state[NameSpace.cartGuitars].promoCodeStatus;
export const getDiscount = (state: State): number => state[NameSpace.cartGuitars].discount;

export const getDiscountAmount = createSelector(
  getTotalCartPrice,
  getDiscount,
  (totalCartPrice, discount) =>
    Math.round(totalCartPrice * (discount / MAX_PERCENT)));

export const getPriceWithDiscount = createSelector(

  getTotalCartPrice,
  getDiscountAmount,
  (totalCartPrice, discount) =>
    totalCartPrice - discount);
