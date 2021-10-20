import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
  Text,
  Link,
  Divider,
  useToast,
  Icon,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { CloseIcon, LinkIcon } from "@chakra-ui/icons";
import {
  BiReceipt,
  BiRestaurant,
  BiLink,
  BiInfoCircle,
  BiDollar,
  BiCalendarX,
  BiAlarmExclamation,
} from "react-icons/bi";
import { useForm } from "react-hook-form";
import React from "react";
import Head from "next/head";
import { db, updatePayment, updateRemark } from "../lib/db";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../lib/auth/useUser";
import enGB from "date-fns/locale/en-GB";
import { formatRelative } from "date-fns";
import OrderDetailSkeleton from "../components/OrderDetailSkeleton";
import UploadFile from "../components/UploadFile";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import JomButton from "../components/JomButton";
import CancelJomButton from "../components/CancelJomButton";
import {
  uploadOrderReceipt,
  deleteOderReceipt,
  uploadPaymentReceipt,
} from "../lib/db";
import { showToast } from "../lib/Helper/Toast";
import Receipt from "../components/Receipt";
import EditJomButton from "../components/EditJomButton";

const MAX_FILE_SIZE = 5000000;

function useJom(order_id) {
  const [joms, setJom] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("joms")
      .orderBy("created_at")
      .onSnapshot((snapshot) => {
        const newJom = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setJom(newJom.filter((jom) => jom.order_id === order_id));
      });

    return () => unsubscribe();
  }, []);
  return { joms };
}

