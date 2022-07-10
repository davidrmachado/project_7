import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isLoading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  onButtonClick = async () => {
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    this.setState({ isLoading: false, redirect: true });
  }

  render() {
    const { name, isLoading, redirect } = this.state;
    const minInput = 3;
    if (isLoading === true) return <Loading />;
    if (redirect === true) return <Redirect to="/search" />;
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <form>
          <label htmlFor="input-name">
            <input
              data-testid="login-name-input"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            name="submit-button"
            onClick={ this.onButtonClick }
            disabled={ name.length < minInput }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
