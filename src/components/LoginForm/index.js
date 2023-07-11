import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUserId = () => {
    const {userId} = this.state

    return (
      <>
        <label htmlFor="userId" className="label-text">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          placeholder="Enter User ID"
          className="text-input"
          onChange={this.onChangeUserId}
          value={userId}
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="password" className="label-text">
          PIN
        </label>
        <input
          type="password"
          id="password"
          placeholder="Enter PIN"
          className="text-input"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, password} = this.state
    const userDetails = {
      user_id: userId,
      pin: password,
    }
    const apiUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    return (
      <div className="bank-container">
        <div className="login-form-container">
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <div className="form-container">
            <form className="login-form" onSubmit={this.onSubmitForm}>
              <h1 className="heading">Welcome Back!</h1>
              <div className="input-container">{this.renderUserId()}</div>
              <div className="input-container">{this.renderPassword()}</div>
              <button type="submit" className="btn">
                Login
              </button>
              {showSubmitError && <p className="error-msg">{errorMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default LoginForm
