import React from 'react';
import _get from 'lodash.get';
import { Redirect } from 'react-router-dom';

import hocUtils from '../../utils/hoc';
import withUserData from './withUserData';
import { routes } from '../../constants/routes';
import { VERIFY_OFFER_STATUS } from '../../constants/texts/hoc';

/**
 * Verifies whether the user has already submitted the applications form or not.
 * Redirects the user to the Thank you page in our application.
 *
 * @param {React.Component} WrappedComponent
 */
const verifyOfferStatus = WrappedComponent => {
  class VerifyOfferStatus extends React.Component {
    render = () => {
      const { userData, history } = this.props;
      const isCompleted = _get(userData, 'isCompleted', false);
      const isExpired = _get(userData, 'isExpired', false);

      if (isCompleted) {
        return <Redirect to={routes.SUBMISSION} />;
      } else {
        if (isExpired) {
          return history.location.pathname === routes.HOME ? (
            <WrappedComponent {...this.props} />
          ) : (
            <Redirect to={routes.HOME} />
          );
        } else {
          return <WrappedComponent {...this.props} />;
        }
      }
    };
  }

  VerifyOfferStatus.displayName = `${VERIFY_OFFER_STATUS}(${hocUtils.getDisplayName(WrappedComponent)})`;

  return withUserData(VerifyOfferStatus);
};

export default verifyOfferStatus;
