import Head from "next/head";
import React, { useState, useEffect } from "react";
import { db, getUserDetails } from "../lib/db";
import { useUser } from "../lib/auth/useUser";
import OrderCard from "../components/OrderCard";
import { formatRelative } from "date-fns";
import enGB from "date-fns/locale/en-GB";

function useOrder(loading) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection("orders").onSnapshot((snapshot) => {
      const newOrder = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      newOrder.forEach(async (order, index) => {
        const { user } = await getUserDetails(order.created_by);
        newOrder[index].created_by = user;

        //Wait for the forEach loop finish update the user data first
        if (index === newOrder.length - 1) {
          setOrders(newOrder);
        }
      });
      loading(false);

      // console.log(newOrder);
    });
    return () => unsubscribe();
  }, []);
  return { orders };
}

const order = () => {
  const [isLoading, setLoading] = useState(true);
  const { user, logout } = useUser();
  const { orders } = useOrder(setLoading);

  //To overwrite the formatRelativeLocale method
  const formatRelativeLocale = {
    lastWeek: "'Last' eeee",
    yesterday: "'Yesterday at 'hh:mm aa",
    today: "'Today at 'hh:mm aa",
    tomorrow: "'Tomorrow at 'hh:mm aa",
    nextWeek: "'Next ' eeee",
    other: "dd.MM.yyyy",
  };

  const locale = {
    ...enGB,
    formatRelative: (token) => formatRelativeLocale[token],
  };

  return (
    <div>
      <Head>
        <title>Order</title>
      </Head>
      {user ? (
        isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <div>
            {orders.map((order, index) => {
              return (
                <OrderCard
                  key={index}
                  creator_name={order.created_by.name}
                  creator_pic={order.created_by.profilePic}
                  res_name={order.res_name}
                  ref_url={order.ref_url}
                  order_date={formatRelative(
                    new Date(order.order_date),
                    new Date(),
                    { locale }
                  )}
                  tips={order.tips}
                  description={order.description}
                />
              );
            })}
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default order;
