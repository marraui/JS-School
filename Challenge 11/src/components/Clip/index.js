import { connect } from 'react-redux';
import { updateInterval, selectInterval, removeInterval } from '../../actions/index';
import Clip from './Clip';

function mapDispatchToProps(dispatch) {
  return {
    updateInterval: (interval) => dispatch(updateInterval(interval)),
    selectInterval: (interval) => dispatch(selectInterval(interval)),
    removeInterval: (intervalId) => dispatch(removeInterval(intervalId)),
  };
}

export default connect(null, mapDispatchToProps)(Clip);
