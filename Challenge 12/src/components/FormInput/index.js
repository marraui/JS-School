import { get } from 'lodash';
import FormInput from './FormInput';
import connect from '../../HOC/custom-connect-formik';

const mapFormikToProps = ({
  values,
  errors,
  touched,
  validateOnBlur,
  validateOnChange,
  submitCount,
  setFieldTouched,
  setFieldValue,
}, accessor) => ({
  value: get(values, accessor),
  error: get(errors, accessor),
  touched: get(touched, accessor),
  validateOnBlur,
  validateOnChange,
  submitted: submitCount > 0,
  onChange: (value) => setFieldValue(accessor, value),
  onBlur: () => setFieldTouched(accessor, true),
});

export default connect(mapFormikToProps)(FormInput);
