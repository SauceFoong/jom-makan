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
import { db, getOrder, updatePayment } from "../lib/db";
import enGB from "date-fns/locale/en-GB";
import { formatRelative } from "date-fns";
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

const onClickUpdatePayment = async (jom_id, jom) => {
  const data = {
    ...jom, 
    pay: true,
  }
  await updatePayment(jom_id, data);
};

const orderDetails = () => {
  const { joms } = useJom("gkLd1DNhdCZAidkuX0Yr");
  const [order, setOrder] = useState();
  const [isLoading, setLoading] = useState(true);

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

  useEffect(async () => {
    const {order} = await getOrder("gkLd1DNhdCZAidkuX0Yr");
    setOrder(order);
    setLoading(false)
  },[]);
  return (  
    <>
    {isLoading ? <div>Loading ...</div> : 
    <>
    <Text as="u" style={{marginLeft:"15px"}}>Order Details</Text>
    <Text style={{marginLeft:"15px"}}>Restaurant Name: {order.res_name}</Text>
    <Text style={{marginLeft:"15px"}}>Menu: <Link>{order.ref_url}</Link></Text>
    <Text style={{marginLeft:"15px"}}>Description: {order.description}</Text>
    <Text style={{marginLeft:"15px"}}>Tips: {order.tips}</Text>
    <Text style={{marginLeft:"15px"}}>Order Date: {formatRelative(new Date(order.order_date), new Date(), { locale })}</Text>
      <Table variant="simple" style={{marginTop:"20px"}}>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Remark</Th>
            <Th><Center>Pay</Center></Th>
          </Tr>
        </Thead>
        <Tbody>
          {joms &&
            joms.map((jom) => {
              return (
                <Tr>
                  <Th>{jom.user_name}</Th>
                  <Th>{jom.remark}</Th>
                  <Th>
                    <Center>{jom.pay ? <Text>Paid</Text> : <Button onClick={() => onClickUpdatePayment(jom.id, jom)}>Pay</Button>}</Center>
                  </Th>
                </Tr>
              );
            })}
        </Tbody>
      </Table></>}
    </>
    
  );
};

export default orderDetails;
