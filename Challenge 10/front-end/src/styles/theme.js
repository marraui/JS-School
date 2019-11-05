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
  userStar: '#E9BD49',
  seethrough: 'rgba(35, 31, 32, 0.88)',
  lightSecondary: '#5EB4DD',
  bookTitle: '#383838',
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
  userStar: PropTypes.string,
  seethrough: PropTypes.string,
  lightSecondary: PropTypes.string,
  bookTitle: PropTypes.string,
});
