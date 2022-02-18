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
  Tag,
  chakra,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Flex,
  HStack,
  IconButton,
  Spacer,
  MenuDivider,
} from "@chakra-ui/react";
import { CloseIcon, LinkIcon } from "@chakra-ui/icons";
import { AiOutlineTag, AiOutlineFilter, } from "react-icons/ai";
import {
  BiUser,
  BiReceipt,
  BiRestaurant,
  BiLink,
  BiInfoCircle,
  BiDollar,
  BiCalendarX,
  BiAlarmExclamation,
  BiShare,
} from "react-icons/bi";
import React, { useRef, useImperativeHandle } from "react";
import Head from "next/head";
import { db, getUserDetails, updatePayment, updateRemark } from "../lib/db";
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
import * as ga from '../lib/ga';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';

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
  // console.log(callback);
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
  const [orderer, setOrderer] = useState();
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
      .onSnapshot(async (doc) => {
        const order = doc.data();
        setOrder(order);

        setLoading(false);
        ga.custompageview(order.res_name);
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

  const r = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    r.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      r.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [r.events]);

  //old filter at column header(cause mobile view bug)
  // function DefaultColumnFilter({
  //   column: { filterValue, setFilter, preFilteredRows, id },
  // }) {
  //   // Calculate the options for filtering
  //   // using the preFilteredRows
  //   const options = React.useMemo(() => {
  //     const options = new Set()
  //     preFilteredRows.forEach(row => {
  //       if (id == 'payment_method')
  //         options.add(row.original.payment_method)
  //       else if (id == 'pay') {
  //         options.add('Paid')
  //         options.add('Unpaid')
  //       }
  //     })
  //     return [...options.values()]
  //   }, [id, preFilteredRows])

  //   // Render a multi-select box
  //   return (
  //     <Menu>
  //       <MenuButton
  //         transition='all 0.2s'
  //         borderRadius='md'
  //         borderWidth='1px'
  //         _hover={{ bg: 'gray.400' }}
  //         _expanded={{ bg: 'blue.400' }}
  //         _focus={{ boxShadow: 'outline' }}
  //         as={Button}
  //       ><AiOutlineFilter /></MenuButton>
  //       <MenuList>
  //         <MenuOptionGroup defaultValue='' title='Filter' type='radio' onChange={value => {
  //           setFilter(value || undefined)
  //         }}>
  //           <MenuItemOption value="">All</MenuItemOption>
  //           {options.map((option, i) => (
  //             option == 'Paid' || option == 'Unpaid' ?
  //               <MenuItemOption key={i} value={(option == 'Paid' ? 'true' : 'false')}>
  //                 {option}
  //               </MenuItemOption>
  //               : (
  //                 <MenuItemOption key={i} value={option}>
  //                   {option}
  //                 </MenuItemOption>)
  //           ))}
  //         </MenuOptionGroup>
  //       </MenuList>
  //     </Menu>
  //   )
  // }

  // const defaultColumn = React.useMemo(
  //   () => ({
  //     Filter: DefaultColumnFilter
  //   }),
  //   []
  // );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'user_name',
        disableFilters: true,
      },
      {
        Header: 'Remark',
        accessor: 'remark',
        disableFilters: true,
      },
      {
        Header: 'Payment Method',
        accessor: 'payment_method',
      },
      {
        Header: '',
        accessor: 'edit',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Receipt',
        accessor: 'payment_receipt',
        disableFilters: true,
        sortType: 'basic'
      },
      {
        Header: 'Pay',
        accessor: 'pay',
        // disableFilters: true,
        sortType: 'basic'
      },
    ],
    [],
  )

  // const tableInstance = useRef(null);

  // useImperativeHandle(ref, () => tableInstance);

  let setFilter;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = { setFilter } =
    useTable({ columns, data: joms}, useFilters, useSortBy)

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    showToast(
      toast,
      "Link Copied.",
      "Sharing link has been copied to clipboard.",
      "success",
      3500,
      true
    );
  }

  return (
    <>
      {isLoading ? (
        <OrderDetailSkeleton />
      ) : (
        <>
          <Head>
            <title>Order Details</title>
          </Head>

          <List spacing={1} p={3}>
            <ListItem>
              {/* <Flex> */}
              <ListIcon as={BiUser} color="blue.500" />
              <Link href={`/profile?id=${order.created_by}`} isExternal color="blue.500">
                Orderer Info
              </Link>
              {/* <Spacer /> */}
              <Box position='relative'>
                <IconButton
                  position='absolute'
                  top='-30px'
                  right='0px'
                  variant='solid'
                  colorScheme='blue'
                  aria-label='Share Jom'
                  isRound='true'
                  size='lg'
                  icon={<BiShare />}
                  onClick={copyLink}
                />
              </Box>
              {/* </Flex> */}
            </ListItem>
            <ListItem>
              <ListIcon as={BiRestaurant} color="blue.500" />
              Restaurant Name: {order.res_name}
            </ListItem>
            <ListItem>
              <ListIcon as={BiLink} color="blue.500" />
              Menu:{" "}
              <Link href={order.ref_url} isExternal color="blue.500">
                {order.ref_url}
              </Link>{" "}
            </ListItem>
            <ListItem>
              <ListIcon as={BiDollar} color="blue.500" />
              Tips: {order.tips !== "0.00" && order.tips !== "0" ? "RM " + order.tips : "-"}{" "}

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
                  label="Supports PNG, JPG, JPEG up to 5MB"
                  dbFunc={uploadOrderReceipt}
                />
              ) : (
                //updateFilesCb={(files) => setOrderReceipt(files)}
                "-"
              )}
            </ListItem>
            <ListItem>
              <ListIcon as={AiOutlineTag} color="blue.500" />
              {order.tags.length >= 1
                ? order.tags.map((tag, i) => (
                  <Tag
                    size="md"
                    key={i}
                    variant="solid"
                    colorScheme="teal"
                    marginTop="1"
                    marginRight="1"
                    style={{ textTransform: "capitalize" }}
                  >
                    {tag}
                  </Tag>
                ))
                : "No tag(s) associated with this order"}
            </ListItem>
            <ListItem>
              <ListIcon as={BiInfoCircle} color="blue.500" />
              {order.description}
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
          <Box paddingLeft={"10px"}>
          <Menu>
            <MenuButton
              transition='all 0.2s'
              borderRadius='md'
              borderWidth='1px'
              _hover={{ bg: 'gray.400' }}
              _expanded={{ bg: 'blue.400' }}
              _focus={{ boxShadow: 'outline' }}
              as={Button}
            ><HStack><Box>Filters</Box> <AiOutlineFilter /></HStack></MenuButton>
            <MenuList minW='0px' w={"150px"} border={'solid 1px #4299E1'}>
              <MenuOptionGroup defaultValue='' title='Filter' type='radio'  onChange={value => {
                setFilter("payment_method", value || undefined)
              }}>
                <MenuItemOption fontSize={"15px"} value="">All</MenuItemOption>
                <MenuItemOption fontSize={"15px"} value={'Cash'}>
                      {'Cash'}
                    </MenuItemOption>
                    <MenuItemOption fontSize={"15px"} value={'Online Transfer'}>
                      {'Online Transfer'}
                    </MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider bg={'blue.400'}/>
              <MenuOptionGroup defaultValue='' type='radio' onChange={value => {
                setFilter("pay", value || undefined)
              }}>
                <MenuItemOption fontSize={"15px"} value="">All</MenuItemOption>
                <MenuItemOption fontSize={"15px"} value={'true'}>
                      {'Paid'}
                    </MenuItemOption>
                    <MenuItemOption fontSize={"15px"} value={'false'}>
                      {'Unpaid'}
                    </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          </Box>
          <Box overflowX="auto">
            <Table variant="simple" style={{ marginTop: "20px" }} {...getTableProps()}>
              <Thead>
                {/* <Th>Name</Th>
                  <Th>Remark</Th>
                  <Th>Payment Method</Th>
                  <Th></Th>
                  <Th>Receipt</Th>
                  <Th>Pay</Th> */}
                {headerGroups.map((headerGroup, i) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                    {headerGroup.headers.map((column, j) => (
                      <Th
                        {...column.getHeaderProps()}
                        isNumeric={column.isNumeric}
                        key={j}
                      ><Flex>
                          <HStack spacing='5px'>
                            <div style="vertical-align:middle" {...column.getSortByToggleProps()}>{column.render('Header')}</div>
                            {/* {console.log(column)} */}
                            <chakra.span  {...column.getSortByToggleProps()}>
                              {column.isSorted ? (
                                column.isSortedDesc ? (
                                  <TriangleDownIcon pl='1' aria-label='sorted descending' />
                                ) : (
                                  <TriangleUpIcon pl='1' aria-label='sorted ascending' />
                                )
                              ) : null}
                            </chakra.span>
                            {/* <chakra.span alignContent='right'>{column.canFilter ? column.render('Filter') : null}</chakra.span> */}
                          </HStack>
                        </Flex>
                      </Th>

                    ))}
                  </Tr>
                ))}
              </Thead>

              <Tbody {...getTableBodyProps()}>
                {joms && rows.map((row, k) => {
                  prepareRow(row)
                  return (
                    <Tr {...row.getRowProps()} key={k}>
                      {row.cells.map((cell, index) => (<>
                        {index == 0 ?
                          <Th {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                            <Link href={`/profile?id=${row.original.user_id}`} isExternal color="blue.500">
                              {cell.render('Cell')}
                            </Link></Th>
                          : (index <= 2 ?
                            <Th {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                              {cell.render('Cell')}
                            </Th>
                            : (index == 3 ?
                              <Th>
                                {user && row.original.user_id === user.id ? (
                                  <>
                                    <EditJomButton

                                      order_date={new Date(order.order_date)}
                                      jom={row.original}
                                    />
                                  </>
                                ) : (
                                  ""
                                )}
                              </Th>
                              : (index == 4 ?
                                <Th>
                                  {user &&
                                    row.original.user_id === user.id &&
                                    row.original.payment_method === "Online Transfer" ? (
                                    row.original.payment_receipt.length === 0 ? (
                                      <UploadFile
                                        multiple
                                        id={row.original.id}
                                        accept=".jpg,.png,.jpeg"
                                        limitFiles={1}
                                        maxFileSizeInBytes={MAX_FILE_SIZE}
                                        label="Supports PNG, JPG, JPEG up to 5Mb"
                                        dbFunc={uploadPaymentReceipt}
                                      />
                                    ) : (
                                      ""
                                    )
                                  ) : row.original.payment_method === "Online Transfer" ||
                                    row.original.payment_receipt.length > 0 ? (
                                    ""
                                  ) : (
                                    "-"
                                  )}
                                  {row.original.payment_receipt.length > 0 ? (
                                    <Receipt jom={row.original} />
                                  ) : (
                                    ""
                                  )}</Th>
                                : (
                                  <Th>
                                    <Button
                                      onClick={() => {
                                        const callback = onClickUpdatePayment(
                                          row.original.id,
                                          row.original,
                                          row.original.order_id,
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
                                      isDisabled={row.original.pay}
                                    >
                                      {row.original.pay ? "Paid" : "Pay"}
                                    </Button>
                                  </Th>
                                )
                              )))}</>
                      ))}
                    </Tr>
                  )
                })}
                {/* {joms &&
                  joms.map((jom, index) => {
                    return (
                      <Tr key={index}>
                        <Th>
                          <Link href={`/profile?id=${jom.user_id}`} isExternal color="blue.500">
                            {jom.user_name}
                          </Link></Th>
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
                          )} */}
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
                {/* </Th>
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
                  })} */}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </>
  );
};

export default OrderDetails;
