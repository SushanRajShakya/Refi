export const apiEndPoint = {
  validateCustomerToken: 'auth/validate_cust_token/', // param: API + <CUST_TOKEN>
  validateSsnDob: 'auth/validate_ssn_dob/', // param: API + <CUST_TOKEN>/<SSN>/<DOB_MM>/<DOB_DD>
  getUserApplicationData: 'tell_us/populate/', // param : API + <DM_CUST_ID>
  saveApplicationForm: 'tell_us/applicant-detail',
  saveAdditionalEmployers: 'tell_us/employer',
  removeEmployer: 'tell_us/employer/', // param: API + <EMPLOYER_ID>
  stateOptions: 'state-county-city/states',
  getPrimaryContact: 'primary-contact/get/', // param: API + <DM_CUST_ID>
  savePrimaryContact: 'primary-contact/save',
  pageTemplate: `landing/page-template/`, // param: API + <CUST_TOKEN>
  getTestimonials: `testimonial/list-random`,
  validateAmazonCode: 'landing/gift-card',
};
