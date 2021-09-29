import {
  Button,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  useColorModeValue,
  Textarea,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useUser } from "../lib/auth/useUser";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { createOrder } from "../lib/db";
import { showToast } from "../lib/Helper/Toast";

const AddOrderButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useUser();
  const [tipValue, setTip] = useState("0.50");
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const onSubmit = async (data) => {
    const order = {
      ...data,
      created_at: new Date().toISOString(),
      last_update: new Date().toISOString(),
      created_by: user.id,
      order_date: data.order_date.toISOString(),
      jom_members: [],
    };
    // console.log(order);
    await createOrder(order);
    showToast(
      toast,
      "Order Created Successfully.",
      "Congrats ! People can view your order now.",
      "success",
      5000,
      true
    );
    onClose();
    reset();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant={"solid"}
        colorScheme={"blue"}
        size={"sm"}
        mr={4}
        leftIcon={<AddIcon />}
      >
        Create Order
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Create your order</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.res_name}>
                <FormLabel>Restaurant Name</FormLabel>
                <Input
                  id="res_name"
                  placeholder="Restaurant Name"
                  {...register("res_name", {
                    required: "Restaurant Name is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.res_name && errors.res_name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Write your description here"
                  {...register("description", {
                    maxLength: {
                      value: 50,
                      message: "Description should be shorter than 50 words",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.ref_url}>
                <FormLabel>Menu / Reference Url</FormLabel>
                <Input
                  id="ref_url"
                  placeholder="http://example.com/"
                  {...register("ref_url", {
                    required: false,
                  })}
                />
                <FormErrorMessage>
                  {errors.ref_url && errors.ref_url.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Tips Request (RM)</FormLabel>
                <NumberInput
                  defaultValue={0.5}
                  precision={2}
                  step={0.1}
                  max={1}
                  min={0}
                  {...register("tips", {
                    required: true,
                  })}
                  onChange={(valueString) => setTip(valueString)}
                  value={parseInt(tipValue) > 1 ? 1 : tipValue}
                >
                  <NumberInputField name="tips" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl
                mt={4}
                isInvalid={errors.order_date}
                color={useColorModeValue("gray.900", "gray.600")}
              >
                <FormLabel color={useColorModeValue("gray.900", "white")}>
                  Order Date & Close Order Time
                </FormLabel>
                <Controller
                  name="order_date"
                  control={control}
                  rules={{
                    required:
                      "Please specify your order date and close order time.",
                  }}
                  render={({ field }) => <DateTimePicker {...field} />}
                />
                {errors.order_date && (
                  <FormErrorMessage>
                    {errors.order_date.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                isLoading={isSubmitting}
                type="submit"
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddOrderButton;
