import React from 'react';

import config from '../../configs/config';
import images from '../../constants/image';
import Header from '../designs/components/header';
import Footer from '../designs/components/footer';

class HomePageDesign extends React.Component {
  constructor() {
    super();
  }

  componentDidMount = () => {
    const script = document.createElement('script');

    script.src = config.SSL_CERT;
    script.async = true;

    document.body.appendChild(script);
  };

  render = () => {
    const { AFSA_LOGO, INC_5000 } = images;

    return (
      <div>
        <Header />
        <div className="main">
          <div className="content-narrow pt-68 pb-68">
            <h2>
              We’re here to take a little pressure off your financial life by helping you refinance your auto loan.
              Choose one of these three offers so you can reduce your monthly
              payment,takecareofotherfinancialresponsibilitiesmoreeasily, orputmore money back in your pocket each month
              over the life of your auto loan.
            </h2>
          </div>
          <div className="content-xs text-center">
            <div className="content-primary-color block-offer">
              <h2>PLEASE CHOOSE YOUR OFFER</h2>
              <ul>
                <li>Withdraw cash from your new loan </li>
                <li>Lower the APR on your auto loan</li>
                <li>Extend the term of your auto loan</li>
              </ul>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group text-center mt-68">
                  <button name="btn4" type="button" className="btn btn--primary btn--lg-narrow mr-5 btn-started">
                    Let’s Get Started
                  </button>
                </div>
                <div className="form-group text-highlight">Offers expires on MM/DD/YYYY</div>
              </div>
            </div>
          </div>
          <div className="content-narrow text-center pt-68 pb-68">
            <div className="content-logo">
              <ul>
                <li>
                  <a href="#">
                    <img src={AFSA_LOGO} alt="AFSA_LOGO" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={INC_5000} alt="Inc 5000" />
                  </a>
                </li>
                <li>
                  <span id="siteseal">
                    {/* The logo is dynamically displayed over here, please write align the element accordingly. */}
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="content-bg block-testimonial mt-68">
            <div className="white-overlay"></div>
            <div className="content-narrow block-testimonial__content text-center">
              <p>
                'Car Lenders saved the day by helping me refinance my car so I could catch up on a few other
                bills. The process was so simple. My stress is now gone.'
              </p>
              <span className="block-testimonial__content__name">Lauren</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
}

export default HomePageDesign;
