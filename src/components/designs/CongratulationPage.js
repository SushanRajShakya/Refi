import React from 'react';

import Header from '../designs/components/header';
import Footer from '../designs/components/footer';

const CongratulationPageDesign = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <div className="block-confirmation content-narrow bg-primary">
          <div className="text-center text-uppercase pt-68">
            <h1>Thank you for your application</h1>
          </div>
          <div className="row mb-68">
            <div className="col-md-12 text-center">
              <h2>
                We Will Contact You Within One <br />
                Business Day With Your Loan Terms
              </h2>
            </div>
          </div>
          <div className="row mb-8">
            <div className="col-md-12">
              <div className="text-center">
                <h3>How Would You Prefer We Contact You?</h3>
              </div>
            </div>
          </div>
          <div className="content-xs text-left">
            <div className="form-group">
              <div className="row">
                <div className="col-2 col-md-1">
                  <div class="form-group radio-square mt-24">
                    <input
                      type="radio"
                      name="radio"
                      value="Radio Inline 1"
                      checked="checked"
                      id="radio1"
                      class="form-group__radio mr-10"
                    />

                    <label for="radio1" class="form-group__label form-group__label--nomargin"></label>
                  </div>
                </div>
                <div className="col-10 col-md-10">
                  <label className="form-group__label">Phone</label>
                  <input type="text" name="input1" className="form-group__control" placeholder="617-823-1456"></input>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-2 col-md-1">
                  <div class="form-group radio-square mt-24">
                    <input
                      type="radio"
                      name="radio"
                      value="Radio Inline 1"
                      checked="checked"
                      id="radio2"
                      class="form-group__radio mr-10"
                    />

                    <label for="radio2" class="form-group__label form-group__label--nomargin"></label>
                  </div>
                </div>
                <div className="col-10 col-md-10">
                  <label className="form-group__label">Email</label>
                  <input
                    type="text"
                    name="input2"
                    className="form-group__control"
                    placeholder="johndoe@gmail.com"></input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group text-center mt-68">
                  <button name="btn4" type="button" className="btn btn--primary btn--lg mr-5 btn-congratulation">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CongratulationPageDesign;
