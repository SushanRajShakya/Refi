import React from 'react';
import PropTypes from 'prop-types';

import { homePageText } from '../../constants/texts/homePage';

const AmazonGiftCardUI = ({ openGiftCardOperation }) => {
  return (
    <div className="block-amazon">
      <span>{homePageText.amazon.GET_GIFT_CARD}</span>
      <div>
        <button
          name="Redeem"
          type="button"
          className="btn btn--primary btn--sm btn-redeem"
          onClick={openGiftCardOperation}>
          {homePageText.amazon.button.REDEEM}
        </button>
        <span className="amazon-disclaimer">
          {`${homePageText.amazon.DISCLAIMER} `}
          <a href={`https://www.${homePageText.amazon.DISCLAIMER_URL}`} target="_blank" rel="noopener noreferrer">
            {homePageText.amazon.DISCLAIMER_URL}
          </a>
        </span>
      </div>
    </div>
  );
};

AmazonGiftCardUI.propTypes = {
  openGiftCardOperation: PropTypes.func.isRequired,
};

export default AmazonGiftCardUI;
