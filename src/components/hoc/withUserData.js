import React from 'react';
import _get from 'lodash.get';
import _isEmpty from 'lodash.isempty';
import { connect } from 'react-redux';

import Spinner from '../shared/spinner';
import hocUtils from '../../utils/hoc';
import userService from '../../services/user';
import { routes } from '../../constants/routes';
import { userKeys } from '../../constants/keys/user';
import { WITH_USER_DATA } from '../../constants/texts/hoc';
import { isUserValid, DEFAULT_USER_ID } from '../../constants/general';
import { setIsCompleted, setIsUserValid, setUserData } from '../../action/user';

/**
 * Adds the user data to the wrapped component.
 *
 * @param {React.Component} WrappedComponent
 */
const withUserData = WrappedComponent => {
  class WithUserData extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
      };
    }

    componentDidMount = () => {
      const { userData } = this.props;

      if (_isEmpty(userData)) {
        this._fetchUserData();
      }
    };

    render = () => {
      const { userData } = this.props;
      const { isLoading } = this.state;

      return _isEmpty(userData) ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <WrappedComponent {...this.props} userData={userData} />
      );
    };

    /**
     * Fetches the user data from the backend if not available in redux.
     */
    _fetchUserData = async () => {
      const userData = userService.getUserData();
      const dmCustId = _get(userData, `${userKeys.DM_CUSTOMER_ID}`, DEFAULT_USER_ID);
      const { setIsCompleted, setIsUserValid, setUserData } = this.props;

      this._setIsLoading();
      try {
        const result = await userService.validateCustomerToken(dmCustId);

        this._setIsLoading(false);
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
        this._setIsLoading(false);
        if (error.data) {
          setIsUserValid(error.data[userKeys.IS_USER_VALID]);
          setIsCompleted(parseInt(error.data[userKeys.IS_COMPLETED]) ? true : false);
        } else {
          setIsUserValid(isUserValid.DEFAULT_USER);
          setIsCompleted(false);
        }
        this.props.history.push(routes.HOME);
      }
    };

    /**
     * Set state isLoading for the loader.
     *
     * @param {boolean} value
     */
    _setIsLoading = (value = true) => {
      this.setState({
        isLoading: value,
      });
    };
  }

  WithUserData.displayName = `${WITH_USER_DATA}(${hocUtils.getDisplayName(WrappedComponent)})`;

  const mapStateToProps = state => ({
    userData: state.user,
  });

  const mapDispatchToProps = dispatch => ({
    setUserData: value => dispatch(setUserData(value)),
    setIsCompleted: value => dispatch(setIsCompleted(value)),
    setIsUserValid: value => dispatch(setIsUserValid(value)),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(WithUserData);
};

export default withUserData;
