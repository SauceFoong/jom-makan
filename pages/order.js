import Head from "next/head";
import React, { useState, useEffect } from "react";
import { db } from "../lib/db";
import { useUser } from "../lib/auth/useUser";
import OrderCard from "../components/OrderCard";

function useOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    db.collection("orders").onSnapshot((snapshot) => {
      const newOrder = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(newOrder);
    });
  }, []);
  return orders;
}

const order = () => {
  const { user, logout } = useUser();
  const orders = useOrder();

  return (
    <div>
      <Head>
        <title>Order</title>
      </Head>
      {user ? (
        <div>
          {orders.map((order, index) => {
            return (
              <OrderCard
                key={index}
                creator={order.created_by}
                res_name={order.res_name}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default order;
