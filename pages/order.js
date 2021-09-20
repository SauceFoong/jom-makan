import Head from "next/head";
import React, { useState, useEffect } from "react";
import { db, getJom, getUserDetails } from "../lib/db";
import { useUser } from "../lib/auth/useUser";
import OrderCard from "../components/OrderCard";
import { formatRelative, isToday } from "date-fns";
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
      .onSnapshot(async (snapshot) => {
        let newOrder = snapshot.docs.map(async (doc) => {
          const orderData = doc.data();
          const { user } = await getUserDetails(orderData.created_by);
          orderData.created_by = user;
          return orderData;
        });
        await Promise.all(newOrder).then((newOrder) => {
          setOrders(newOrder);
        });
        loading(false);
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

  return (
    <div>
      <Head>
        <title>Order</title>
      </Head>
      {user ? (
        <Tabs isLazy>
          <TabList>
            <Tab>Today's Orders</Tab>
            <Tab>All Orders</Tab>
            <Tab>Your Orders</Tab>
            <Tab>Your Joms</Tab>
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
                        if (isToday(new Date(order.order_date))) {
                          const yourOrder = order.created_by.id === user.id;
                          const yourJom = order.jom_members.includes(user.id);
                          console.log(yourJom);
                          return (
                            <OrderCard
                              key={index}
                              id={order.id}
                              creator_name={order.created_by.name}
                              creator_pic={order.created_by.profilePic}
                              res_name={order.res_name}
                              ref_url={order.ref_url}
                              order_date={order.order_date}
                              tips={order.tips}
                              description={order.description}
                              yourOrder={yourOrder}
                              yourJom={yourJom}
                            />
                          );
                        }
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
                        const yourOrder = order.created_by.id === user.id;
                        const yourJom = order.jom_members.includes(user.id);
                        return (
                          <OrderCard
                            key={index}
                            id={order.id}
                            creator_name={order.created_by.name}
                            creator_pic={order.created_by.profilePic}
                            res_name={order.res_name}
                            ref_url={order.ref_url}
                            order_date={order.order_date}
                            tips={order.tips}
                            description={order.description}
                            yourOrder={yourOrder}
                            yourJom={yourJom}
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
                          const yourOrder = order.created_by.id === user.id;
                          const yourJom = order.jom_members.includes(user.id);
                          return (
                            <OrderCard
                              key={index}
                              id={order.id}
                              creator_name={order.created_by.name}
                              creator_pic={order.created_by.profilePic}
                              res_name={order.res_name}
                              ref_url={order.ref_url}
                              order_date={order.order_date}
                              tips={order.tips}
                              description={order.description}
                              yourOrder={true}
                              yourJom={false}
                            />
                          );
                        }
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
                        if (order.jom_members.includes(user.id)) {
                          return (
                            <OrderCard
                              key={index}
                              id={order.id}
                              creator_name={order.created_by.name}
                              creator_pic={order.created_by.profilePic}
                              res_name={order.res_name}
                              ref_url={order.ref_url}
                              order_date={order.order_date}
                              tips={order.tips}
                              description={order.description}
                              yourOrder={false}
                              yourJom={true}
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
