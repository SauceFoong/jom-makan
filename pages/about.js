import Head from "next/head";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Image,
  Center,
  // Text,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
const About = () => {
  return (
    <div>
      <Head>
        <title>About Us</title>
      </Head>
      <Center fontSize={40} pt={10} fontWeight={"bold"}>
        <h1>FAQs</h1>
      </Center>
      <Accordion allowToggle allowMultiple>
        <AccordionItem>
          <AccordionButton fontSize={25}>
            <Box>1. How to Create An Order?</Box>
          </AccordionButton>
          <AccordionPanel>
            <Table variant={"simple"} border="hidden">
              <Tbody>
                <Tr border={"hidden"}>
                  <Td>Steps to create an order in Jom Makan:</Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    a. To create an order, you can click on the &quot;+
                    Order&quot; button.
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    <Image src="../../jom-makan-faq-order.png" />
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    b. In the pop-up form, enter the Restaurant&apos;s Name
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    <Image src="../../jom-makan-faq-restaurant.png" />
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    c. You may also enter the Order&apos;s Description to give
                    the other Jommers an idea of what this Jom is about. (e.g.
                    Brief intro to what are the specialties of the restaurant).
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    <Image src="../../jom-makan-faq-description.png" />
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    d. You may also insert the URL to the menu or blog page that
                    shows a glance of the foods or beverages that you are
                    planning to order.
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    <Image src="../../jom-makan-faq-menu.png" />
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    e. For each order, you can request for tips by stating the
                    amount of tips you want and collect them from other Jommers
                    who joined your order.
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    <Image src="../../jom-makan-faq-tips.png" />
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    f. You may select the date and time to close your order.
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td>
                    <Image src="../../jom-makan-faq-date.png" />
                  </Td>
                </Tr>
                <Tr border={"hidden"}>
                  <Td fontStyle={"italic"} fontSize={20}>
                    Above are the steps to create an order in Jom Makan, so what
                    are you waiting for? Create your order now at Jom Makan!
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default About;
