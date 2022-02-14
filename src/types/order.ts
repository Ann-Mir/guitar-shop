import { PromoCode } from '../const';


export type TCouponPost = {
  coupon: PromoCode;
}

export type TOrderPost = {
  guitarsIds: Array<number>;
  coupon: PromoCode | null | '';
}
