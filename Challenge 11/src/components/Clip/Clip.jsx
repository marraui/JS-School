import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateInterval, selectInterval } from '../../actions/index';
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

  function clickClipHandler() {
    dispatch(selectInterval(interval));
  }

  const {
    title,
    id,
  } = interval;
  const selectedInterval = useSelector((state) => state.selectedInterval);
  const {
    id: selectedId,
  } = selectedInterval;
  return (
    <ClipWrapper selected={id === selectedId} onClick={clickClipHandler}>
      <InvisibleInput value={title} onChange={changeHanlder} />
    </ClipWrapper>
  );
}
