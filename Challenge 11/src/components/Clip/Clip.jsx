import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateInterval, selectInterval } from '../../actions/index';
import TagDisplay from '../TagDisplay/TagDisplay';
import {
  ClipWrapper,
  InvisibleInput,
  Label,
} from './Layout';

export default function Clip({ interval }) {
  const dispatch = useDispatch();
  function changeHandler(event) {
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
  } = interval;
  return (
    <ClipWrapper onClick={clickClipHandler}>
      <Label htmlFor="clip-input">
        Clip:
        <InvisibleInput id="clip-input" value={title} onChange={changeHandler} />
      </Label>
      <TagDisplay interval={interval} />
    </ClipWrapper>
  );
}

Clip.propTypes = {
  interval: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};
