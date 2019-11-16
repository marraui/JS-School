import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export const intervalPropType = PropTypes.shape({
  id: PropTypes.number,
  start: PropTypes.number,
  end: PropTypes.number,
  color: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
});
