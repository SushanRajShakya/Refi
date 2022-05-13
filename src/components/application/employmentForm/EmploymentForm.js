import React from 'react';
import EmploymentFormUI from './EmploymentFormUI';

class EmploymentForm extends React.Component {
  render = () => {
    return <EmploymentFormUI {...this.props} />;
  };
}

export default EmploymentForm;
