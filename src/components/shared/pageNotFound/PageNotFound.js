import React from 'react';

import Header from '../header';
import Footer from '../footer';

const PageNotFound = () => {
  return (
    <div className="container">
      <Header />
      <div className="main"></div>
      <div>Page Not Found !</div>
      <Footer />
    </div>
  );
};

export default PageNotFound;
