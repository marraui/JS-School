import React from 'react';
import PropTypes from 'prop-types';
import SweetAlert from 'sweetalert2';
import { HuePicker } from 'react-color';
import { intervalPropType } from '../../constants/proptypes-shape';
import TagDisplay from '../TagDisplay/index';
import {
  ClipWrapper,
  InvisibleInput,
  Label,
  IconButton,
  LabelText,
} from './Layout';

export default function Clip({
  interval,
  updateInterval,
  selectInterval,
  removeInterval,
}) {
  function changeHandler(event) {
    const val = event.target.value;
    updateInterval({
      ...interval,
      title: val,
    });
  }

  function clickClipHandler() {
    selectInterval(interval);
  }

  function saveHandler() {
    const { id } = interval;
    const intervalsStored = JSON.parse(localStorage.getItem('intervals')) || {};
    localStorage.setItem('intervals', JSON.stringify({
      ...intervalsStored,
      [id]: interval,
    }));
    SweetAlert.fire('Success', 'Clip stored successfully', 'success');
  }

  function deleteHandler(event) {
    event.stopPropagation();
    const { id } = interval;
    const intervalsStored = JSON.parse(localStorage.getItem('intervals')) || {};
    delete intervalsStored[id];
    localStorage.setItem('intervals', JSON.stringify(intervalsStored));
    removeInterval(id);
    selectInterval({
      start: 0,
      end: null,
      id: 0,
      title: 'Full clip',
      tags: [],
    });
    SweetAlert.fire('Success', 'Clip deleted successfully', 'success');
  }

  function changeColorHandler(color) {
    updateInterval({
      ...interval,
      color: color.hex,
    });
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
  interval: intervalPropType.isRequired,
  updateInterval: PropTypes.func,
  selectInterval: PropTypes.func,
  removeInterval: PropTypes.func,
};

Clip.defaultProps = {
  updateInterval: () => {},
  selectInterval: () => {},
  removeInterval: () => {},
};
