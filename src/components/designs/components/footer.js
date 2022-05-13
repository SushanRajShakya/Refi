import React from 'react';
import swal from '@sweetalert/with-react';

import images from '../../../constants/image';
import TermsAndConditions from '../../shared/termsAndConditions';

const Footer = () => {
  const { GLASSDOOR } = images;

  const _openTermsAndConditionsPopUp = () =>
    swal({
      content: (
        <div>
          <h2>Terms and Conditions</h2>
          <ul>
            <li>
              This refinancing offer is valid only until the date shown on your personalized offer webpage. To know the
              validity date, please visit: https://fhfrefi.com/ or call: (866)211-0608
            </li>
            <li>
              You received this refinancing offer because you met certain criteria for creditworthiness. This
              pre-selected offer doesn’t guarantee final approval if you no longer meet them at the time of accepting
              the offer. For e.g., this offer is subject to the verification of acceptable income, your employment, FHF
              securing first lien on an acceptable motor vehicle in a condition and mileage set by our underwriting
              standards, you having and maintaining valid and adequate insurance on the motor vehicle and any other
              underwriting criteria we have set for this offer
            </li>
            <li>
              When you accept the offer to refinance with us, we will do a hard pull your credit file. If you omit any
              information in your acceptance form, we may deny your request.
            </li>
            <li>
              At our discretion, we may request a vehicle inspection report for your vehicle. We will pay for the
              inspection costs if we request inspection.
            </li>
            <li>FHF will be listed as the lienholder on the vehicle title and insurance documentation</li>
            <li>This offer is non-transferable and valid only for the individual addressed in the letter</li>
            <li>
              The amount of cash you can withdraw or the APR you are offered or the maximum term of the loan will depend
              on your creditworthiness factors.
            </li>
            <li>
              Vehicle restrictions: Refinancing not available for Daewoo, Hummer, Sports Cars, Land/Range Rovers, Saabs,
              Conversion Packages, Salvage/Flood Damaged/Gray Market/TMU vehicles. Other restrictions may apply.
            </li>
          </ul>
          <div className="block-highlight">
            <h2>PRESCREEN & OPT-OUT NOTICE</h2>
            <p>
              This ‘prescreened’ offer of credit is based on information in your credit report indicating that you meet
              certain criteria. This offer is not guaranteed if you do not meet this criteria, or other applicable
              criteria bearing on credit worthiness, including furnishing acceptable auto as collateral. If you do not
              want to receive prescreened offers of credit from this and other companies, call the consumer reporting
              agencies toll-free, 1-888-5OPTOUT (1-888-567-8688); or write: Equifax at P.O.Box 740123, Atlanta,GA
              30374-0123; Experian at P.O. Box 919, Allen, TX 75013; TransUnion Opt Out Request at P.O. Box 505,
              Woodlyn, PA 19094-0505 or visit the website at www.optoutprescreen.com
            </p>
            <button name="btn4" type="button" className="btn btn--error mr-22">
              Reject
            </button>
            <button name="btn4" type="button" className="btn btn--warning">
              warning
            </button>
          </div>
        </div>
      ),
      button: 'Close',
      className: 'block-terms-and-cond',
    });

  return (
    <div className="footer">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center flex-column col-md-4">
          <a href="#" onClick={_openTermsAndConditionsPopUp}>
            Terms and conditions
          </a>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column col-md-4">
          <ul className="footer-icons">
            <li>
              <a href="#" className="icon">
                <i class="fa fa-linkedin" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#" className="icon">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#" className="icon">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
            </li>
            <li>
              <a href="#" className="icon">
                <img src={GLASSDOOR} alt="Glassdoor" />
              </a>
            </li>
          </ul>
          <div className="footer-copyright">Copyright {new Date().getFullYear()} Car Lenders</div>
        </div>
        <div className="d-flex justify-content-center align-items-center col-md-4">
          [866]343-4345 199 <br />
          Wells AVE #211 <br />
          Newton, MA 02459
        </div>
      </div>
    </div>
  );
};

export default Footer;
