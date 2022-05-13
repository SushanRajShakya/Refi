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
} from '../action/types/user';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case SET_IS_COMPLETED:
      return { ...state, isCompleted: action.payload };
    case SET_FULL_NAME:
      return { ...state, fullName: action.payload };
    case SET_OFFER_EXPIRY_DATE:
      return { ...state, offerExpiryDate: action.payload };
    case SET_IS_EXPIRED:
      return { ...state, isExpired: action.payload };
    case SET_IS_USER_VALID:
      return { ...state, isUserValid: action.payload };
    case SET_IS_GIFT_CARD_REDEEMED:
      return { ...state, isGiftCardRedeemed: action.payload };
    case SET_REDEEM_CODE_AVAILABILITY:
      return { ...state, redeemCodeAvailability: action.payload };
    case SET_REDEMPTION_EMAIL:
      return { ...state, redemptionEmail: action.payload };
    default:
      return state;
  }
};

export default userReducer;
