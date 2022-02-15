import { PromoCode, PromoCodeStatus } from '../../const';
import { mockCartGuitar, mockCartGuitarToAdd } from '../../utils/test-utils';
import {
  addToCart,
  removeItemFromCart,
  setCoupon,
  setDiscount,
  setPromoCodeStatus,
  updateCartGuitarQuantity
} from '../actions';
import { cart } from './cart';


describe('Reducer: Cart', () => {
  const state = {
    cartGuitars: [],
    coupon: PromoCode.Default,
    discount: 0,
    promoCodeStatus: PromoCodeStatus.Unknown,
  };

  it('should return initial state without additional parameters', () => {

    expect(cart(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should add guitar to cart by addToCart', () => {

    expect(cart(state, addToCart(mockCartGuitarToAdd)))
      .toEqual({
        ...state,
        cartGuitars: [mockCartGuitar],
      });
  });

  it('should update cart guitar quantity by updateCartGuitarQuantity', () => {

    const initialState = {
      cartGuitars: [mockCartGuitar],
      coupon: PromoCode.Default,
      discount: 0,
      promoCodeStatus: PromoCodeStatus.Unknown,
    };

    expect(cart(initialState, updateCartGuitarQuantity(mockCartGuitarToAdd, 2)))
      .toEqual({
        ...state,
        cartGuitars: [{...mockCartGuitar, quantity: 2}],
      });
  });

  it('should remove item from cart by removeItemFromCart', () => {

    const initialState = {
      cartGuitars: [mockCartGuitar],
      coupon: PromoCode.Default,
      discount: 0,
      promoCodeStatus: PromoCodeStatus.Unknown,
    };

    expect(cart(initialState, removeItemFromCart(mockCartGuitarToAdd)))
      .toEqual({
        ...state,
        cartGuitars: [],
      });
  });

  it('should update promo code status by setPromoCodeStatus', () => {

    expect(cart(state, setPromoCodeStatus(PromoCodeStatus.Success)))
      .toEqual({
        ...state,
        promoCodeStatus: PromoCodeStatus.Success,
      });
  });

  it('should set discount by setDiscount', () => {

    const fakeDiscount = 25;

    expect(cart(state, setDiscount(fakeDiscount)))
      .toEqual({
        ...state,
        discount: fakeDiscount,
      });
  });

  it('should set coupon by setCoupon', () => {

    expect(cart(state, setCoupon(PromoCode.Medium)))
      .toEqual({
        ...state,
        coupon: PromoCode.Medium,
      });
  });
});