const onClickUpdatePayment = async (jom_id, jom, order_id, user_id) => {
  const data = {
    ...jom,
    pay: true,
  };
  const callback = await updatePayment(jom_id, data, order_id, user_id);
  console.log(callback);
  return callback;
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const OrderDetails = () => {
  const { user, logout } = useUser();
  const [order, setOrder] = useState();
  const [isLoading, setLoading] = useState(true);
  // const [orderReceipt, setOrderReceipt] = useState([]);
  const [toggleLightBox, setToggleLightBox] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { joms } = useJom(id);

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

  const removeOrderReceipt = async (order_id) => {
    await deleteOderReceipt(order_id);
    showToast(
      toast,
      "Receipt Deleted Successfully.",
      "Please reupload a new receipt!",
      "success",
      5000,
      true
    );
  };

  useEffect(() => {
    //Realtime update of order
    const unsubscribe = db
      .collection("orders")
      .doc(id)
      .onSnapshot((doc) => {
        const order = doc.data();
        setOrder(order);
        setLoading(false);
      });
    return () => unsubscribe();

    // const { order } = await getOrder(id);
    // getOrder(id).then((orderData) => {
    //   const { order } = orderData;
    //   // console.log(order);
    //   setOrder(order);
    //   // console.log(order);
    //   setLoading(false);
    // if (orderData.exists) {
    //   const { order } = orderData;

    // }
    // });
  }, []);

  const toast = useToast();

  return (
    <>
      {isLoading ? (
        <OrderDetailSkeleton />
      ) : (
        <>
          <Head>
            <title>Order Details</title>
          </Head>

          <Text as="u" style={{ marginLeft: "15px" }}>
            Order Details
          </Text>
          <List spacing={1} p={3}>
            <ListItem>
              <ListIcon as={BiRestaurant} color="blue.500" />
              Restaurant Name: {order.res_name}
            </ListItem>
            <ListItem>
              <ListIcon as={BiLink} color="blue.500" />
              Menu:{" "}
              <Link href={order.ref_url} isExternal>
                {order.ref_url}
              </Link>{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={BiInfoCircle} color="blue.500" />
              Description: {order.description}
            </ListItem>
            <ListItem>
              <ListIcon as={BiDollar} color="blue.500" />
              Tips: {order.tips}{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={BiCalendarX} color="blue.500" />
              Order Date:{" "}
              {formatRelative(new Date(order.order_date), new Date(), {
                locale,
              })}{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={BiAlarmExclamation} color="blue.500" />
              Order Receipt:{" "}
              {order.order_receipt.length > 0 ? (
                <>
                  <Icon
                    as={BiReceipt}
                    w={10}
                    h={10}
                    onClick={setToggleLightBox}
                    cursor={"zoom-in"}
                    _hover={{
                      bg: "gray.500",
                    }}
                  />
                  {user && order.created_by === user.id ? (
                    <LinkIcon
                      ml={2}
                      fontSize={10}
                      onClick={() => removeOrderReceipt(order.id)}
                      as={CloseIcon}
                      color={"red"}
                      cursor={"pointer"}
                      _hover={{
                        bg: "gray.300",
                        borderRadius: "50%",
                      }}
                      zIndex={1}
                    />
                  ) : (
                    ""
                  )}
                  {toggleLightBox && order.order_receipt.length > 1 ? (
                    //Multiple Receipt
                    <Lightbox
                      images={order.order_receipt}
                      title={"Order Receipt "}
                      onClose={() => setToggleLightBox(false)}
                    />
                  ) : toggleLightBox && order.order_receipt.length === 1 ? (
                    //Single Receipt
                    <Lightbox
                      image={order.order_receipt}
                      title={"Order Receipt "}
                      onClose={() => setToggleLightBox(false)}
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : user && order.created_by === user.id ? (
                <UploadFile
                  multiple
                  id={order.id}
                  accept=".jpg,.png,.jpeg"
                  limitFiles={2}
                  maxFileSizeInBytes={MAX_FILE_SIZE}
                  label="Supports PNG, JPG, JPEG up to 5Mb"
                  dbFunc={uploadOrderReceipt}
                />
              ) : (
                //updateFilesCb={(files) => setOrderReceipt(files)}
                "-"
              )}
            </ListItem>
          </List>
          <Box p={3} maxW={"300px"} textAlign={"Center"}>
            {user && user.id != order.created_by ? (
              !order.jom_members.includes(user.id) ? (
                <JomButton
                  order_id={order.id}
                  order_name={order.res_name}
                  order_date={new Date(order.order_date)}
                />
              ) : (
                <CancelJomButton
                  order_id={order.id}
                  order_name={order.res_name}
                  order_date={new Date(order.order_date)}
                />
              )
            ) : (
              ""
            )}
          </Box>

          <Divider />
          <Box overflowX="auto">
            <Table variant="simple" style={{ marginTop: "20px" }}>
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Remark</Th>
                  <Th>Payment Method</Th>
                  <Th></Th>
                  <Th>Receipt</Th>
                  <Th>Pay</Th>
                </Tr>
              </Thead>
              <Tbody>
                {joms &&
                  joms.map((jom, index) => {
                    return (
                      <Tr key={index}>
                        <Th>{jom.user_name}</Th>
                        <Th>{jom.remark}</Th>
                        <Th>{jom.payment_method}</Th>
                        <Th>
                          {user && jom.user_id === user.id ? (
                            <>
                              <EditJomButton
                                order_date={new Date(order.order_date)}
                                jom={jom}
                              />
                            </>
                          ) : (
                            ""
                          )}
                        </Th>
                        <Th>
                          {user &&
                          jom.user_id === user.id &&
                          jom.payment_method === "Online Transfer" ? (
                            jom.payment_receipt.length === 0 ? (
                              <UploadFile
                                multiple
                                id={jom.id}
                                accept=".jpg,.png,.jpeg"
                                limitFiles={1}
                                maxFileSizeInBytes={MAX_FILE_SIZE}
                                label="Supports PNG, JPG, JPEG up to 5Mb"
                                dbFunc={uploadPaymentReceipt}
                              />
                            ) : (
                              ""
                            )
                          ) : jom.payment_method === "Online Transfer" ||
                            jom.payment_receipt.length > 0 ? (
                            ""
                          ) : (
                            "-"
                          )}
                          {jom.payment_receipt.length > 0 ? (
                            <Receipt jom={jom} />
                          ) : (
                            ""
                          )}
                          {/* {user &&
                          jom.user_id === user.id &&
                          jom.payment_method === "Online Transfer" ? (
                            jom.payment_receipt.length === 0 ? (
                              <UploadFile
                                multiple
                                id={jom.id}
                                accept=".jpg,.png,.jpeg"
                                limitFiles={1}
                                maxFileSizeInBytes={MAX_FILE_SIZE}
                                label="Supports PNG, JPG, JPEG up to 5Mb"
                                dbFunc={uploadPaymentReceipt}
                              />
                            ) : (
                              <Receipt jom={jom} />
                            )
                          ) : (
                            "-"
                          )} */}
                        </Th>
                        <Th>
                          <Button
                            onClick={() => {
                              const callback = onClickUpdatePayment(
                                jom.id,
                                jom,
                                jom.order_id,
                                user.id
                              );
                              callback.then((result) => {
                                if (result == false) {
                                  showToast(
                                    toast,
                                    "Not owner.",
                                    "Only owner of the order can click the pay button",
                                    "error",
                                    5000,
                                    true
                                  );
                                }
                              });
                            }}
                            isDisabled={jom.pay}
                          >
                            {jom.pay ? "Paid" : "Pay"}
                          </Button>
                        </Th>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </>
  );
};

export default OrderDetails;
