import React from 'react';
import _get from 'lodash.get';

import HomeUI from './HomeUI';
import config from '../../configs/config';
import toastUtils from '../../utils/toast';
import userService from '../../services/user';
import { isUserValid } from '../../constants/general';
import { setDocumentTitle } from '../../utils/general';
import verifyOfferStatus from '../hoc/verifyOfferStatus';
import { footerText } from '../../constants/texts/footer';
import { homePageText } from '../../constants/texts/homePage';

// Needs component life cycle so chaged it from a functional component to class component.
class Home extends React.Component {
  _defaultTemplate = {
    offers: [],
    headers: {},
    titles: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      template: this._defaultTemplate,
      testimonial: {},
      isLoading: false,
    };
  }

  componentDidMount = () => {
    setDocumentTitle(homePageText.DOCUMENT_TITLE);
    this._addGoDaddySSLLogo();
    this._initializePage();
  };

  render = () => {
    return (
      <HomeUI
        {...this.props}
        {...this.state}
        createBulletPoints={this.createBulletPoints}
        getOfferExpiryText={this.getOfferExpiryText}
      />
    );
  };

  /**
   * Create an object to dangerously set the inner HTML for list element.
   *
   * @param {string} text
   */
  createBulletPoints = text => ({ __html: text });

  /**
   * Get the respective page template for the current user.
   */
  _fetchPageTemplate = async () => {
    try {
      const { userData } = this.props;
      const isUserValidFlag = _get(userData, 'isUserValid', isUserValid.DEFAULT_USER);
      const result = await userService.getLandingPageTemplate(isUserValidFlag);

      return result;
    } catch (err) {
      toastUtils.displayError(err);

      return Promise.resolve(this._defaultTemplate);
    }
  };

  /**
   * Get a random testimonial from the backend.
   */
  _fetchTestimonial = async () => {
    try {
      const result = await userService.getTestimonials();

      return result;
    } catch (err) {
      toastUtils.displayError(err);

      return Promise.resolve({});
    }
  };

  /**
   * Initialized the page by fetching necessary information from the backend.
   */
  _initializePage = async () => {
    this._setIsLoading();

    const requestCollection = [this._fetchPageTemplate(), this._fetchTestimonial()];

    const result = await Promise.all(requestCollection);

    this.setState({
      template: result[0],
      testimonial: result[1],
      isLoading: false,
    });
  };

  /**
   * Set the isLoading flag for displaying loader/spinner.
   *
   * @param {boolean} value
   */
  _setIsLoading = (value = true) => {
    this.setState({
      isLoading: value,
    });
  };

  /**
   * Adds the GoDaddy SSL Logo in Home Page.
   */
  _addGoDaddySSLLogo = () => {
    const script = document.createElement('script');

    script.src = config.SSL_CERT;
    script.async = true;
    const sslCert = document.getElementById('siteseal');

    sslCert.appendChild(script);
  };

  /**
   * Returns the offer expiry status message to be displayed.
   */
  getOfferExpiryText = () => {
    const { userData } = this.props;
    const { offerExpiryDate } = userData;

    let formattedDate = '';

    if (offerExpiryDate) {
      formattedDate = offerExpiryDate;
    }

    if (userData.isExpired) {
      return (
        <React.Fragment>
          {homePageText.offerExpired.PART1(formattedDate)}
          <span className="single-word">{footerText.PHONE}</span>
          {homePageText.offerExpired.PART2}
        </React.Fragment>
      );
    }

    return homePageText.OFFER_EXPIRES + formattedDate;
  };
}

export default verifyOfferStatus(Home);
