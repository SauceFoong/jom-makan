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

const AddOrderButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        variant={"solid"}
        colorScheme={"teal"}
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
              <FormLabel>Menu / Reference Url</FormLabel>
              <Input placeholder="http://example.com/" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tips Request</FormLabel>
              <Input placeholder="How much tips you request" />
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
