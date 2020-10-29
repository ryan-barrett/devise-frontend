import React          from 'react';
import { withRouter } from 'react-router-dom';
import LoginForm      from '../components/LoginForm/LoginForm';

function LoginContainer({ history }) {
  const loginHandler = async (email, password) => {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password }),
    });
    const { status } = response;
    if (status >= 200 && status < 300) {
      history.push('/');
    }
  };

  return <LoginForm loginHandler={loginHandler}/>;
}

export default withRouter(LoginContainer);
