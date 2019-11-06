import React from 'react';
import { useDispatch } from 'react-redux';
import { updateInterval } from '../../actions/index';
import {
  ClipWrapper,
  InvisibleInput,
} from './Layout';

export default function Clip(interval) {
  const dispatch = useDispatch();
  function changeHanlder(event) {
    const val = event.target.value;
    dispatch(updateInterval({
      ...interval,
      title: val,
    }));
  }
  const {
    title,
  } = interval;
  return (
    <ClipWrapper>
      <InvisibleInput value={title} onChange={changeHanlder} />
    </ClipWrapper>
  );
}
