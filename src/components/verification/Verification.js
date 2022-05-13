import React from 'react';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';

import VerificationUI from './VerificationUI';
import userService from '../../services/user';
import { routes } from '../../constants/routes';
import { setDocumentTitle } from '../../utils/general';
import verifyOfferStatus from '../hoc/verifyOfferStatus';
import verificationForm from '../../constants/forms/verification';
import verificationFormSchema from '../../schema/verificationForm';
import verificationFormService from '../../services/forms/verification';
import { verificationPageText } from '../../constants/texts/verificationPage';

class Verification extends React.Component {
  componentDidMount = () => {
    setDocumentTitle(verificationPageText.DOCUMENT_TITLE);
    userService.getVerifiedUserData() && this.props.history.push(routes.APPLICATION);
  };

  render = () => {
    return <VerificationUI {...this.props} />;
  };
}

/* eslint-disable */
export default verifyOfferStatus(
  withFormik({
    displayName: verificationForm.name,
    enableReinitialize: true,
    mapPropsToValues: props => verificationForm.initialValues,
    validationSchema: verificationFormSchema,
    handleSubmit: verificationFormService.handleSubmit,
  })(withRouter(Verification))
);
/* eslint-enable */
