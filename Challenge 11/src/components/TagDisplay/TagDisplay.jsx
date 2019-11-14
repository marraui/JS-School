import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateInterval } from '../../actions/index';
import Tag from '../Tag/Tag';
import {
  Container,
  Label,
  SubmitButton,
  InvisibleInput,
  LabelText,
  Form,
} from './Layout';

export default function TagDisplay({ interval }) {
  const dispatch = useDispatch();
  const [currentTag, setCurrentTag] = useState('');

  const { tags } = interval;
  function submitHandler(event) {
    event.preventDefault();
    if (!currentTag) return;
    const newInterval = {
      ...interval,
      tags: [...interval.tags, currentTag],
    };
    setCurrentTag('');
    dispatch(updateInterval(newInterval));
  }
  function removeTag(tag) {
    const newInterval = {
      ...interval,
      tags: interval.tags.filter((t) => t !== tag),
    };
    dispatch(updateInterval(newInterval));
  }
  function changeHandler(event) {
    setCurrentTag(event.target.value);
  }
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Label htmlFor="tag-input">
          <LabelText>Tag:</LabelText>
          <InvisibleInput
            id="tag-input"
            type="text"
            onChange={changeHandler}
            value={currentTag}
          />
        </Label>
        <SubmitButton type="submit" value="+" />
      </Form>
      <div>
        {tags.map((tag) => (
          <Tag value={tag} onRemove={removeTag} />
        ))}
      </div>
    </Container>
  );
}

TagDisplay.propTypes = {
  interval: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
