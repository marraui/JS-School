import PropTypes from 'prop-types';

export default {
  lighterPrimary: '#F5F6F8',
  primary: '#FFFFFF',
  primaryText: '#231F20',
  secondary: '#6EC1E4',
  lightPrimary: '#FCF8F3',
  secondaryText: '#FFFFFF',
  darkSecondaryText: '#858585',
  lightSecondaryText: '#9E9E9E',
  darkSecondary: '#5EB4DD',
  seethrough: 'rgba(35, 31, 32, 0.88)',
};

export const alternativeTheme = {
  primary: '#6EC1E4',
  lighterPrimary: '#5EB4DD',
  secondary: '#FFFFFF',
  primaryText: '#FFFFFF',
  secondaryText: '#231F20',
  darkSecondaryText: '#858585',
  lightSecondaryText: '#9E9E9E',
  seethrough: 'rgba(35, 31, 32, 0.88)',
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
  seethrough: PropTypes.string,
});
