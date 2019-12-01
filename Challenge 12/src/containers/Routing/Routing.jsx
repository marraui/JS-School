import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Formik } from 'formik';
import { reduce } from 'lodash';
import {
  string,
  object,
  number,
  array,
  lazy,
  addMethod,
  ref,
} from 'yup';
import { tabsPropType } from '../../constants/redux-types';
import Navbar from '../../components/Navbar';
import MainDisplay from '../MainDisplay';
import SaveOptions from '../SaveOptions';
import NotFound from '../NotFound';

addMethod(object, 'unique', function uniqueMethod(propertyName, message) {
  // eslint-disable-next-line prefer-arrow-callback
  return this.test('unique', message, function uniqueTest(value) {
    if (!value || !value[propertyName]) return true;

    const pathLength = this.path.split('.').length;
    const isRepeated = Object.keys(this.parent)
      .filter((key) => key !== this.path.split('.')[pathLength - 1])
      .map((key) => this.parent[key])
      .some((obj) => obj[propertyName] === value[propertyName]);

    if (isRepeated) throw this.createError({ path: `${this.path}.${propertyName}`, message });
    return true;
  });
});

addMethod(
  number,
  'compare',
  function compareMethod(
    message,
    compareFunc = (myValue, otherValue) => myValue === otherValue,
    ...references
  ) {
    return this.test('compare', message, function compareTest(value) {
      const otherValues = references.map((reference) => this.resolve(reference));
      if (!compareFunc(value, ...otherValues)) {
        throw this.createError({ path: this.path, message });
      }
      return true;
    });
  },
);

const getAttributeSchema = (key) => ({
  [key]: object({
    name: string().required('Name is required'),
    description: string(),
    deviceResourceType: string(),
    defaultValue: string(),
    dataType: string(),
    format: string(),
    noneFields: array().of(string()),
    numberFields: object({
      range: object().shape({
        min: number().typeError('Must be a number'),
        max: number()
          .typeError('Must be a number')
          .compare(
            'Must be larger than min',
            (min, max) => typeof min !== 'number' || typeof max !== 'number' || min > max,
            ref('min'),
          ),
      }),
      unitOfMeasurement: string(),
      precision: number()
        .typeError('Must be a number')
        .compare(
          'Precision has to evenly divide difference between min and max',
          (precision, min, max) => typeof precision !== 'number'
            || typeof min !== 'number'
            || typeof max !== 'number'
            || (max - min) % precision === 0,
          ref('range.min'),
          ref('range.max'),
        ),
      accuracy: number()
        .typeError('Must be a number')
        .compare(
          'Accuracy has to evenly divide difference between min and max',
          (accuracy, min, max) => typeof accuracy !== 'number'
            || typeof min !== 'number'
            || typeof max !== 'number'
            || (max - min) % accuracy === 0,
          ref('range.min'),
          ref('range.max'),
        ),
    }),
  }).unique('name', 'Attributes\' name should be unique'),
});

const schema = lazy((attributes) => object(
  reduce(
    attributes,
    (result, value, key) => ({ ...result, ...getAttributeSchema(key) }),
    {},
  ),
));

export default function Routing({ tabs }) {
  const tabsPath = `/:path(${tabs.join('|')})`;
  return (
    <Router>
      <Switch>
        <Route
          path={tabsPath}
          render={() => (
            <Formik
              validateOnChange={false}
              validateOnBlur
              initialValues={{}}
              validationSchema={schema}
            >
              <>
                <Navbar />
                <MainDisplay />
                <SaveOptions />
              </>
            </Formik>
          )}
        />
        <Redirect exact from="/" to={`/${tabs[0]}`} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

Routing.propTypes = {
  tabs: tabsPropType,
};

Routing.defaultProps = {
  tabs: [],
};
