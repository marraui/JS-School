import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderContainer,
  SearchInput,
  Slider,
  SliderInput,
  Switch,
  SearchInputContainer,
  SwitchContainer,
} from './Layout';

export default function Search({
  searchValue,
  updateSearchValue,
  autoPlay,
  onAutoPlayChange,
}) {
  const changeHandler = (event) => updateSearchValue(event.target.value);

  return (
    <HeaderContainer>
      <SwitchContainer>
        Autoplay
        <Switch>
          <SliderInput
            type="checkbox"
            checked={autoPlay}
            onChange={(event) => onAutoPlayChange(event.target.checked)}
          />
          <Slider checked={autoPlay} />
        </Switch>
      </SwitchContainer>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={changeHandler}
        />
      </SearchInputContainer>
    </HeaderContainer>
  );
}

Search.propTypes = {
  searchValue: PropTypes.string,
  updateSearchValue: PropTypes.func,
  autoPlay: PropTypes.bool,
  onAutoPlayChange: PropTypes.func,
};

Search.defaultProps = {
  searchValue: '',
  updateSearchValue: () => {},
  autoPlay: true,
  onAutoPlayChange: () => {},
};
