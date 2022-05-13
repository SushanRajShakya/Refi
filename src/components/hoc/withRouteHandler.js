import React from 'react';
import { withRouter } from 'react-router-dom';

import hocUtils from '../../utils/hoc';
import { WITH_ROUTE_HANDLER } from '../../constants/texts/hoc';

/**
 * Handles unwanted routes and changes window.location to the specific route if matches.
 *
 * @param {React.Component} WrappedComponent
 */
const withRouteHandler = WrappedComponent => {
  class WithRouteHandler extends React.Component {
    componentDidMount = () => {
      this._verifyWindowLocation();
    };

    render = () => {
      return <WrappedComponent {...this.props} />;
    };

    /**
     * Verifies the window location url and the path name of the route.
     * Changes the location url to current path if different.
     */
    _verifyWindowLocation = () => {
      const { history, location, path } = this.props;

      if (path !== location.pathname) {
        history.push(path);
      }
    };
  }

  WithRouteHandler.displayName = `${WITH_ROUTE_HANDLER}(${hocUtils.getDisplayName(WrappedComponent)})`;

  return withRouter(WithRouteHandler);
};

export default withRouteHandler;
