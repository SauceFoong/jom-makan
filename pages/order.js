import Head from "next/head";
import React, { useState, useEffect } from "react";
import { db, getUserDetails } from "../lib/db";
import { useUser } from "../lib/auth/useUser";
import OrderCard from "../components/OrderCard";
import { formatRelative } from "date-fns";
import enGB from "date-fns/locale/en-GB";
import {
  Flex,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

function useOrder(loading) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("orders")
      .orderBy("created_at", "desc")
      .onSnapshot((snapshot) => {
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
    lastWeek: "'Last' eeee ' at 'hh:mm aa",
    yesterday: "'Yesterday at 'hh:mm aa",
    today: "'Today at 'hh:mm aa",
    tomorrow: "'Tomorrow at 'hh:mm aa",
    nextWeek: "'Next ' eeee ' at ' hh:mm aa",
    other: "dd/MM/yyyy ' at ' hh:mm aa",
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
        <Tabs isLazy>
          <TabList>
            <Tab>Orders Today</Tab>
            <Tab>Your orders</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {isLoading ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  <Flex flexWrap={"wrap"}>
                    {orders &&
                      orders.map((order, index) => {
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
                  </Flex>
                </>
              )}
            </TabPanel>
            <TabPanel>
              {isLoading ? (
                <h2>Loading...</h2>
              ) : (
                <>
                  <Flex flexWrap={"wrap"}>
                    {orders &&
                      orders.map((order, index) => {
                        if (order.created_by.id === user.id) {
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
                        }
                      })}
                  </Flex>
                </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        ""
      )}
    </div>
  );
};

export default order;
