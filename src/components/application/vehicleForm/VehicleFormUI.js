import React from 'react';
import PropTypes from 'prop-types';

import Input from '../../shared/input';
import applicationForm from '../../../constants/forms/application';
import InputWithMask from '../../shared/inputWithMask/InputWithMask';

const VehicleFormUI = ({ handleChange, handleBlur, errors, touched, values }) => {
  const vehicleFormField = applicationForm.vehicle.field;

  return (
    <div className="row">
      <div className="col-12">
        <div className="row block-vehicle">
          <div className="col-md-12">
            <div className="row">
              <div className="col-12">
                <InputWithMask
                  label={vehicleFormField.year.LABEL}
                  name={'vehicle.year'}
                  placeholder={vehicleFormField.year.PLACEHOLDER}
                  mask={vehicleFormField.year.MASK}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  value={values.year}
                />
                <Input
                  label={vehicleFormField.make.LABEL}
                  name={'vehicle.make'}
                  placeholder={vehicleFormField.make.PLACEHOLDER}
                  type={vehicleFormField.make.TYPE}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  value={values.make}
                />
                <Input
                  label={vehicleFormField.model.LABEL}
                  name={'vehicle.model'}
                  placeholder={vehicleFormField.model.PLACEHOLDER}
                  type={vehicleFormField.model.TYPE}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                  value={values.model}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 divider">
                <hr />
                <span className="divider__text">OR</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <InputWithMask
                  label={vehicleFormField.vin.LABEL}
                  name={'vehicle.vin'}
                  placeholder={vehicleFormField.vin.PLACEHOLDER}
                  mask={vehicleFormField.vin.MASK}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={errors}
                  textTransform={vehicleFormField.vin.TEXT_TRANSFORM}
                  touched={touched}
                  value={values.vin}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <InputWithMask
              mask={vehicleFormField.mileage.MASK}
              label={vehicleFormField.mileage.LABEL}
              name={'vehicle.mileage'}
              placeholder={vehicleFormField.mileage.PLACEHOLDER}
              handleChange={handleChange}
              handleBlur={handleBlur}
              errors={errors}
              touched={touched}
              value={values.mileage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

VehicleFormUI.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
};

export default VehicleFormUI;
