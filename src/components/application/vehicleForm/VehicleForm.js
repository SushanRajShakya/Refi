import React from 'react';
import VehicleFormUI from './VehicleFormUI';

class VehicleForm extends React.Component {
  render = () => {
    return <VehicleFormUI {...this.props} />;
  };
}

export default VehicleForm;
