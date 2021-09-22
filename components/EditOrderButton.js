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
  useToast,
} from "@chakra-ui/react";
import { EditIcon, LinkIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { updateOrder } from "../lib/db";
import { parseISO } from "date-fns";
import { showToast } from "../lib/Helper/Toast";

const EditOrderButton = ({
  order_id,
  res_name,
  ref_url,
  order_date,
  tips,
  description,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      last_update: new Date().toISOString(),
      order_date: data.order_date.toISOString(),
    };
    //console.log(order);
    await updateOrder(order_id, order);
    showToast(
      toast,
      "Order updated Successfully.",
      "Your can view your latest changes now !",
      "success",
      5000,
      true
    );
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
            <ModalHeader>Edit - {res_name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.res_name}>
                <FormLabel>Restaurant Name</FormLabel>
                <Input
                  id="res_name"
                  placeholder="Restaurant Name"
                  defaultValue={res_name}
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
                <Input
                  id="description"
                  placeholder="Write your description here"
                  defaultValue={description}
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
                  defaultValue={ref_url}
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
                  defaultValue={parseInt(tips) > 1 ? 1 : tips}
                >
                  <NumberInputField name="tips" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.order_date}>
                <FormLabel>Order Date & Close Order Time</FormLabel>
                <Controller
                  name="order_date"
                  control={control}
                  defaultValue={parseISO(order_date)}
                  rules={{
                    required: "Please specify your order date.",
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
