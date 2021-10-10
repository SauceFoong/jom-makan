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
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { updateJom } from "../lib/db";
import { showToast } from "../lib/Helper/Toast";
import { differenceInSeconds } from "date-fns";

const EditJomButton = ({ order_date, jom }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmtting },
  } = useForm();

  const toast = useToast();

  const onSubmit = async (data) => {
    let jom_obj = {};
    if (differenceInSeconds(order_date, new Date()) > 0) {
      jom_obj = {
        ...jom,
        remark: data.remark,
        payment_method: data.payment_method,
      };
    } else {
      jom_obj = {
        ...jom,
        payment_method: data.payment_method,
      };
    }

    await updateJom(jom_obj);
    showToast(
      toast,
      "Jom Details Edited Successful!",
      "Your Jom Details has been edited successfully",
      "success",
      5000,
      true
    );
    onClose();
    reset();
    // if (differenceInSeconds(order_date, new Date()) > 0) {
    //   // console.log(differenceInSeconds(order_date, new Date()));
    //   await updateJom(jom_obj);
    //   showToast(
    //     toast,
    //     "Remark Edited Successful!",
    //     "Your Remark has been edited successfully",
    //     "success",
    //     5000,
    //     true
    //   );
    //   onClose();
    //   reset();
    // } else {
    //   // console.log(differenceInSeconds(order_date, new Date()));
    //   showToast(
    //     toast,
    //     "Remark Cannot Be Edited After Order Closed!",
    //     "Please edit the your jom remark before the order closed.",
    //     "error",
    //     5000,
    //     true
    //   );
    // }

    // await updateRemark(jom_id, remark);
    // showToast(
    //   toast,
    //   "Remark Edited Successful!",
    //   "Your Remark has been edited successfully",
    //   "success",
    //   5000,
    //   true
    // );
    // onClose();
    // reset();
  };

  return (
    <>
      <Button variant="unstyled" onClick={onOpen}>
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>Edit Jom Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={errors.payment_method}>
                <FormLabel>Payment Method</FormLabel>
                <Select
                  id="Payment Method"
                  placeholder="Select your payment method"
                  defaultValue={jom.payment_method}
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
                  disabled={differenceInSeconds(order_date, new Date()) < 0}
                  defaultValue={jom.remark}
                  placeholder="Edit Your Remark Here"
                  {...register("remark", {
                    require: "Remark is required",
                  })}
                />
                {differenceInSeconds(order_date, new Date()) < 0 ? (
                  <Text fontSize="xs" color="gray.500">
                    **Unable to edit remark after order closed
                  </Text>
                ) : (
                  ""
                )}
                <FormErrorMessage>
                  {errors.remark && errors.remark.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button type="submit">Change</Button>
              <Button onClick={onClose} ml={3}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>{" "}
    </>
  );
};

export default EditJomButton;
