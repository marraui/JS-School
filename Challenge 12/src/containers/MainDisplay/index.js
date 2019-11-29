import { connect } from 'react-redux';
import MainDisplay from './MainDisplay';
import { addAttribute } from '../../actions';

const mapStateToProps = (state) => ({ attributes: state.attributes });

const mapDispatchToProps = (dispatch) => ({
  addAttribute: (attribute) => dispatch(addAttribute(attribute)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainDisplay);
