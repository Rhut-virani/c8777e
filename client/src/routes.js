import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Switch, withRouter } from 'react-router-dom';

import Signup from './components/Auth/Signup.js';
import Login from './components/Auth/Login.js';
import { SnackbarError, Home } from './components';
import { SocketContext, socket } from './context/socket';
import AuthWrapper from './components/AuthWrapper.js';

const Routes = (props) => {
  const [user, setUser] = useState({
    isFetching: true,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('/auth/login', credentials);
      await localStorage.setItem('messenger-token', data.token);
      setUser(data);
      socket.emit('go-online', data.id);
    } catch (error) {
      console.error(error);
      setUser({ error: error.response.data.error || 'Server Error' });
    }
  };

  const register = async (credentials) => {
    try {
      const { data } = await axios.post('/auth/register', credentials);
      await localStorage.setItem('messenger-token', data.token);
      setUser(data);
      socket.emit('go-online', data.id);
    } catch (error) {
      console.error(error);
      setUser({ error: error.response.data.error || 'Server Error' });
    }
  };

  const logout = async (id) => {
    try {
      await axios.delete('/auth/logout');
      await localStorage.removeItem('messenger-token');
      setUser({});
      socket.emit('logout', id);
    } catch (error) {
      console.error(error);
    }
  };

  // Lifecycle

  useEffect(() => {
    const fetchUser = async () => {
      setUser((prev) => ({ ...prev, isFetching: true }));
      try {
        const { data } = await axios.get('/auth/user');
        setUser(data);
        if (data.id) {
          socket.emit('go-online', data.id);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setUser((prev) => ({ ...prev, isFetching: false }));
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (user?.error) {
      // check to make sure error is what we expect, in case we get an unexpected server error object
      if (typeof user.error === 'string') {
        setErrorMessage(user.error);
      } else {
        setErrorMessage('Internal Server Error. Please try again');
      }
      setSnackBarOpen(true);
    }
  }, [user?.error]);

  if (user?.isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}
      <Switch>
        <Route
          path="/login"
          render={() => (
            <AuthWrapper isLogin={true}>
              <Login user={user} login={login} />
            </AuthWrapper>
          )}
        />
        <Route
          path="/register"
          render={() => (
            <AuthWrapper isLogin={false}>
              <Signup user={user} register={register} />
            </AuthWrapper>
          )}
        />
        <Route
          exact
          path="/"
          render={(props) =>
            user?.id ? (
              <Home user={user} logout={logout} />
            ) : (
              <AuthWrapper isLogin={false}>
                <Signup user={user} register={register} />
              </AuthWrapper>
            )
          }
        />
        <Route
          path="/home"
          render={() => (
            <Home
              user={user}
              logout={logout}
              setSnackBarOpen={setSnackBarOpen}
              setErrorMessage={setErrorMessage}
            />
          )}
        />
      </Switch>
    </SocketContext.Provider>
  );
};

export default withRouter(Routes);
