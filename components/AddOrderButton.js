import {
  Button,
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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import TipInputField from "./TipInputField";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";

const AddOrderButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dateTime, onChangeDateTime] = useState(new Date());

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
          <ModalHeader>Create your order</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Restaurant Name</FormLabel>
              <Input placeholder="Restaurant Name" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input placeholder="Write your description here" />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Menu / Reference Url</FormLabel>
              <Input placeholder="http://example.com/" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tips Request (RM)</FormLabel>
              <TipInputField />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Order Date</FormLabel>
              <DateTimePicker
                onChange={onChangeDateTime}
                value={dateTime}
              />{" "}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddOrderButton;
