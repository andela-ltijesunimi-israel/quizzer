import React from 'react';
import { Router, Route, Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import logo from './../img/quizzer.png';
import './../css/app.css';


export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    axios.post('http://localhost:3000/api/users', {
      username,
      email,
      password,
    }).then((res) => {
      localStorage.setItem('signup-successful-msg', `${res.data.message}! You can now login.`);
      this.context.router.push('/login');
    }).catch((err) => {
      this.refs.errMsg.textContent = JSON.parse(err.responseText).message;
      this.refs.errMsg.classList.add('alert', 'alert-danger');
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2 className="App-name">Quizzer!</h2>
        </div>

        <section className="sign-up-form container">
          <div className="row">
            <form
              method="post" className="form col-sm-6 col-sm-offset-3"
              onSubmit={this.handleSignUp}
            >
              <p ref="errMsg" />
              <div className="form-group">
                <label htmlFor="user_email">Email:</label>
                <input
                  type="email" placeholder="example@mail.com"
                  id="user_email" ref="email" className="form-control" required
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text" placeholder="ade123456" id="username"
                  ref="username" className="form-control" required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user_password">Password:</label>
                <input
                  type="password" placeholder="*********" ref="password"
                  id="user_password" className="form-control" required
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-success">Sign up</button>
              </div>

              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

SignUpPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
