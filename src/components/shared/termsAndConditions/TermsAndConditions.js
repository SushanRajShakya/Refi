import React from 'react';
import _get from 'lodash.get';

import userService from '../../../services/user';
import { userKeys } from '../../../constants/keys/user';
import { termsAndConditions } from '../../../constants/texts/common';

const TermsAndConditions = () => {
  const defaultDmCustId = '<purl>';
  const userData = userService.getUserData();
  const dmCustId = _get(userData, `${userKeys.DM_CUSTOMER_ID}`, defaultDmCustId);

  return (
    <div>
      <h2>{termsAndConditions.TITLE}</h2>
      <ul>
        {termsAndConditions.CONDITIONS.map((item, index) => (
          <li key={index}>{index === 0 ? item.replace(defaultDmCustId, dmCustId) : item}</li>
        ))}
      </ul>
      <div className="block-highlight">
        <h2>{termsAndConditions.notice.TITLE}</h2>
        <p>{termsAndConditions.notice.DESCRIPTION}</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
