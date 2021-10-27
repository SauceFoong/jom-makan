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
const Faq = () => {
  return (
    <div>
      <Head>
        <title>FAQs</title>
      </Head>
      <Center fontSize={40} pt={10}>
        <h1>Frequently Asked Questions</h1>
      </Center>
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton fontSize={25}>
            <Box paddingTop={2} paddingLeft={5} paddingBottom={2}>
              1. How to create an Order?
            </Box>
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
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton fontSize={25}>
                <Box paddingTop={2} paddingLeft={5} paddingBottom={2}>
                  2. How to join a Jom?
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <Table variant={"simple"} border="hidden">
                  <Tbody>
                    <Tr border={"hidden"}>
                      <Td>Steps to join a Jom in Jom Makan:</Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>a. Click on the Order &gt; Today Orders</Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        <Image src="../../jom-makan-faq-jom.png" />
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        b. Click on the Order that you&apos;re interested in to
                        view more details about the Order.
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        <Image src="../../jom-makan-faq-details.png" />
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        c. You can click on the &quot;Jom&quot; button to join
                        the Jom.
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        d. After that, you can submit what you wanted to order
                        in the Remark section via the Jom.
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        <Image src="../../jom-makan-faq-jom-test.png" />
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        e. You are only allowed to edit the Remark before the
                        order closing time and date.
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        f. You may also choose the payment method that you
                        prefer in the Jom.
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        <Image src="../../jom-makan-faq-payment.png" />
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        g. Once you done selecting the payment method and filled
                        the order remark, you may click on the
                        &quot;Confirm&quot; button to submit your Jom order.
                        Your Jom order will be immediately reflected at the
                        order&apos;s details.
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        <Image src="../../jom-makan-faq-jom-detail.png" />
                      </Td>
                    </Tr>
                    <Tr border={"hidden"} fontStyle={"italic"}>
                      <Td>
                        Above are the steps to join a Jom in Jom Makan. Join a
                        Jom now!
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton fontSize={25}>
                <Box paddingTop={2} paddingLeft={5} paddingBottom={2}>
                  3. How to upload receipt after paying in Jom Makan?
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <Table variant={"simple"} border="hidden">
                  <Tbody>
                    <Tr border={"hidden"}>
                      <Td>Steps to upload a receipt in Jom Makan:</Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>a. Click on the Order &gt; Your Joms</Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        <Image src="../../jom-makan-faq-yourjoms.png" />
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>b. Click on the Jom that you&apos;ve joined.</Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        c. Move over to your Jom record in the Order Details and
                        click on the &quot;Upload&quot; button.
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        <Image src="../../jom-makan-faq-jom-detail.png" />
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        d. You may upload your receipt in either PNG, JPEG and
                        PDF format without exceeding 5MB and click the
                        &quot;Save&quot; button to upload.
                      </Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        <Image src="../../jom-makan-faq-upload-receipt.png" />
                      </Td>
                    </Tr>
                    <Tr border={"hidden"} fontStyle={"italic"}>
                      <Td>
                        Above are the steps to upload a receipt in Jom Makan.
                        Join a Jom now!
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton fontSize={25}>
                <Box paddingTop={2} paddingLeft={5} paddingBottom={2}>
                  4. Is there any way to view my previous Orders?
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <Table variant={"simple"} border="hidden">
                  <Tbody>
                    <Tr border={"hidden"}>
                      <Td>Step to view previous Orders in Jom Makan:</Td>
                    </Tr>
                    <Tr border={"hidden"}>
                      <Td>
                        a. Click on the Order &gt; Your Orders. You will see all
                        your previous Orders in the secton below it.
                      </Td>
                    </Tr>
                    <Tr border={"hidden"} fontStyle={"italic"}>
                      <Td>
                        Above is the step to view previous Orders in Jom Makan.
                        Create an Order at Jom Makan now!
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton fontSize={25}>
                <Box paddingTop={2} paddingLeft={5} paddingBottom={2}>
                  5. Do I need to go with the Order&apos;s owner when I joined a
                  Jom?
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <Table variant={"simple"} border="hidden">
                  <Tbody>
                    <Tr border={"hidden"}>
                      <Td>
                        You don&apos;t need to go with the Order&apos;s owner
                        when you joined the Jom. The owner will deliver the food
                        to your table.
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton fontSize={25}>
                <Box paddingTop={2} paddingLeft={5} paddingBottom={2}>
                  6. Why do I need to pay the tips to the Order&apos;s owner
                  when I joined a Jom?
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <Table variant={"simple"} border="hidden">
                  <Tbody>
                    <Tr border={"hidden"}>
                      <Td>
                        The tips paid to the owner is the recognition to the
                        owner&apos;s effort for bringing the food from outside
                        to your table.
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton fontSize={25}>
                <Box paddingTop={2} paddingLeft={5} paddingBottom={2}>
                  7. What is the difference between Public and Private order?
                </Box>
              </AccordionButton>
              <AccordionPanel>
                <Table variant={"simple"} border="hidden">
                  <Tbody>
                    <Tr border={"hidden"}>
                      <Td>
                        Private order can only be seen with the link sent by the
                        orderer. Hence, you won&apos;s see it in the
                        &quot;Orders Today&quot; tab but Public order can be
                        seen over there. You can use private order for your
                        small group of orders.
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
