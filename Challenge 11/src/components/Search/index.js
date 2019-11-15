import { connect } from 'react-redux';
import { updateSearchValue } from '../../actions/index';
import Search from './Search';

function mapStateToProps(state) {
  return {
    searchValue: state.searchValue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchValue: (searchValue) => dispatch(updateSearchValue(searchValue)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
