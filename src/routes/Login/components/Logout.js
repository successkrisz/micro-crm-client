import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../modules/login'

export class Logout extends React.Component {
  componentWillMount () {
    this.props.dispatch(logout())
  }
  render () {
    return <div />
  }
}

Logout.propTypes = {
  dispatch: React.PropTypes.func.isRequired
}

export default connect()(Logout)
