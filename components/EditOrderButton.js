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
  useColorModeValue,
} from "@chakra-ui/react";
import { EditIcon, LinkIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useUser } from "../lib/auth/useUser";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { createOrder } from "../lib/db";
import { format, parseISO } from "date-fns";

const EditOrderButton = ({
  res_name,
  ref_url,
  order_date,
  tips,
  description,
}) => {
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
  console.log(parseISO(order_date));
  console.log(order_date);

  const onSubmit = async (data) => {
    const order = {
      ...data,
      created_at: new Date().toISOString(),
      created_by: user.id,
      order_date: data.order_date.toISOString(),
      jom_member: [],
    };
    console.log(order);
    // createOrder(order);
    onClose();
    reset();
  };

  return (
    <>
      <LinkIcon
        onClick={onOpen}
        as={EditIcon}
        color="gray.800"
        position="absolute"
        right={2}
        top={2}
        cursor={"pointer"}
        _hover={{
          bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit your order</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.res_name}>
                <FormLabel>Restaurant Name</FormLabel>
                <Input {...register("res_name")} />
                <FormErrorMessage>
                  {errors.res_name && errors.res_name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.description}>
                <FormLabel>Description</FormLabel>
                <Input
                  id="description"
                  placeholder="Write your description here"
                  value={description}
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
                  value={ref_url}
                  {...register("ref_url", {
                    required: "Ref Url is required",
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
                  value={parseInt(tips) > 1 ? 1 : tips}
                >
                  <NumberInputField name="tips" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.order_date}>
                <FormLabel>Order Date</FormLabel>
                <Controller
                  name="order_date"
                  control={control}
                  rules={{
                    required: "Please specify your order date.",
                  }}
                  render={({ field }) => (
                    <DateTimePicker {...register("order_date")} />
                  )}
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

export default EditOrderButton;
