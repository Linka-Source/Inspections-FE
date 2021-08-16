/* eslint-disable prettier/prettier */
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
    <div className="container my-1">
      <div> 

      <Link className="p-3 rounded w-auto text-centre text-white font-bold bg-pink-200" to="/signup">Go to Signup</Link>

      <h2 className="p-3 rounded w-auto text-centre text-white font-bold bg-pink-500">Login</h2>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="bg-white rounded p-4">
          <label className="p-3 border rounded block w-full mb-3 text-center text-pink-400" htmlFor="email">Email address:</label>
          <input className="p-3 border rounded block w-full mb-3 text-center border-purple-200 text-pink-500" placeholder="youremail@test.com" name="email" type="email" id="email" onChange={handleChange} />
        </div>
        <div className="bg-white rounded p-4 text-center font-bold mb-4">
          <label className="p-3 border rounded block w-full mb-3 text-center text-pink-400" htmlFor="pwd">Password:</label>
          <input className="p-3 border rounded block w-full mb-3 text-center border-purple-200 text-pink-500" placeholder="******" name="password" type="password" id="pwd" onChange={handleChange} />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div>
          <button className="p-3 rounded block w-full text-centre text-white font-bold bg-pink-500" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
