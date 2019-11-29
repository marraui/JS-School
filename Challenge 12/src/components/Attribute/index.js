import { connect } from 'react-redux';
import { updateAttribute, removeAttribute } from '../../actions';
import Attribute from './Attribute';

const mapDispatchToProps = (dispatch) => ({
  updateAttribute: (attribute) => dispatch(updateAttribute(attribute)),
  removeAttribute: (id) => dispatch(removeAttribute(id)),
});

export default connect(undefined, mapDispatchToProps)(Attribute);
