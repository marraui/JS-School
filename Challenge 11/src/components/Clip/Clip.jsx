import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SweetAlert from 'sweetalert2';
import { HuePicker } from 'react-color';
import { updateInterval, selectInterval, removeInterval } from '../../actions/index';
import TagDisplay from '../TagDisplay/TagDisplay';
import {
  ClipWrapper,
  InvisibleInput,
  Label,
  IconButton,
  LabelText,
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

  function saveHandler() {
    const { id } = interval;
    const intervalsStored = JSON.parse(sessionStorage.getItem('intervals')) || {};
    sessionStorage.setItem('intervals', JSON.stringify({
      ...intervalsStored,
      [id]: interval,
    }));
    SweetAlert.fire('Success', 'Clip stored successfully', 'success');
  }

  function deleteHandler(event) {
    event.stopPropagation();
    const { id } = interval;
    const intervalsStored = JSON.parse(sessionStorage.getItem('intervals')) || {};
    delete intervalsStored[id];
    sessionStorage.setItem('intervals', JSON.stringify(intervalsStored));
    dispatch(removeInterval(id));
    dispatch(selectInterval({
      start: 0,
      end: null,
      id: 0,
      title: 'Full clip',
      tags: [],
    }));
    SweetAlert.fire('Success', 'Clip deleted successfully', 'success');
  }

  function changeColorHandler(color) {
    dispatch(updateInterval({
      ...interval,
      color: color.hex,
    }));
  }

  const {
    id,
    title,
    color,
  } = interval;
  return (
    <ClipWrapper onClick={clickClipHandler}>
      <Label htmlFor="clip-input">
        <LabelText>Clip:</LabelText>
        <InvisibleInput type="text" id="clip-input" value={title} onChange={changeHandler} />
      </Label>

      {id !== 0
        ? (
          <>
            <Label htmlFor="color-input">
              <LabelText>Color: </LabelText>
              <HuePicker onChange={changeColorHandler} color={color} />
            </Label>
            <TagDisplay interval={interval} />
            <div>
              <IconButton onClick={saveHandler}>
                <i className="fa fa-save" />
              </IconButton>
              <IconButton onClick={deleteHandler}>
                <i className="fa fa-trash" />
              </IconButton>
            </div>
          </>
        ) : null}
    </ClipWrapper>
  );
}

Clip.propTypes = {
  interval: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};
