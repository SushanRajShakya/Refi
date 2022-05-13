import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import images from '../../../constants/image';
import userService from '../../../services/user';
import { routes } from '../../../constants/routes';
import { CAR_LENDERS } from '../../../constants/texts/common';

const Header = props => {
  const { FHF_LOGO } = images;
  const { fullName, location } = props;

  /**
   * Verify whether the name should be displayed in the header or not based on the route.
   */
  const _verifyNameToBeDisplayedOrNot = () => {
    const pathName = location.pathname;

    if (pathName === routes.VERIFICATION || pathName === routes.HOME) {
      return false;
    }

    return true;
  };

  return (
    <React.Fragment>
      <div className="header">
        <div className="header__brand">
          <a href={null}>
            <img src={FHF_LOGO} alt={CAR_LENDERS} />
          </a>
          <span className="header__slogan">
            <span className="header__slogan__text">Delivering access to your auto financing</span>
          </span>
        </div>
        {_verifyNameToBeDisplayedOrNot() && fullName && (
          <div className="header__right">
            <span>Hi {userService.getFirstName(fullName)}!</span>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

Header.propTypes = {
  fullName: PropTypes.string,
};

export default withRouter(Header);
