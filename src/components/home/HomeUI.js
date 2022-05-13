import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Header from '../shared/header';
import Footer from '../shared/footer';
import Spinner from '../shared/spinner';
import images from '../../constants/image';
import userService from '../../services/user';
import AmazonGiftCard from '../amazonGiftCard';
import { routes } from '../../constants/routes';
import { banner } from '../../constants/texts/common';
import { homePageText } from '../../constants/texts/homePage';
import { landingPageKeys } from '../../constants/keys/landingPage';

const HomeUI = ({ template, testimonial, isLoading, userData, createBulletPoints, getOfferExpiryText }) => {
  const bannerImage = {
    backgroundImage: `url(${images.BANNER})`,
  };
  const { AFSA_LOGO, INC_5000 } = images;

  return (
    <div>
      <Spinner isLoading={isLoading} />
      {userData.fullName ? <Header fullName={userData.fullName} /> : <Header />}
      <div className="banner" style={bannerImage}>
        <div className="banner__content">
          {userData.fullName && `${userService.getFirstName(userData.fullName)},`}
          <br />
          {template.headers[landingPageKeys.HEADER] || banner.TITLE}
          <span>{template.headers[landingPageKeys.SUB_HEADER] || banner.SUB_TITLE}</span>
        </div>
      </div>
      <div className="main">
        <div className="content-narrow pt-68">
          <h2>{homePageText.PARAGRAPH}</h2>
        </div>
        <div className="content-xs text-center">
          <div className="content-primary-color block-offer">
            <h2>{homePageText.OFFER_HEADING}</h2>
            <ul>
              <li>{template.titles[landingPageKeys.SUB_TITLE]}</li>
              {template.offers.map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={createBulletPoints(item)} />
              ))}
            </ul>
          </div>
          <div className="row block-button">
            <div className="col-md-12">
              {userData.isExpired === false && (
                <div className="form-group text-center">
                  <Link className="btn btn--primary btn--lg-narrow mr-5 btn-started" to={routes.VERIFICATION}>
                    {homePageText.button.NEXT}
                  </Link>
                </div>
              )}
              {userData.offerExpiryDate && <div className="form-group text-highlight">{getOfferExpiryText()}</div>}
            </div>
          </div>
          {userData.isExpired === false && userData.redeemCodeAvailability === true && (
            <div className="row mt-35">
              <AmazonGiftCard />
            </div>
          )}
        </div>
        <div className="content-narrow text-center pt-68 pb-68">
          <div className="content-logo">
            <ul>
              <li>
                <a href={null}>
                  <img src={AFSA_LOGO} alt="AFSA_LOGO" />
                </a>
              </li>
              <li>
                <a href={null}>
                  <img src={INC_5000} alt="Inc 5000" />
                </a>
              </li>
              <li>
                <span id="siteseal"></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="content-bg block-testimonial mt-68">
          <div className="white-overlay"></div>
          <div className="content-narrow block-testimonial__content text-center">
            <p>{`'${testimonial[landingPageKeys.TESTIMONIAL] || homePageText.testimonial.MESSAGE}'`}</p>
            <span className="block-testimonial__content__name">
              {testimonial[landingPageKeys.TESTIMONIAL_BY] || homePageText.testimonial.NAME}
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

HomeUI.propTypes = {
  template: PropTypes.shape({
    offers: PropTypes.array.isRequired,
    headers: PropTypes.object.isRequired,
    titles: PropTypes.object.isRequired,
  }).isRequired,
  testimonial: PropTypes.shape({
    [landingPageKeys.TESTIMONIAL_BY]: PropTypes.string,
    [landingPageKeys.TESTIMONIAL]: PropTypes.string,
  }),
  isLoading: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  createBulletPoints: PropTypes.func.isRequired,
  getOfferExpiryText: PropTypes.func.isRequired,
};

export default HomeUI;
