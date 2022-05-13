import React from 'react';
import _isEmpty from 'lodash.isempty';
import { CSSTransition } from 'react-transition-group';

import Spinner from '../../shared/spinner';
import userService from '../../../services/user';
import modalService from '../../../services/modal';
import { homePageText } from '../../../constants/texts/homePage';

const RedeemedBlockUI = ({ message, userData, isLoading, resendGiftCard, isSuccess }) => {
  return (
    <div className="wrapper">
      <Spinner isLoading={isLoading} />
      <div className="header">
        Awesome {userService.getFirstName(userData.fullName)}!
        <br />
        <span>{homePageText.amazon.CLAIMED_GIFT_CARD}</span>
      </div>
      <div className="block-redeemed">
        <div>
          {homePageText.amazon.getCheckEmailText(userData.redemptionEmail)}
          <CSSTransition in={_isEmpty(message) === false} timeout={250} classNames="block" unmountOnExit>
            <div className={`redeem-notification redeem-notification__${isSuccess ? 'success' : 'error'}`}>
              {message}
            </div>
          </CSSTransition>
        </div>
        <a href={null} onClick={resendGiftCard}>
          {homePageText.amazon.RESEND_GIFT_CARD}
        </a>
      </div>
      <div className="action">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group text-center">
              <button
                name={homePageText.amazon.button.BACK}
                className="btn btn--primary btn--md"
                onClick={modalService.closeModal}>
                {homePageText.amazon.button.BACK}
              </button>
            </div>
            {userData.offerExpiryDate && (
              <div className="form-group text-highlight mt-12">{`${homePageText.OFFER_EXPIRES_ON} ${userData.offerExpiryDate}`}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedeemedBlockUI;
