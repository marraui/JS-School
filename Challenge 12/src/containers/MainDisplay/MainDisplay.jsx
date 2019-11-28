import React from 'react';
import FormInput from '../../components/Attribute';
import {
  Wrapper,
} from './Layout';

const sample = [1, 2, 3, 4];
export default function MainDisplay() {
  return (
    <Wrapper>
      {sample.map((attribute) => (
        <FormInput key={attribute} />
      ))}
    </Wrapper>
  );
}
