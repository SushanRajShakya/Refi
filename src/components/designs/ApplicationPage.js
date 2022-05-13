import React from 'react';

import Header from '../designs/components/header';
import Footer from '../designs/components/footer';

const ApplicationPageDesign = () => {
  return (
    <div>
      <Header />
      <div className="main">
        <div className="block-application bg-primary">
          <div className="row">
            <div className="col-md-12">
              <h2 className="text-center">Tell Us a Little About Yourself</h2>
              <form className="form-lg">
                <div className="row">
                  <div className="col-sm-12 col-md-12 col-lg-5 ml-lg-32">
                    <div className="form-block">
                      <h3>Who I am</h3>
                      <div className="form-block__content">
                        <div className="form-group has-error">
                          <label className="form-group__label">Name</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                          <span className="help">This is an error message.</span>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">Phone</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                          <span className="help">This is a help message.</span>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">Email</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">Address</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">Address 2</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="row">
                          <div className="col-md-5">
                            <div className="form-group">
                              <label className="form-group__label">City</label>
                              <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label className="form-group__label">State</label>
                              <select className="form-group__control">
                                <option>CA</option>
                                <option>CA</option>
                                <option>CA</option>
                                <option>CA</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="form-group">
                              <label className="form-group__label">Zip</label>
                              <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">How long have you lived at this residence?</label>
                          <div className="row">
                            <div className="col-md-4">
                              <select className="form-group__control">
                                <option>Years</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                              </select>
                            </div>
                            <div className="col-md-4">
                              <select className="form-group__control">
                                <option>Months</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-block">
                      <div className="form-block__content">
                        <h3>How I Get There</h3>
                        <div className="form-group">
                          <label className="form-group__label">Year</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">Make</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">Model</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">VIN</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="row">
                          <div className="col-md-5">
                            <div className="form-group">
                              <label className="form-group__label">Mileage</label>
                              <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-12 col-lg-5 ml-lg-120">
                    <div className="form-block">
                      <h3>What I do</h3>
                      <div className="form-block__content block-exit">
                        <div className="form-group">
                          <label className="form-group__label">Employer</label>
                          <input type="text" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">Job Title</label>
                          <input type="text" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">Contact Phone #</label>
                          <input type="text" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group__label">Income</label>
                              <input type="text" className="form-group__control" placeholder="Ex. $50,000.00"></input>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label className="form-group__label">Pay Period</label>
                              <select className="form-group__control">
                                <option>Annually</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">Address1</label>
                          <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                        </div>
                        <div className="row">
                          <div className="col-md-5">
                            <div className="form-group">
                              <label className="form-group__label">City</label>
                              <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                            </div>
                          </div>
                          <div className="col-md-2">
                            <div className="form-group">
                              <label className="form-group__label">State</label>
                              <select className="form-group__control">
                                <option>CA</option>
                                <option>CA</option>
                                <option>CA</option>
                                <option>CA</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="form-group">
                              <label className="form-group__label">Zip</label>
                              <input type="text" name="input1" className="form-group__control" placeholder=""></input>
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="form-group__label">How long have you worked here?</label>
                          <div className="row">
                            <div className="col-md-4">
                              <select className="form-group__control">
                                <option>Years</option>
                                <option>Option 1</option>
                                <option>Option 2</option>
                                <option>Option 3</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <button name="btn4" type="button" className="btn btn--primary btn--icon mr-5">
                          <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Additional Employer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* <div className="row">
            <div className="col-md-12 ml-lg-48 mt-28">fsdfds</div>
          </div> */}
          <div className="row">
            <div className="col-md-12">
              <div className="form-group text-center mt-68 mb-28">
                <button name="btn4" type="button" className="btn btn--primary btn--lg mr-5 btn-application">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ApplicationPageDesign;
