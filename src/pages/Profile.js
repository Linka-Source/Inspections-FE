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
      <p>First Name: {data.user.firstName}</p>
      <p>Last Name: {data.user.lastName}</p>
      <p>Email: {data.user.email}</p>
    </div>
  );
};

export default Profile;
