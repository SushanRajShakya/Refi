import React from 'react';

import images from '../../../constants/image';
import modalService from '../../../services/modal';
import TermsAndConditions from '../termsAndConditions';
import { footerText } from '../../../constants/texts/footer';
import { socialMediaLink } from '../../../configs/redirectLink';

const Footer = () => {
  const { GLASSDOOR } = images;

  const _openTermsAndConditionsPopUp = () =>
    modalService.openModal({
      content: <TermsAndConditions />,
      buttons: {
        close: 'Close',
      },
      className: 'block-terms-and-cond',
    });

  return (
    <div className="footer">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center flex-column col-md-4">
          <a href={null} onClick={_openTermsAndConditionsPopUp}>
            {footerText.TERMS_AND_CONDITIONS}
          </a>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column col-md-4">
          <ul className="footer-icons">
            <li>
              <a href={socialMediaLink.LINKED_IN} className="icon" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href={socialMediaLink.FACEBOOK} className="icon" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href={socialMediaLink.INSTAGRAM} className="icon" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href={socialMediaLink.GLASS_DOOR} className="icon" target="_blank" rel="noopener noreferrer">
                <img src={GLASSDOOR} alt="Glassdoor" />
              </a>
            </li>
          </ul>
          <div className="footer-copyright">{footerText.COPYRIGHT}</div>
        </div>
        <div className="d-flex justify-content-center align-items-center col-md-4">
          {footerText.PHONE} <br />
          {footerText.STREET_ADDRESS} <br />
          {footerText.MAIN_ADDRESS}
        </div>
      </div>
    </div>
  );
};

export default Footer;
