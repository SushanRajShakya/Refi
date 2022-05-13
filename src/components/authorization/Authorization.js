import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import userService from '../../services/user';
import storageUtils from '../../utils/storage';
import AuthorizationUI from './AuthorizationUI';
import { routes } from '../../constants/routes';
import { userKeys } from '../../constants/keys/user';
import { isUserValid } from '../../constants/general';
import { setIsCompleted, setIsUserValid, setUserData } from '../../action/user';

class Authorization extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    const uniqueId = this.props.match.params.uniqueId;

    storageUtils.clearStorage();
    this._validateCustomerToken(uniqueId);
  };

  render = () => {
    return <AuthorizationUI />;
  };

  _validateCustomerToken = async uniqueId => {
    const { setIsCompleted, setUserData, setIsUserValid, history } = this.props;

    userService.setUserData({
      [userKeys.DM_CUSTOMER_ID]: uniqueId.toLowerCase(),
    });

    try {
      const result = await userService.validateCustomerToken(uniqueId);

      setUserData({
        isCompleted: result[userKeys.IS_COMPLETED],
        fullName: result[userKeys.FULL_NAME],
        offerExpiryDate: result[userKeys.OFFER_EXPIRY_DATE],
        isExpired: result[userKeys.IS_EXPIRED],
        isUserValid: result[userKeys.IS_USER_VALID],
        isGiftCardRedeemed: result[userKeys.IS_GIFT_CARD_REDEEMED],
        redemptionEmail: result[userKeys.REDEMPTION_EMAIL],
        redeemCodeAvailability: result[userKeys.REDEEM_CODE_AVAILABLE],
      });
    } catch (error) {
      if (error.data) {
        setIsUserValid(error.data[userKeys.IS_USER_VALID]);
        setIsCompleted(parseInt(error.data[userKeys.IS_COMPLETED]) ? true : false);
      } else {
        setIsUserValid(isUserValid.DEFAULT_USER);
        setIsCompleted(false);
      }
    } finally {
      history.push(routes.HOME);
    }
  };
}

const mapDispatchToProps = dispatch => ({
  setUserData: value => dispatch(setUserData(value)),
  setIsCompleted: value => dispatch(setIsCompleted(value)),
  setIsUserValid: value => dispatch(setIsUserValid(value)),
});

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Authorization));
