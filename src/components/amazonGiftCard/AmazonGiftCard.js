import React from 'react';
import { connect } from 'react-redux';

import RedeemedBlock from './redeemedBlock';
import withUserData from '../hoc/withUserData';
import modalService from '../../services/modal';
import AmazonGiftCardUI from './AmazonGiftCardUI';
import GiftCardVerificationForm from './giftCardVerificationForm';
import { setIsGiftCardRedeemed, setRedemptionEmail } from '../../action/user';

class AmazonGiftCard extends React.Component {
  constructor() {
    super();
  }

  render = () => {
    return <AmazonGiftCardUI openGiftCardOperation={this.openGiftCardOperation} />;
  };

  /**
   * Checks the isGiftCardRedeemed flag in userData and open the required modal based on the value.
   */
  openGiftCardOperation = () => {
    const { userData } = this.props;

    if (userData.isGiftCardRedeemed) {
      modalService.openModal({
        content: <RedeemedBlock {...this.props} />,
        className: 'block-amazon-modal',
      });
    } else {
      modalService.openModal({
        content: <GiftCardVerificationForm {...this.props} />,
        className: 'block-amazon-modal',
      });
    }
  };
}

const mapDispatchToProps = dispatch => ({
  setIsGiftCardRedeemed: value => dispatch(setIsGiftCardRedeemed(value)),
  setRedemptionEmail: value => dispatch(setRedemptionEmail(value)),
});

export default connect(
  null,
  mapDispatchToProps
)(withUserData(AmazonGiftCard));
