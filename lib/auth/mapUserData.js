export const mapUserData = async (user) => {
  const { uid, email, xa, displayName, photoURL } = user;
  return {
    id: uid,
    email,
    token: xa,
    name: displayName,
    profilePic: photoURL,
  };
};
