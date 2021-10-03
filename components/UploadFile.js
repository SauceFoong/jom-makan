import React, { useState } from "react";
import ImageIcon from "../components/ImageIcon";
import {
  Box,
  Flex,
  Text,
  Stack,
  Input,
  useToast,
  UnorderedList,
  ListItem,
  useColorModeValue,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { CloseIcon, LinkIcon } from "@chakra-ui/icons";
import { uploadOrderReceipt } from "../lib/db";
import { showToast } from "../lib/Helper/Toast";

const KILO_BYTES_PER_BYTE = 1000;
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

const convertNestedObjectToArray = (nestedObj) =>
  Object.keys(nestedObj).map((key) => nestedObj[key]);

const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const UploadFile = ({
  orderId,
  updateFilesCb,
  maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
  label,
  limitFiles = 5,
  ...otherProps
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [files, setFiles] = useState({});

  const addNewFiles = (newFiles) => {
    for (let file of newFiles) {
      console.log(newFiles.length);
      const filesLength = Object.keys(files).length;
      console.log(filesLength);
      if (newFiles.length > limitFiles || filesLength == limitFiles) {
        showToast(
          toast,
          "An error occured",
          `Maximum number of files (${limitFiles}) reached. Please try again.`,
          "error",
          5000,
          true
        );
      } else if (file.size < maxFileSizeInBytes) {
        console.log(file.size);
        if (!otherProps.multiple) {
          return { file };
        }
        files[file.name] = file;
      } else {
        showToast(
          toast,
          "An error occured",
          `File size of ${file.name} exceeds 5MB `,
          "error",
          5000,
          true
        );
      }
    }

    return { ...files };
  };

  const callUpdateFilesCb = (files) => {
    const filesAsArray = convertNestedObjectToArray(files);
    updateFilesCb(filesAsArray);
  };

  const handleNewFileUpload = (event) => {
    const { files: newFiles } = event.target;
    console.log(newFiles);
    if (newFiles.length) {
      let updatedFiles = addNewFiles(newFiles);
      setFiles(updatedFiles);
      callUpdateFilesCb(updatedFiles);
    }
  };

  const removeFile = (fileName) => {
    delete files[fileName];
    setFiles({ ...files });
    callUpdateFilesCb({ ...files });
  };

  const handleSubmit = async () => {
    setUploadLoading(true);
    await uploadOrderReceipt(orderId, files);
    setUploadLoading(false);
    setFiles({});
    onClose();
    showToast(
      toast,
      "Order Receipt Uploaded Successfully.",
      "Your jommers can view your receipt now!",
      "success",
      5000,
      true
    );
    // onClose();
    // setTimeout(function () {
    //   setUploadLoading(false);
    // }, 5000);
  };

  return (
    <>
      <Button onClick={onOpen}>Upload</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload your receipt</ModalHeader>

          <ModalCloseButton />
          <ModalBody pb={6}>
            {uploadLoading ? (
              <Center>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Center>
            ) : (
              <Flex
                pos="relative"
                align="center"
                justify="center"
                py="8"
                borderWidth={2}
                borderColor="gray.500"
                borderStyle="dashed"
                rounded="xl"
              >
                <Stack
                  spacing="1"
                  direction="column"
                  fontSize="sm"
                  align="center"
                >
                  <ImageIcon boxSize="12" />
                  <Text fontWeight="medium">Upload / Drop Files Here</Text>

                  <Input
                    pos="absolute"
                    top="0"
                    left="0"
                    opacity="0"
                    h="full"
                    bg="transparent"
                    variant="outline"
                    borderWidth={2}
                    type="file"
                    value=""
                    onChange={handleNewFileUpload}
                    {...otherProps}
                  />
                  <Text fontSize="sm" color="gray.500">
                    {label}
                  </Text>
                </Stack>
              </Flex>
            )}
            {Object.keys(files).length != 0 && (
              <>
                <Box mt="8" mb="4">
                  <Text fontWeight="bold">Files</Text>
                </Box>

                {Object.keys(files).map((fileName, index) => {
                  let file = files[fileName];
                  let isImageFile = file.type.split("/")[0] === "image";
                  return (
                    <Box key={fileName}>
                      {isImageFile && (
                        <UnorderedList>
                          <ListItem>
                            {file.name} - {convertBytesToKB(file.size)} KB{" "}
                            <LinkIcon
                              ml={2}
                              fontSize={10}
                              onClick={() => removeFile(fileName)}
                              as={CloseIcon}
                              color={"red"}
                              cursor={"pointer"}
                              _hover={{
                                bg: "gray.300",
                              }}
                              zIndex={1}
                            />
                          </ListItem>
                        </UnorderedList>
                      )}
                    </Box>
                  );
                })}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadFile;
