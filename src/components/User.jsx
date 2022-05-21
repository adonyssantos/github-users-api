import React, { useState, useEffect } from 'react';
import { createAdaptedUser } from '../adapters';
import { useGithubApi } from '../hooks';
import '../styles/User.css';

const User = () => {
  const [user, setUser] = useState(null);
  const [usernameField, setUsernameField] = useState(null);
  const { user: githubUser, error, loading } = useGithubApi(usernameField);

  useEffect(() => {
    if (githubUser) {
      setUser(createAdaptedUser(githubUser));
    }
  }, [githubUser]);

  const handleSubmit = event => {
    const form = event.target;
    const usernameValue = form.username.value;

    event.preventDefault();
    setUsernameField(usernameValue);
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='header'>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='GitHub Username'
        />
        <input type='submit' value='Search' />
      </form>
      <div className='user'>
        {loading ? (
          <div>Loading...</div>
        ) : !error ? (
          user && (
            <div>
              <img src={user.avatar} alt={user.name} />
              <h1>{user.name}</h1>
              <p>{user.title}</p>
            </div>
          )
        ) : (
          <div>{error.message}</div>
        )}
      </div>
    </>
  );
};

export default User;
