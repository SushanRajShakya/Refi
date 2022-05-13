/**
 * Returns the display name of the React Component.
 *
 * @param {React.Component} WrappedComponent
 */
const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

/**
 * Collections of all HOCs utils method for export.
 */
const hocUtils = {
  getDisplayName,
};

export default hocUtils;
