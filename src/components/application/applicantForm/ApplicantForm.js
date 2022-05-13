import React from 'react';
import ApplicantFormUI from './ApplicantFormUI';

class ApplicantForm extends React.Component {
  render = () => {
    return <ApplicantFormUI {...this.props} />;
  };
}

export default ApplicantForm;
