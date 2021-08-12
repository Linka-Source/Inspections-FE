import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../api/mutations';
import Auth from '../state/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { ...formState },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="App text todos">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="App text todos">
          <label htmlFor="email">Email address:</label>
          <input placeholder="youremail@test.com" name="email" type="email" id="email" onChange={handleChange} />
        </div>
        <div className="App text todos">
          <label htmlFor="pwd">Password:</label>
          <input placeholder="******" name="password" type="password" id="pwd" onChange={handleChange} />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="App text todos">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
