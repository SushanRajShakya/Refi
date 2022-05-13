import {
  SET_IS_COMPLETED,
  SET_FULL_NAME,
  SET_OFFER_EXPIRY_DATE,
  SET_IS_EXPIRED,
  SET_IS_USER_VALID,
  SET_USER_DATA,
  SET_IS_GIFT_CARD_REDEEMED,
  SET_REDEMPTION_EMAIL,
  SET_REDEEM_CODE_AVAILABILITY,
} from './types/user';

export const setIsCompleted = value => ({
  type: SET_IS_COMPLETED,
  payload: value,
});

export const setFullName = value => ({
  type: SET_FULL_NAME,
  payload: value,
});

export const setOfferExpiryDate = value => ({
  type: SET_OFFER_EXPIRY_DATE,
  payload: value,
});

export const setIsExpired = value => ({
  type: SET_IS_EXPIRED,
  payload: value,
});

export const setIsUserValid = value => ({
  type: SET_IS_USER_VALID,
  payload: value,
});

export const setIsGiftCardRedeemed = value => ({
  type: SET_IS_GIFT_CARD_REDEEMED,
  payload: value,
});

export const setRedemptionEmail = value => ({
  type: SET_REDEMPTION_EMAIL,
  payload: value,
});

export const setRedeemCodeAvalablity = value => ({
  type: SET_REDEEM_CODE_AVAILABILITY,
  payload: value,
});

export const setUserData = value => ({
  type: SET_USER_DATA,
  payload: value,
});
