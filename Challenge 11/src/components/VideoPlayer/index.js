import { connect } from 'react-redux';
import {
  addInterval,
  selectInterval,
} from '../../actions/index';
import VideoPlayer from './VideoPlayer';

function mapStateToProps(state) {
  return {
    interval: state.selectedInterval,
    intervals: state.intervals,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addInterval: (interval) => dispatch(addInterval(interval)),
    selectInterval: (interval) => dispatch(selectInterval(interval)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
