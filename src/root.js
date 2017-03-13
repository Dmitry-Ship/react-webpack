import React from 'react';

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import './styles/index.scss';

import MainPage from './components/pages/MainPage';
import AboutPage from './components/pages/AboutPage';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import ForgotPasswordPage from './components/pages/ForgotPasswordPage';
import ResetPasswordPage from './components/pages/ResetPasswordPage';
import EditProfilePage from './components/pages/EditProfilePage';
import ViewProfilePage from './components/pages/ViewProfilePage';
import NotFound from './components/pages/NotFound';
import MainLayout from './components/layouts/MainLayout';
import { getIsLoggedIn } from './reducers/authReducer';

const Root = ({ store }) => {
  function isNotLoggedIn(nextState, replace, next) {
    if (!getIsLoggedIn(store.getState())) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
    next();
  }

  function isLoggedIn(nextState, replace, next) {
    if (getIsLoggedIn(store.getState())) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname },
      });
    }
    next();
  }

  return (
    <Provider store={store} >
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout} >
          <IndexRoute component={MainPage} onEnter={isNotLoggedIn} />
          <Route path="tags/:tagText" component={MainPage} onEnter={isNotLoggedIn} />
          <Route path="about" component={AboutPage} onEnter={isNotLoggedIn} />
          <Route path="profile" component={ViewProfilePage} onEnter={isNotLoggedIn} />
          <Route path="editprofile" component={EditProfilePage} onEnter={isNotLoggedIn} />
          <Route path="login" component={LoginPage} onEnter={isLoggedIn} />
          <Route path="signup" component={SignUpPage} onEnter={isLoggedIn} />
          <Route path="forgotpassword" component={ForgotPasswordPage} onEnter={isLoggedIn} />
          <Route path="reset/:token" component={ResetPasswordPage} onEnter={isLoggedIn} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
