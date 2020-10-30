import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ loginHandler }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const emailChanged = (event) => {
    const { target: { value: newEmail } } = event;
    const updatedCredentials = { ...credentials, email: newEmail };
    setCredentials(updatedCredentials);
  };

  const passwordChanged = (event) => {
    const { target: { value: newPassword } } = event;
    const updatedCredentials = { ...credentials, password: newPassword };
    setCredentials(updatedCredentials);
  };

  const submitCredentials = async (event) => {
    event.preventDefault();
    await loginHandler(credentials.email, credentials.password);
  };

  return (
    <div>
      a login page
      <form id="login-form">
        <label>email</label>
        <input className="login-input" onChange={emailChanged}/>
        <label>password</label>
        <input className="login-input" type="password" onChange={passwordChanged}/>
        <button id="submit-login-button"
                onClick={submitCredentials}>Submit
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
