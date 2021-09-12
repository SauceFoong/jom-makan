import {Text, Box, useDisclosure} from "@chakra-ui/react"
import { useForm, Controller } from "react-hook-form";
import { useUser } from "../lib/auth/useUser";


const feedbackForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        register,
        reset, 
        handleSubmit, 
        control, 
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        const feedback = {
            ...data,
            created_at: new Date(),
            created_by: user.id,
        };
        createFeedback(feedback);
        reset();
        onClose();
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
          Feedback 
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>Leave Your Feedback</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl isInvalid={errors.feedback}>
                  <FormLabel>Feedback</FormLabel>
                  <Input
                    id="feedback"
                    placeholder="Leave your feedback"
                    {...register("feedback", {
                      required: "Feedback is required.",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.feedback && errors.feedback.message}
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
                  Submit
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );

}
