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
} from "@chakra-ui/react";
import Head from "next/head";
import { db, getOrder, updatePayment } from "../lib/db";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import OrderDetailSkeleton from "../components/OrderDetailSkeleton";

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

const onClickUpdatePayment = async (jom_id, jom) => {
  const data = {
    ...jom,
    pay: true,
  };
  await updatePayment(jom_id, data);
};

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

const OrderDetails = () => {
  const [order, setOrder] = useState();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { joms } = useJom(id);
  // console.log(joms);

  useEffect(async () => {
    const { order } = await getOrder(id);
    setOrder(order);
    setLoading(false);
  }, []);
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
            Menu: <Link>{order.ref_url}</Link>
          </Text>
          <Text style={{ marginLeft: "15px" }}>
            Description: {order.description}
          </Text>
          <Text style={{ marginLeft: "15px" }}>Tips: {order.tips}</Text>
          <Text style={{ marginLeft: "15px" }}>
            Order Date: {order.order_date}
          </Text>
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
                    <Tr key={jom.id}>
                      <Th key={jom.id}>{jom.user_name}</Th>
                      <Th>{jom.remark}</Th>
                      <Th>
                        <Center>
                          {jom.pay ? (
                            <Text>Paid</Text>
                          ) : (
                            <Button
                              onClick={() => onClickUpdatePayment(jom.id, jom)}
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
