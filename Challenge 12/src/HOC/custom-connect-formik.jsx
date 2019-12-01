/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { connect as formikConnect } from 'formik';

export default function connect(mapFormikToProps) {
  return (WrappedComponent) => formikConnect(({ formik, accessor, ...rest }) => (
    <WrappedComponent {...mapFormikToProps(formik, accessor)} {...rest} />
  ));
}
