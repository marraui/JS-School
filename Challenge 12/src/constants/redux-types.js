import PropTypes from 'prop-types';

export const tabsPropType = PropTypes.arrayOf(PropTypes.string);

export const attributePropTypes = PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  deviceResourceType: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  dataType: PropTypes.string,
  format: PropTypes.string,
  noneFields: PropTypes.shape({
    enumerations: PropTypes.arrayOf(PropTypes.string),
  }),
  numberFields: PropTypes.shape({
    range: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
    unitOfMeasurement: PropTypes.string,
    precision: PropTypes.number,
    accuracy: PropTypes.number,
  }),
});
