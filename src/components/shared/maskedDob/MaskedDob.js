import React from 'react';
import _get from 'lodash.get';
import { ErrorMessage } from 'formik';
import MaskedInput from 'react-text-mask';

import formUtils from '../../../utils/forms';
import { mask } from '../../../constants/mask';

class MaskedDob extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: '',
      day: '',
      year: '',
    };
    this.month = React.createRef();
    this.day = React.createRef();
    this.year = React.createRef();
  }

  componentDidUpdate = () => {
    this._verifySubmissionFailure();
  };

  componentDidMount = () => {
    this.setState({
      month: this.props.value.slice(0, 2),
      day: this.props.value.slice(3, 5),
      year: this.props.value.slice(6, 10),
    });
  };

  render = () => {
    const { label, name, errors, touched, value } = this.props;
    const { month, day, year } = this.state;

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
              name="month"
              className="form-group__control"
              onBlur={this.handleBlur}
              placeholder="MM"
              value={month}
              mask={mask.MONTH_TWO_DIGITS}
              onChange={this.handleMonth}
              ref={this.month}
            />
            {` / `}
            <MaskedInput
              style={this._getWidthStyle(25)}
              guide={false}
              type="password"
              name="day"
              className="form-group__control"
              onBlur={this.handleBlur}
              placeholder="DD"
              value={day}
              mask={mask.DAY_TWO_DIGITS}
              onChange={this.handleDay}
              ref={this.day}
            />
            {` / `}
            <MaskedInput
              style={this._getWidthStyle(35)}
              guide={false}
              type="password"
              name="year"
              className="form-group__control"
              onBlur={this.handleBlur}
              placeholder="YYYY"
              value={year}
              mask={mask.YEAR_FOUR_DIGITS}
              onChange={this.handleYear}
              ref={this.year}
            />
          </div>
        </div>
        <ErrorMessage name={name}>{errorMessage => <span className="help">{errorMessage}</span>}</ErrorMessage>
      </div>
    );
  };

  handleMonth = event => {
    const { day, year } = this.state;

    this.setState({
      month: event.target.value,
    });
    event.target.value.length >= 2 && this.day.current.inputElement.focus();
    this._updateDob(event.target.value, day, year);
  };

  handleDay = event => {
    const { month, year } = this.state;

    this.setState({
      day: event.target.value,
    });
    event.target.value.length >= 2 && this.year.current.inputElement.focus();
    this._updateDob(month, event.target.value, year);
  };

  handleYear = event => {
    const { day, month } = this.state;

    this.setState({
      year: event.target.value,
    });
    this._updateDob(month, day, event.target.value);
  };

  handleBlur = () => {
    this.props.setFieldTouched(this.props.name, true);
  };

  _updateDob = (month, day, year) => {
    if (month.length || day.length || year.length) {
      const dob = `${month}/${day}/${year}`;

      this.props.setFieldValue(this.props.name, dob);
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
        month: '',
        day: '',
        year: '',
      });
    }
  };
}

export default MaskedDob;
