import React from 'react';
import { Redirect } from 'react-router-dom';

import hocUtils from '../../utils/hoc';
import userService from '../../services/user';
import { routes } from '../../constants/routes';
import { WITH_SSN_VERIFICATION } from '../../constants/texts/hoc';

/**
 * Adds the user data to the wrapped component.
 *
 * @param {React.Component} WrappedComponent
 */
const withSsnVerification = WrappedComponent => {
  class WithSsnVerification extends React.Component {
    constructor(props) {
      super(props);
    }

    render = () => {
      // We get the verified user data only after successful validation from the backend.
      // If the verfied user data exists then the user is SSN and DOB verified.
      return userService.getVerifiedUserData() ? (
        <WrappedComponent {...this.props} />
      ) : (
        <Redirect to={routes.VERIFICATION} />
      );
    };
  }

  WithSsnVerification.displayName = `${WITH_SSN_VERIFICATION}(${hocUtils.getDisplayName(WrappedComponent)})`;

  return WithSsnVerification;
};

export default withSsnVerification;
