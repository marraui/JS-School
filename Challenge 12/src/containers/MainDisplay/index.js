import connect from '../../HOC/custom-connect-formik';
import MainDisplay from './MainDisplay';
import defaultAttribute from '../../constants/default-attribute';

const mapFormikToProps = ({ values, setFieldValue }) => ({
  attributes: values,
  addAttribute: (attr) => setFieldValue(new Date().getTime(), { ...defaultAttribute, ...attr }),
});

export default connect(mapFormikToProps)(MainDisplay);
