export const createAdaptedUser = user => {
  return {
    name: user.name,
    title: user.bio,
    avatar: user.avatar_url,
  };
};
