import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({
      isLoading: false,
      user: user.name,
    });
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <h1 data-testid="header-user-name">{user}</h1>
            <nav>
              <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
              <Link data-testid="link-to-profile" to="/profile">Meu perfil</Link>
            </nav>
          </>
        )}
      </header>
    );
  }
}

export default Header;
