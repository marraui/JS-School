import { connect } from 'react-redux';
import Routing from './Routing';

const mapStateToProps = ({ tabs }) => ({ tabs });

export default connect(mapStateToProps)(Routing);
