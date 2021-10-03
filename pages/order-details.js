import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
  Text,
  Link,
  Center,
  Divider,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import { db, getOrder, updatePayment } from "../lib/db";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../lib/auth/useUser";
import enGB from "date-fns/locale/en-GB";
import { formatRelative } from "date-fns";
import OrderDetailSkeleton from "../components/OrderDetailSkeleton";
import UploadFile from "../components/UploadFile";
import ImageView from "../components/ImageView";

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
  const [orderReceipt, setOrderReceipt] = useState([]);
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

  useEffect(() => {
    // const { order } = await getOrder(id);
    getOrder(id).then((orderData) => {
      const { order } = orderData;
      // console.log(order);
      setOrder(order);
      setLoading(false);
      // if (orderData.exists) {
      //   const { order } = orderData;

      // }
    });
  }, []);
  const toast = useToast();
  return (
    <>
      {isLoading ? (
        // <div>Loading ...</div>
        <OrderDetailSkeleton />
      ) : (
        <>
          <Head>
            <title>Order Details</title>
          </Head>
          <Text as="u" style={{ marginLeft: "15px" }}>
            Order Details
          </Text>
          <Text style={{ marginLeft: "15px" }}>
            Restaurant Name: {order.res_name}
          </Text>
          <Text style={{ marginLeft: "15px" }}>
            Menu:{" "}
            <Link href={order.ref_url} isExternal>
              {order.ref_url}
            </Link>
          </Text>
          <Text style={{ marginLeft: "15px" }}>
            Description: {order.description}
          </Text>
          <Text style={{ marginLeft: "15px" }}>Tips: {order.tips}</Text>
          <Text style={{ marginLeft: "15px" }}>
            Order Date:{" "}
            {formatRelative(new Date(order.order_date), new Date(), { locale })}
          </Text>
          <UploadFile
            multiple
            orderId={order.id}
            accept=".jpg,.png,.jpeg"
            limitFiles={1}
            maxFileSizeInBytes={MAX_FILE_SIZE}
            label="Supports PNG, JPG, JPEG up to 5Mb"
            updateFilesCb={(files) => setOrderReceipt(files)}
          />

          <Divider />
          <Table variant="simple" style={{ marginTop: "20px" }}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Remark</Th>
                <Th>
                  <Center>Pay</Center>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {joms &&
                joms.map((jom, index) => {
                  return (
                    <Tr key={index}>
                      <Th>{jom.user_name}</Th>
                      <Th>{jom.remark}</Th>
                      <Th>
                        <Center>
                          {jom.pay ? (
                            <Text>Paid</Text>
                          ) : (
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
                                    toast({
                                      title: "Not owner.",
                                      description:
                                        "Only owner of the order can click the pay button",
                                      status: "error",
                                      duration: 3000,
                                      isClosable: true,
                                    });
                                  }
                                });
                              }}
                            >
                              Pay
                            </Button>
                          )}
                        </Center>
                      </Th>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default OrderDetails;
