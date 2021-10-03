import {
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
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useDisclosure,
  Textarea,
  FormErrorMessage,
  ModalFooter,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import Head from "next/head";
import { db, getOrder, updatePayment, updateRemark } from "../lib/db";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUser } from "../lib/auth/useUser";
import enGB from "date-fns/locale/en-GB";
import { formatRelative } from "date-fns";
import OrderDetailSkeleton from "../components/OrderDetailSkeleton";
import EditRemarkButton from "../components/EditRemarkButton";

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

const onClickUpdateRemark = async (jom_id, jom, order_id, user_id, remark) => {
  const data = {
    ...jom,
    remark: remark,
  };
  const callback = await updateRemark(jom_id, data, order_id, user_id);
  return callback;
};

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
  const router = useRouter();
  const { id } = router.query;
  const { joms } = useJom(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

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

  const onSubmit = async (data) => {};

  useEffect(() => {
    getOrder(id).then((orderData) => {
      const { order } = orderData;
      console.log(order);
      setOrder(order);
      setLoading(false);
    });
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
          <Divider />
          <Table variant="simple" style={{ marginTop: "20px" }}>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Remark</Th>
                <Th></Th>
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
                      <Th>
                        {jom.user_id === user.id ? (
                          <EditRemarkButton jom={jom} jom_id={jom.id} />
                        ) : (
                          ""
                        )}
                      </Th>
                      <Th>
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
