import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false
    }
  }

  submitHandler(e) {
    e.preventDefault()
    this.setState({ disabled: true })
    this.props.client.login(e.target.username.value, e.target.password.value)
      .then((response) => {
        this.setState({ disabled: false })
        this.props.loggedIn(response.data.token)
      })
      .catch(() => {
        alert("an error occured, please try again");
        this.setState({ disabled: false })
      })
  }

  render() {
    return (
      <>
        Login<br />
        <form onSubmit={(e) => this.submitHandler(e)} >
          username<br />
          <input type="text" name="username" disabled={this.state.disabled} /><br />
      password<br />
          <input type="password" name="password" disabled={this.state.disabled} /><br /><br />
          <button type="submit" disabled={this.state.disabled}> Submit </button>
        </form>
      </>
    )

  }
}

export default Login;
