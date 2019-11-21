import { connect } from 'react-redux';
import Navbar from './Navbar';

const mapStateToProps = ({ tabs }) => ({ tabs });

export default connect(mapStateToProps)(Navbar);
