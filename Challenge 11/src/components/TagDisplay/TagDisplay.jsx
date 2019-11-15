import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { intervalPropType } from '../../constants/proptypes-shape';
import Tag from '../Tag/Tag';
import {
  Container,
  Label,
  SubmitButton,
  InvisibleInput,
  LabelText,
  Form,
} from './Layout';

export default function TagDisplay({ interval, updateInterval }) {
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
    updateInterval(newInterval);
  }
  function removeTag(tag) {
    const newInterval = {
      ...interval,
      tags: interval.tags.filter((t) => t !== tag),
    };
    updateInterval(newInterval);
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
          <Tag key={`tag-${interval.id}-${tag}`} value={tag} onRemove={removeTag} />
        ))}
      </div>
    </Container>
  );
}

TagDisplay.propTypes = {
  interval: intervalPropType.isRequired,
  updateInterval: PropTypes.func,
};

TagDisplay.defaultProps = {
  updateInterval: () => {},
};
