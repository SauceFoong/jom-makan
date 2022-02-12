import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useColorModeValue,
    useToast,
    Tooltip,
} from "@chakra-ui/react";
import { CopyIcon, LinkIcon } from "@chakra-ui/icons";
import React, { useState, useRef } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { duplicateOrder } from "../lib/db";
import { showToast } from "../lib/Helper/Toast";

const DuplicateOrderButton = ({ order_id, res_name }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();
    const toast = useToast();

    const onSubmit = async (data) => {
        await duplicateOrder(order_id);
        showToast(
            toast,
            "Order Duplicated Successfully.",
            "People can start jomming this order!",
            "success",
            5000,
            true
        );
        onClose();
    };

    return (
        <>
            <Tooltip
                label="Duplicate the order"
            >
                <LinkIcon
                    onClick={() => setIsOpen(true)}
                    as={CopyIcon}
                    color={useColorModeValue("gray.900", "white")}
                    position="absolute"
                    right={2}
                    top={20}
                    cursor={"pointer"}
                    _hover={{
                        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
                    }}
                    zIndex={1}
                />
            </Tooltip>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Duplicate Order - {res_name}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure to duplciate the similar order.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="blue" onClick={onSubmit} ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default DuplicateOrderButton;
