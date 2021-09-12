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
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useUser } from "../lib/auth/useUser";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { createOrder } from "../lib/db";

const JomButton = ({ order }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useUser();
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const jom = {
      ...data,
      created_at: new Date().toISOString(),
    };
    console.log(jom);
    // createOrder(jom);
    onClose();
    reset();
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
            <ModalHeader>Jom this order</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.jom_remark}>
                <FormLabel>Remark</FormLabel>
                <Textarea
                  id="jom_remark"
                  placeholder="Write your remark here"
                  {...register("jom_remark", {
                    required: "Remark is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.jom_remark && errors.jom_remark.message}
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
