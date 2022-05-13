import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import userService from '../../../services/user';
import { routes } from '../../../constants/routes';
import withRouteHandler from '../../hoc/withRouteHandler';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (userService.getUserData() ? <Component {...props} /> : <Redirect to={routes.HOME} />)}
    />
  );
};

export default withRouteHandler(PrivateRoute);
