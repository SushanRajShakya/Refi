import React from 'react';
import { withFormik } from 'formik';

import Input from '../../shared/input';
import Spinner from '../../shared/spinner';
import userService from '../../../services/user';
import amazonService from '../../../services/amazon';
import InputWithMask from '../../shared/inputWithMask';
import { errorMessage } from '../../../constants/message';
import { homePageText } from '../../../constants/texts/homePage';
import { amazonErrorText } from '../../../constants/texts/common';
import amazonGiftCardForm from '../../../constants/forms/amazonGiftCard';
import amazonGiftCardFormSchema from '../../../schema/amazonGiftCardForm';

class GiftCardVerificationForm extends React.Component {
  render = () => {
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      userData,
      isSubmitting,
      submitCount,
      status,
    } = this.props;

    return (
      <div className="wrapper">
        <Spinner isLoading={isSubmitting} />
        <div className="header">
          Hi {userService.getFirstName(userData.fullName)}!
          <br />
          <span>{homePageText.amazon.CLAIM_GIFT_CARD}</span>
        </div>
        <div className="form">
          <span>{homePageText.amazon.FORM_HEADER}</span>
          <form className="form-sm" autoComplete="off">
            <InputWithMask
              label={amazonGiftCardForm.field.code.LABEL}
              name={`code`}
              placeholder={amazonGiftCardForm.field.code.PLACEHOLDER}
              mask={amazonGiftCardForm.field.code.MASK}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              textTransform={amazonGiftCardForm.field.code.TEXT_TRANSFORM}
              value={values.code}
            />

            <Input
              label={amazonGiftCardForm.field.email.LABEL}
              name={`email`}
              placeholder={amazonGiftCardForm.field.email.PLACEHOLDER}
              type={amazonGiftCardForm.field.email.TYPE}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              value={values.email}
            />

            <InputWithMask
              label={amazonGiftCardForm.field.phone.LABEL}
              name={`phone`}
              placeholder={amazonGiftCardForm.field.phone.PLACEHOLDER}
              mask={amazonGiftCardForm.field.phone.MASK}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              value={values.phone}
            />
          </form>
        </div>
        {!isSubmitting && submitCount > 0 && status && (
          <div className="wrapper__notify">
            {this._getMessage(status.errorMessage) || errorMessage.amazonGiftCard.VALIDATING_CODE}
          </div>
        )}
        {this._getActionsBlock()}
      </div>
    );
  };

  /**
   * Conditionally return action block based on maximum attempts remaining.
   */
  _getActionsBlock = () => {
    const { handleSubmit, isValid, status, userData } = this.props;

    if (status && status.errorMessage === amazonErrorText.MAX_ATTEMPTS) {
      return null;
    }

    return (
      <div className="action">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group text-center">
              <input
                name={amazonGiftCardForm.button.SUBMIT}
                type="submit"
                className="btn btn--primary btn--md"
                disabled={!isValid}
                value={amazonGiftCardForm.button.SUBMIT}
                onClick={handleSubmit}
              />
            </div>
            {userData.offerExpiryDate && (
              <div className="form-group text-highlight mt-12">{`${homePageText.OFFER_EXPIRES} ${userData.offerExpiryDate}`}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Configure message to show in different lines.
   *
   * @param {string} message
   */
  _getMessage = message => {
    const SPLIT_CHAR = '.';
    const messageParts = message.split(SPLIT_CHAR);

    if (messageParts.length > 1) {
      return (
        <React.Fragment>
          {messageParts[0]}. <br />
          {messageParts[1]}
        </React.Fragment>
      );
    }

    return message;
  };
}

/* eslint-disable */
export default withFormik({
  displayName: amazonGiftCardForm.name,
  enableReinitialize: true,
  mapPropsToValues: props => amazonGiftCardForm.initialValues,
  validationSchema: amazonGiftCardFormSchema,
  handleSubmit: amazonService.handleSubmit,
})(GiftCardVerificationForm);
/* eslint-enable */
