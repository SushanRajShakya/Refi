import React from 'react';

import images from '../../../constants/image';

const Header = () => {
  const { FHF_LOGO, BANNER } = images;

  return (
    <div>
      <div className="header">
        <div className="header__brand">
          <a href="#">
            <img src={FHF_LOGO} alt="Car Lenders" />
          </a>
          <span className="header__slogan">
            <span className="header__slogan__text">Delivering access to your auto financing</span>
          </span>
        </div>
        <div className="header__right">
          <span>Hello, Sam</span>
        </div>
      </div>
      <div className="banner banner--bg1">
        <div className="banner__content">
          You have three auto finance offers waiting for you. <span>ACCEPT ONE TODAY</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
