import { connect } from 'react-redux';
import { updateInterval } from '../../actions/index';
import TagDisplay from './TagDisplay';

function mapDispatchToProps(dispatch) {
  return {
    updateInterval: (interval) => dispatch(updateInterval(interval)),
  };
}

export default connect(null, mapDispatchToProps)(TagDisplay);
