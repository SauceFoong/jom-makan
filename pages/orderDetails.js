import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Button,
} from "@chakra-ui/react";
import { db } from "../lib/db";
import { useEffect, useState } from "react";

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

const orderDetails = () => {
  const { joms } = useJom("gkLd1DNhdCZAidkuX0Yr");
  
  return (
    <>
      <div>Order Details</div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Remark</Th>
            <Th>Pay</Th>
          </Tr>
        </Thead>
        <Tbody>
          {joms &&
            joms.map((jom) => {
              return (
                <Tr>
                  <Th>{jom.user_id}</Th>
                  <Th>{jom.remark}</Th>
                  <Th>
                    <Button onClick>Pay</Button>
                  </Th>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </>
  );
};

export default orderDetails;
