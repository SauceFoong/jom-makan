import Head from "next/head";
import { useUser } from "../lib/auth/useUser";
import OrderCard from "../components/OrderCard";

const order = () => {
  const { user, logout } = useUser();
  if (user) {
    return (
      <div>
        <Head>
          <title>Order</title>
        </Head>
        <div>
          <OrderCard creator={user} />
          <h1>{user.name}</h1>
          <h3>{user.email}</h3>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please Sign in first</h1>
      </div>
    );
  }
};

export default order;
