import { connect } from 'react-redux';
import HomePage from './HomePage';

function mapStateToProps(state) {
  return {
    intervals: state.intervals,
    searchValue: state.searchValue,
    selectedInterval: state.selectedInterval,
  };
}

export default connect(mapStateToProps)(HomePage);
