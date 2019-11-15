import React from 'react';
import PropTypes from 'prop-types';
import {
  HeaderContainer,
  SearchInput,
} from './Layout';

export default function Search({ searchValue, updateSearchValue }) {
  const changeHandler = (event) => updateSearchValue(event.target.value);

  return (
    <HeaderContainer>
      <SearchInput
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={changeHandler}
      />
    </HeaderContainer>
  );
}

Search.propTypes = {
  searchValue: PropTypes.string,
  updateSearchValue: PropTypes.func,
};

Search.defaultProps = {
  searchValue: '',
  updateSearchValue: () => {},
};
