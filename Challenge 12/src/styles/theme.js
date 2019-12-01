import PropTypes from 'prop-types';

export default {
  primaryColor: '#FFFFFF',
  lightPrimaryColor: '#E3E3E3',
  secondaryColor: '#5ECC5C',
  lightSecondaryColor: '#A6D9A5',
  primaryTextColor: '#000000',
  lightPrimaryTextColor: '#595959',
  redFilter: 'rgba(255, 0, 0, 0.5)',
  greyFilter: 'rgba(0, 0, 0, 0.5)',
  error: '#FF0000',
};

export const themePropTypes = {
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  lightSecondaryColor: PropTypes.string,
  primaryTextColor: PropTypes.string,
  lightPrimaryTextColor: PropTypes.string,
  redFilter: PropTypes.string,
};
