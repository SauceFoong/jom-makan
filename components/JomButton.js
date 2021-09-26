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
    control,
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
      pay: false,
      created_at: new Date().toISOString(),
    };
    // console.log(jom);
    if (differenceInSeconds(order_date, new Date()) > 0) {
      console.log(differenceInSeconds(order_date, new Date()));
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
      console.log(differenceInSeconds(order_date, new Date()));

      showToast(
        toast,
        "Failed to JOM",
        "JOM can only be made at least 30 minutes before the order time.",
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
        bg={"blue.900"}
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
