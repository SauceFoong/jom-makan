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

const JomButton = ({ order_id, order_name }) => {
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
      user_id: user.id,
      created_at: new Date().toISOString(),
    };
    // console.log(jom);
    createJom(jom);
    onClose();
    showToast();
    reset();
  };

  const showToast = () => {
    return toast({
      title: "Jom Successfully.",
      description: "Let's jom makan bersama !",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        w={"full"}
        mt={8}
        bg={"gray.900"}
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
