import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import HomePageDesign from './HomePage';
import images from '../../constants/image';
import ApplicationPageDesign from './ApplicationPage';
import { designerRoutes } from '../../constants/routes';
import VerificationPageDesign from './VerificationPage';
import CongratulationPageDesign from './CongratulationPage';

const Designs = () => {
  const showDesignLinks = () => (
    <div>
      <div className="header">
        <div className="header__brand">
          <img src={images.FHF_LOGO} alt="Car Lenders" />
        </div>
      </div>
      <div>
        <h2>Links</h2>
        <br />
        1. <Link to={designerRoutes.DESIGN_HOME}>Home Page</Link>
        <br />
        2. <Link to={designerRoutes.DESIGN_VERIFICATION}>Verification Page</Link>
        <br />
        3. <Link to={designerRoutes.DESIGN_APPLICATION}>Application Form</Link>
        <br />
        4. <Link to={designerRoutes.DESIGN_SUBMISSION}>Submission Page</Link>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <Switch>
        <Route exact path={designerRoutes.DESIGN_HOME} component={HomePageDesign} />
        <Route exact path={designerRoutes.DESIGN_VERIFICATION} component={VerificationPageDesign} />
        <Route exact path={designerRoutes.DESIGN_APPLICATION} component={ApplicationPageDesign} />
        <Route exact path={designerRoutes.DESIGN_SUBMISSION} component={CongratulationPageDesign} />
        {showDesignLinks()}
      </Switch>
    </React.Fragment>
  );
};

export default Designs;
