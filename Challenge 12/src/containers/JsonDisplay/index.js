import connect from '../../HOC/custom-connect-formik';
import JsonDisplay from './JsonDisplay';

const getObjFormatted = (values) => {
  const valuesArray = Object
    .keys(values)
    .sort()
    .map((key) => values[key]);
  const uniqueTabs = Array.from(new Set(valuesArray.map((value) => value.tab)));
  return uniqueTabs.reduce((result, tab) => ({
    ...result,
    ...{
      [tab]: valuesArray
        .filter((value) => value.tab === tab)
        .map((value) => ({ ...value, tab: undefined })),
    },
  }), {});
};

const mapFormikToProps = ({ values }) => ({
  obj: getObjFormatted(values),
});

export default connect(mapFormikToProps)(JsonDisplay);
