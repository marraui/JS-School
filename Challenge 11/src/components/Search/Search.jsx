import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateSearchValue } from '../../actions/index';
import {
  HeaderContainer,
  SearchInput,
} from './Layout';

export default function Search() {
  const searchValue = useSelector((state) => state.searchValue);
  const dispatch = useDispatch();
  const changeHandler = (event) => dispatch(updateSearchValue(event.target.value));

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
