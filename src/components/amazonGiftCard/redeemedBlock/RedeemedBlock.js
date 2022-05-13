import React from 'react';

import RedeemedBlockUI from './RedeemedBlockUI';
import amazonService from '../../../services/amazon';
import { successMessage, errorMessage } from '../../../constants/message';

class RedeemedBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isSuccess: false,
      isLoading: false,
    };
  }

  render = () => {
    const { isLoading, message, isSuccess } = this.state;

    return (
      <RedeemedBlockUI
        {...this.props}
        isLoading={isLoading}
        isSuccess={isSuccess}
        resendGiftCard={this.resendGiftCard}
        message={message}
      />
    );
  };

  _setIsLoading = (value = true) => {
    this.setState({
      isLoading: value,
    });
  };

  /**
   * Sets the message for a short period of time and then remove it fron the frontend after certain interval.
   *
   * @param {string} message
   * @param {boolean} isSuccess
   */
  _setMessage = (message, isSuccess = false) => {
    const MESSAGE_TIMEOUT = 2000;

    this.setState({
      message,
      isSuccess,
    });
    setTimeout(() => {
      this.setState({
        message: '',
      });
    }, MESSAGE_TIMEOUT);
  };

  /**
   * Resend Amazon Gift Card Code by requesting to the server.
   */
  resendGiftCard = async () => {
    this._setIsLoading();

    try {
      await amazonService.resendGiftCode();
      this._setMessage(successMessage.GIFT_CARD_SENT, true);
    } catch (err) {
      this._setMessage(errorMessage.amazonGiftCard.FAILED_RESEND, false);
    } finally {
      this._setIsLoading(false);
    }
  };
}

export default RedeemedBlock;
