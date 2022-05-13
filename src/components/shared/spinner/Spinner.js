import React from 'react';

import ClipLoader from 'react-spinners/ClipLoader';
import { disableBackgroundScroll, enableBackgroundScroll } from '../../../utils/general';

import './style.css';

class Spinner extends React.Component {
  componentDidMount = () => {
    const { isLoading } = this.props;

    if (isLoading) {
      disableBackgroundScroll();
    }
  };

  componentDidUpdate = () => {
    const { isLoading } = this.props;

    if (isLoading) {
      disableBackgroundScroll();
    } else {
      enableBackgroundScroll();
    }
  };

  render = () => {
    const { size = 100, isLoading } = this.props;
    const LOADER_COLOR = '#2c7bd2';
    const sizeUnit = 'px';

    return (
      isLoading && (
        <div className="loader-container">
          <ClipLoader sizeUnit={sizeUnit} size={size} color={LOADER_COLOR} loading={isLoading} />
        </div>
      )
    );
  };
}

export default Spinner;
