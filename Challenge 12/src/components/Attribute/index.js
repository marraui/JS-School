
import { get } from 'lodash';
import connect from '../../HOC/custom-connect-formik';
import Attribute from './Attribute';

const mapFormikToProps = ({ setFieldValue, values }, accessor) => ({
  onRemove: () => setFieldValue(accessor, undefined),
  format: get(values, `${accessor}.format`),
  accessor,
  onFormatChange: () => {
    setFieldValue(`${accessor}.numberFields`, undefined);
    setFieldValue(`${accessor}.noneFields`, undefined);
  },
});
export default connect(mapFormikToProps)(Attribute);
