import React from 'react';
import Header from '../designs/components/header';
import Footer from '../designs/components/footer';

const VerificationPageDesign = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <div className="block-verification bg-primary">
          <div className="row m-0">
            <div className="col-md-12 mt-68 text-center">
              {/* <p>We need to make sure you are the right John McLemore</p> */}
              <h2 className="text-center">We need to make sure you are the right John McLemore</h2>
              <form className="form-sm">
                <div className="form-group form-group-sm">
                  <label htmlFor="input1" className="form-group__label form-group__label--text-lg">
                    SSN
                  </label>
                  <div className="form-group-wrap">
                    <span>XXX-XX-</span>
                    <input
                      type="text"
                      name="input1"
                      className="form-group__control"
                      placeholder="Last Four Digits"></input>
                  </div>
                </div>
                <div className="form-group form-group-sm">
                  <label htmlFor="input1" className="form-group__label form-group__label--text-lg">
                    Date of Birth
                  </label>
                  <div className="form-group-wrap">
                    <input
                      type="text"
                      name="input1"
                      className="form-group__control"
                      placeholder="MM / DD /YYYY"></input>
                  </div>
                </div>
                <div className="form-group text-center mt-68">
                  <button name="btn4" type="button" className="btn btn--primary btn--lg mr-5 btn-verification">
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerificationPageDesign;
