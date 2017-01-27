import React from 'react'
import './Login.scss'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  handleEmailChange = (event) => {
    this.setState({ ...this.state, email: event.target.value })
  }
  handlePasswordChange = (event) => {
    this.setState({ ...this.state, password: event.target.value })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.login(this.state)
  }
  render () {
    const ErrorBox = (
      <div className='alert alert-danger' role='alert'>
        <span className='glyphicon glyphicon-exclamation-sign' aria-hidden='true' />
        <span className='sr-only'>Error:</span>
        {this.props.error}
      </div>
    )

    return (
      <div className='loginContainer'>
        <form onSubmit={this.handleSubmit}>
          { (this.props.error) ? ErrorBox : '' }
          <input
            type='text'
            placeholder='Email'
            value={this.state.email}
            onChange={this.handleEmailChange}
            className='form-control' />
          <br />
          <input
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.handlePasswordChange}
            className='form-control' />
          <br />
          <button className='btn btn-primary form-control' type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  error: React.PropTypes.string,
  login: React.PropTypes.func.isRequired
}

export default Login
