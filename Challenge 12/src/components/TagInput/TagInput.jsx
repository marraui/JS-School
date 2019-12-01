import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tag from '../Tag/Tag';
import {
  Input,
  TagDisplay,
  Wrapper,
  Button,
} from './Layout';

export default function TagInput({
  value: tags,
  onChange,
}) {
  const [currentTag, setCurrentTag] = useState('');
  const submit = () => {
    if (!currentTag || currentTag === '') return;
    onChange([...tags, currentTag]);
  };
  const handleKeyDown = (event) => {
    if (event.keyCode !== 13) return;
    event.preventDefault();
    submit();
  };

  return (
    <Wrapper>
      <Input
        value={currentTag}
        onChange={(event) => setCurrentTag(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={submit}>Add</Button>
      <TagDisplay>
        {!Array.isArray(tags) ? [] : tags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            onRemove={(removedTag) => onChange(tags.filter((t) => t !== removedTag))}
          />
        ))}
      </TagDisplay>
    </Wrapper>
  );
}

TagInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func,
};

TagInput.defaultProps = {
  value: [],
  onChange: () => null,
};
