import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon, LinkIcon } from "@chakra-ui/icons";
import React, { useState, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { deleteOrder } from "../lib/db";
import { showToast } from "../lib/Helper/Toast";

const DeleteOrderButton = ({ order_id, res_name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const toast = useToast();

  const onSubmit = async (data) => {
    console.log("Delete");
    await deleteOrder(order_id);
    showToast(
      toast,
      "Order deleted Successfully.",
      "People can't view this order anymore !",
      "success",
      5000,
      true
    );
    onClose();
  };

  return (
    <>
      <LinkIcon
        onClick={() => setIsOpen(true)}
        as={DeleteIcon}
        color="gray.800"
        position="absolute"
        right={2}
        top={10}
        cursor={"pointer"}
        _hover={{
          bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        }}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Order - {res_name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onSubmit} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteOrderButton;
