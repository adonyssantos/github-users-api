import { useState, useEffect } from 'react';

export const useGithubApi = username => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();

      data.message === 'Not Found'
        ? setError({
            status: 404,
            message: 'User not found',
          })
        : setUser(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    username && fetchUser();
  }, [username]);

  return { user, error, loading };
};
