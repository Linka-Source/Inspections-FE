/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../state/auth';
import { ADD_USER } from '../api/mutations';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '', firstName: '', lastName: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: { ...formState },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
      <Link to="/login">Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2 bg-white rounded p-4">
          <label className="p-3 border rounded block w-full mb-3 text-center text-pink-400" htmlFor="firstName">First Name:</label>
          <input className="p-3 border rounded block w-full mb-3 text-center border-purple-200 text-pink-500" placeholder="First" name="firstName" type="firstName" id="firstName" onChange={handleChange} />
        </div>
        <div className="flex-row space-between my-2">
          <label className="p-3 border rounded block w-full mb-3 text-center text-pink-400" htmlFor="lastName">Last Name:</label>
          <input className="p-3 border rounded block w-full mb-3 text-center border-purple-200 text-pink-500" placeholder="Last" name="lastName" type="lastName" id="lastName" onChange={handleChange} />
        </div>
        <div className="flex-row space-between my-2">
          <label className="p-3 border rounded block w-full mb-3 text-center text-pink-400" htmlFor="email">Email:</label>
          <input className="p-3 border rounded block w-full mb-3 text-center border-purple-200 text-pink-500" placeholder="youremail@test.com" name="email" type="email" id="email" onChange={handleChange} />
        </div>
        <div className="flex-row space-between my-2">
          <label className="p-3 border rounded block w-full mb-3 text-center text-pink-400" htmlFor="pwd">Password:</label>
          <input className="p-3 border rounded block w-full mb-3 text-center border-purple-200 text-pink-500" placeholder="******" name="password" type="password" id="pwd" onChange={handleChange} />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
