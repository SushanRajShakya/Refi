import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './components/home';
import config from './configs/config';
import Submission from './components/submission';
import Application from './components/application';
import Designs from './components/designs/Designs';
import Verification from './components/verification';
import Authorization from './components/authorization';
import { routes, designerRoutes } from './constants/routes';
import PageNotFound from './components/shared/pageNotFound';
import PrivateRoute from './components/shared/privateRoute';
import withRouteHandler from './components/hoc/withRouteHandler';

/**
 * React Router Setup for FHF-Refi.
 * Due to use of <Switch> we cannot break down the following block of code for the design kit into a seperate function.
 * <Switch> allows only one component to be rendered at a time.
 */
const Router = () => {
  const showDesignKit = config.NODE_ENV === `development`;
  const EnhancedRoute = withRouteHandler(Route);

  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from={routes.ROOT} to={routes.HOME} />
        <EnhancedRoute path={routes.HOME} component={Home} />
        <PrivateRoute path={routes.VERIFICATION} component={Verification} />
        <PrivateRoute path={routes.APPLICATION} component={Application} />
        <PrivateRoute path={routes.SUBMISSION} component={Submission} />
        {showDesignKit && <Route path={designerRoutes.DESIGN_ROOT} component={Designs} />}
        <Route exact path={routes.UNIQUE_ID} component={Authorization} />
        <Route path={routes.ANY_ROUTE} component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
