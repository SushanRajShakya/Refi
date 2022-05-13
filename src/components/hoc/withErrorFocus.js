import React from 'react';

import hocUtils from '../../utils/hoc';
import { WITH_ERROR_FOCUS } from '../../constants/texts/hoc';

/**
 * Note: For this HOC a component must be wrapped by withFormik HOC.
 * Focuses the first form element with error detection only during submission.
 *
 * @param {React.Component} WrappedComponentWithFormik
 */
const withErrorFocus = WrappedComponentWithFormik => {
  const TAG_NAMES = ['input', 'select', 'textarea'];
  const ERROR_CLASS = 'form-group has-error';

  class WithErrorFocus extends React.Component {
    componentDidUpdate = prevProps => {
      // Verify form submission and focus error only during submission.
      if (prevProps.isSubmitting && !this.props.isSubmitting) {
        // Get the error form groups elements or div
        const errorBlocks = document.getElementsByClassName(ERROR_CLASS);

        if (errorBlocks.length) {
          for (let i = 0; i < TAG_NAMES.length; i++) {
            // Get the respective form element can be one of the values from the TAG_NAMES
            const errorElement = errorBlocks[0].getElementsByTagName(TAG_NAMES[i]);

            if (errorElement.length) {
              errorElement[0].focus();
              break;
            }
          }
        }
      }
    };

    render = () => <WrappedComponentWithFormik {...this.props} />;
  }

  WithErrorFocus.displayName = `${WITH_ERROR_FOCUS}(${hocUtils.getDisplayName(WrappedComponentWithFormik)})`;

  return WithErrorFocus;
};

export default withErrorFocus;
