
import { get } from 'lodash';
import connect from '../../HOC/custom-connect-formik';
import Attribute from './Attribute';

const mapFormikToProps = ({ setFieldValue, values }, accessor) => ({
  onRemove: () => setFieldValue(accessor, undefined),
  format: get(values, `${accessor}.format`),
  dataType: get(values, `${accessor}.dataType`),
  accessor,
  onFormatChange: () => {
    setFieldValue(`${accessor}.numberFields`, undefined);
    setFieldValue(`${accessor}.noneFields`, undefined);
  },
  onDataTypeChange: (dataType) => {
    if (dataType === 'OBJECT') {
      setFieldValue(`${accessor}.format`, undefined);
      setFieldValue(`${accessor}.defaultValue`, undefined);
    } else if (dataType === 'STRING') {
      setFieldValue(`${accessor}.format`, 'NONE');
    }
  },
});
export default connect(mapFormikToProps)(Attribute);
