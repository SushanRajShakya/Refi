import React from 'react';
import _get from 'lodash.get';
import { ErrorMessage } from 'formik';
import MaskedInput from 'react-text-mask';

import formUtils from '../../../utils/forms';
import { mask } from '../../../constants/mask';

class MaskedSsn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ssn1: '',
      ssn2: '',
      ssn3: '',
    };
    this.ssn1 = React.createRef();
    this.ssn2 = React.createRef();
    this.ssn3 = React.createRef();
  }

  componentDidMount = () => {
    this.setState({
      ssn1: this.props.value.slice(0, 3),
      ssn2: this.props.value.slice(3, 5),
      ssn3: this.props.value.slice(5, 9),
    });
  };

  componentDidUpdate = () => {
    this._verifySubmissionFailure();
  };

  render = () => {
    const { label, name, errors, touched, value } = this.props;
    const { ssn1, ssn2, ssn3 } = this.state;

    return (
      <div className={formUtils.getInputWrapperClassName(value, touched, errors, name)}>
        {label && (
          <label htmlFor={label} className="form-group__label">
            {label}
          </label>
        )}
        <div className="row">
          <div className="col-md-12">
            <MaskedInput
              style={this._getWidthStyle(25)}
              guide={false}
              type="password"
              name="ssn1"
              className="form-group__control"
              onBlur={this.handleBlur}
              placeholder="XXX"
              value={ssn1}
              mask={mask.SSN.slice(0, 3)}
              onChange={this.handelChangeSsn1}
              ref={this.ssn1}
            />
            {` - `}
            <MaskedInput
              style={this._getWidthStyle(20)}
              guide={false}
              type="password"
              name="ssn2"
              className="form-group__control"
              onBlur={this.handleBlur}
              placeholder="XX"
              value={ssn2}
              mask={mask.SSN.slice(3, 5)}
              onChange={this.handleChangeSsn2}
              ref={this.ssn2}
            />
            {` - `}
            <MaskedInput
              style={this._getWidthStyle(35)}
              guide={false}
              type="password"
              name="ssn3"
              className="form-group__control"
              onBlur={this.handleBlur}
              placeholder="XXXX"
              value={ssn3}
              mask={mask.SSN.slice(5, 9)}
              onChange={this.handleChangeSsn3}
              ref={this.ssn3}
            />
          </div>
        </div>
        <span className="help">{`Ex. SSN: 'XXX-XX-XXXX'`}</span>
        <ErrorMessage name={name}>{errorMessage => <span className="help">{errorMessage}</span>}</ErrorMessage>
      </div>
    );
  };

  handelChangeSsn1 = event => {
    const { ssn2, ssn3 } = this.state;

    this.setState({
      ssn1: event.target.value,
    });
    event.target.value.length >= 3 && this.ssn2.current.inputElement.focus();
    this._updateDob(event.target.value, ssn2, ssn3);
  };

  handleChangeSsn2 = event => {
    const { ssn1, ssn3 } = this.state;

    this.setState({
      ssn2: event.target.value,
    });
    event.target.value.length >= 2 && this.ssn3.current.inputElement.focus();
    this._updateDob(ssn1, event.target.value, ssn3);
  };

  handleChangeSsn3 = event => {
    const { ssn2, ssn1 } = this.state;

    this.setState({
      ssn3: event.target.value,
    });
    this._updateDob(ssn1, ssn2, event.target.value);
  };

  handleBlur = () => {
    this.props.setFieldTouched(this.props.name, true);
  };

  _updateDob = (ssn1, ssn2, ssn3) => {
    if (ssn1.length || ssn2.length || ssn3.length) {
      const ssn = `${ssn1}${ssn2}${ssn3}`;

      this.props.setFieldValue(this.props.name, ssn);
    } else {
      this.props.setFieldValue(this.props.name, '');
    }
  };

  _getWidthStyle = width => ({
    width: `${width}%`,
  });

  _verifySubmissionFailure = () => {
    const submissionFailed = _get(this.props.status, 'submissionFailed', false);

    if (submissionFailed) {
      this.setState({
        ssn1: '',
        ssn2: '',
        ssn3: '',
      });
    }
  };
}

export default MaskedSsn;
