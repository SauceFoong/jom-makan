import Head from "next/head";
import {
  Text,
  Center,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Select,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useUser } from "../lib/auth/useUser";
import { createFeedback } from "../lib/db";
import { useState } from "react";

const feedbackForm = () => {
  const { user, logout } = useUser();
  const [alertMessage, setAlertMessage] = useState("");

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setAlertMessage("");
    const feedback = {
      ...data,
      created_at: new Date().toISOString(),
      created_by: user.id,
      username: user.name,
    };

    createFeedback(feedback);
    setAlertMessage("success");
    reset();
  };

  return (
    <>
      <Head>
        <title>Feedback</title>
      </Head>
      <Center fontSize={40} pt={10}>
        Send us your feedback.
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center>
          <VStack width={550} mt={5}>
            {alertMessage != "" && (
              <Alert status="success">
                <AlertIcon />
                <AlertDescription>Submitted.</AlertDescription>
              </Alert>
            )}
            <FormControl isInvalid={errors.subject}>
              <Select
                id="subject"
                placeholder="Subject"
                {...register("subject", {
                  required: "Please select a subject.",
                })}
              >
                <option>Orders</option>
                <option>Payment</option>
                <option>Others</option>
              </Select>
              <FormErrorMessage>
                {errors.subject && errors.subject.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.feedback}>
              <Textarea
                id="feedback"
                placeholder="Leave your message"
                rows={4}
                {...register("feedback", {
                  required: "Feedback is required",
                })}
              />
              <FormErrorMessage>
                {errors.feedback && errors.feedback.message}
              </FormErrorMessage>
            </FormControl>
          </VStack>
        </Center>

        <Center>
          <Button
            colorScheme="blue"
            mt={5}
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Center>
      </form>
    </>
  );
};

export default feedbackForm;
