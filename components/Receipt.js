import React, { useState } from "react";
import UploadFile from "../components/UploadFile";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { Icon } from "@chakra-ui/react";
import { BiReceipt } from "react-icons/bi";

const Receipt = ({ jom }) => {
  const [toggleLightBox, setToggleLightBox] = useState(false);
  return (
    <>
      <Icon
        as={BiReceipt}
        w={10}
        h={10}
        onClick={setToggleLightBox}
        cursor={"zoom-in"}
        _hover={{
          bg: "gray.500",
        }}
      />

      {/* <LinkIcon
      ml={2}
      fontSize={10}
      onClick={() => removeOrderReceipt(order.id)}
      as={CloseIcon}
      color={"red"}
      cursor={"pointer"}
      _hover={{
        bg: "gray.300",
        borderRadius: "50%",
      }}
      zIndex={1}
    /> */}

      {toggleLightBox ? (
        <>
          <Lightbox
            image={jom.payment_receipt}
            title={"Payment Receipt "}
            onClose={() => setToggleLightBox(false)}
          />
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default Receipt;
