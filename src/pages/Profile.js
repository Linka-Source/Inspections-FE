/* eslint-disable prettier/prettier */
import React from 'react';
import { QUERY_USER } from '../api/queries';
import { useQuery } from '@apollo/client';

const Profile = () => {
  const { data, loading } = useQuery(QUERY_USER);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p className="p-3 border rounded block w-full mb-3 text-center border-purple-200 text-pink-500">First Name: {data.user.firstName}</p>
      <p className="p-3 border rounded block w-full mb-3 text-center border-purple-200 text-pink-500">Last Name: {data.user.lastName}</p>
      <p className="p-3 border rounded block w-full mb-3 text-center border-purple-200 text-pink-500">Email: {data.user.email}</p>
    </div>
  );
};

export default Profile;
