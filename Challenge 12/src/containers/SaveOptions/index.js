import connect from '../../HOC/custom-connect-formik';
import SaveOptions from './SaveOptions';

const mapFormikToProps = ({ handleSubmit }) => ({
  onSubmit: handleSubmit,
});

export default connect(mapFormikToProps)(SaveOptions);
