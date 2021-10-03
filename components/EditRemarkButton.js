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
  useToast,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { updateRemark } from "../lib/db";

const EditRemarkButton = ({ jom, jom_id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmtting },
  } = useForm();

  const toast = useToast();

  const onSubmit = async (data) => {
    const remark = {
      ...jom, 
      remark: data.remark
    };

    await updateRemark(jom_id, remark);
    toast({
        title: "Edit Remark Successful",
        description:
          "Successfully edit your remark",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    onClose();
    reset();
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
            <ModalHeader>Edit Remark</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={errors.remark}>
                <FormLabel>Remark</FormLabel>
                <Textarea
                  id="remark"
                  placeholder="Edit Your Remark Here"
                  {...register("remark", {
                    require: "Remark is required",
                  })}
                />
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

export default EditRemarkButton;
