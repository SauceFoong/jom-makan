import {
  Button,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Textarea,
  useColorModeValue,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useUser } from "../lib/auth/useUser";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { createJom } from "../lib/db";
import { showToast } from "../lib/Helper/Toast";
import { differenceInSeconds } from "date-fns";

const JomButton = ({ order_id, order_name, order_date }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useUser();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    const jom = {
      ...data,
      order_id: order_id,
      order_name: order_name,
      user_id: user.id,
      user_name: user.name,
      payment_receipt: [],
      pay: false,
      created_at: new Date().toISOString(),
    };
    // console.log(jom);
    if (differenceInSeconds(order_date, new Date()) > 0) {
      // console.log(differenceInSeconds(order_date, new Date()));
      createJom(jom);
      showToast(
        toast,
        "Jom Successfully.",
        "Let's jom makan " + order_name + " bersama !",
        "success",
        5000,
        true
      );
    } else {
      //console.log(differenceInMinutes(order_date, new Date()));
      // console.log(differenceInSeconds(order_date, new Date()));

      showToast(
        toast,
        "Failed to JOM",
        "JOM can only be made before the Order Close Time.",
        "error",
        5000,
        true
      );
    }

    onClose();
    reset();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        w={"full"}
        mt={6}
        bg={useColorModeValue("blue.600", "blue.900")}
        color={"white"}
        rounded={"md"}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
        }}
      >
        JOM
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Jom Makan - {order_name} </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.payment_method}>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  id="Payment Method"
                  placeholder="Select your payment method"
                  {...register("payment_method", {
                    required: "Please select a payment method.",
                  })}
                >
                  <option>Cash</option>
                  <option>Online Transfer</option>
                </Select>
                <FormErrorMessage>
                  {errors.payment_method && errors.payment_method.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.remark}>
                <FormLabel>Remark</FormLabel>
                <Textarea
                  id="remark"
                  placeholder="Write your remark here"
                  {...register("remark", {
                    required: "Remark is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.remark && errors.remark.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                isLoading={isSubmitting}
                type="submit"
              >
                Confirm
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default JomButton;
