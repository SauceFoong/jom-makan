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
import React, { useState, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { useUser } from "../lib/auth/useUser";
import { deleteJom, getUserOrderJom } from "../lib/db";
import { showToast } from "../lib/Helper/Toast";
import { differenceInSeconds } from "date-fns";

const CancelJomButton = ({ order_id, res_name, order_date }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const { user, logout } = useUser();
  const toast = useToast();

  const onSubmit = async (data) => {
    console.log("Cancel Jom");
    const joms = await getUserOrderJom(order_id, user.id);
    //Jom can only be cancelled 30 minutes before the order_date
    if (differenceInSeconds(order_date, new Date()) > 0) {
      console.log(differenceInSeconds(order_date, new Date()));
      deleteJom(joms[0]);
      showToast(
        toast,
        "Your JOM cancelled Successfully.",
        "Orderer can't view this jom anymore !",
        "success",
        5000,
        true
      );
    } else {
      console.log(differenceInSeconds(order_date, new Date()));
      showToast(
        toast,
        "Your JOM cannot be cancelled.",
        "JOM can only be cancelled at least 30 minutes before the order time.",
        "error",
        5000,
        true
      );
    }

    onClose();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        w={"full"}
        mt={6}
        bg={useColorModeValue("red.600", "red.700")}
        color={"white"}
        rounded={"md"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
      >
        Cancel JOM
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cancel JOM - {res_name}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                No
              </Button>
              <Button colorScheme="red" onClick={onSubmit} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default CancelJomButton;
