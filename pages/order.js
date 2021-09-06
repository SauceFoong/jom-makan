import Head from "next/head";
import { useUser } from "../lib/auth/useUser";
import { updateUser } from "../lib/db";

const order = () => {
  const { user, logout } = useUser();
  if (user) {
    const { token, ...userWithoutToken } = user;
    return (
      <div>
        <h1>{user.name}</h1>
        <h3>{user.email}</h3>
      </div>
    );
  } else
    return (
      <div>
        <h1>Please Sign in first</h1>
      </div>
    );
};

export default order;
