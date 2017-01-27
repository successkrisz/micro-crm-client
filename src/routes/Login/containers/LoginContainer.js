import { connect } from 'react-redux'
import { login } from '../modules/login'

import Login from '../components/Login'

const mapActionCreators = { login }

const mapStateToProps = (state) => ({
  error: state.login.error
})

export default connect(mapStateToProps, mapActionCreators)(Login)
