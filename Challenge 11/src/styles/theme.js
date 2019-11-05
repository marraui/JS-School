import PropTypes from 'prop-types';

export default {
  lighterPrimary: '#F5F6F8',
  primary: '#FFFFFF',
  primaryText: '#231F20',
  secondary: '#6EC1E4',
  lightPrimary: '#FCF8F3',
  secondaryText: '#979797',
  darkSecondaryText: '#858585',
  lightSecondaryText: '#9E9E9E',
  lightSecondary: '#5EB4DD',
};

export const themePropType = PropTypes.shape({
  lighterPrimary: PropTypes.string,
  primary: PropTypes.string,
  primaryText: PropTypes.string,
  secondary: PropTypes.string,
  lightPrimary: PropTypes.string,
  secondaryText: PropTypes.string,
  darkSecondaryText: PropTypes.string,
  lightSecondaryText: PropTypes.string,
  lightSecondary: PropTypes.string,
});
