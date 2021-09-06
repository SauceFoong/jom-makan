import Head from "next/head";
import { useUser } from "../firebase/auth/useUser";

const order = () => {
  const { user, logout } = useUser();
  console.log(user);
  if (user) {
    console.log(user);
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
