import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
