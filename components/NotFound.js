import { Box, Text, Image } from "@chakra-ui/react";
import styles from "../styles/NotFound.module.css";

const NotFound = ({ obj }) => {
  return (
    <Box className={styles.img_container} textAlign="center" maxW={"600px"}>
      <svg
        width="900"
        height="600"
        viewBox="0 0 900 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="transparent" d="M0 0h900v600H0z" />
        <path
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="bevel"
          strokeDasharray="10.6 26.51"
          d="M152 108.014h597v381.741H152z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="m626.615 145.89-77.704-77.774A54.948 54.948 0 0 0 510.058 52H312.993c-30.362 0-54.954 24.614-54.954 55.003v385.018c0 30.389 24.592 55.003 54.954 55.003h274.77c30.362 0 54.954-24.614 54.954-55.003V184.776a55.044 55.044 0 0 0-16.102-38.886z"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4"
        />
        <rect
          x="316.361"
          y="179.061"
          width="244.95"
          height="11.664"
          rx="5.832"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="316.361"
          y="216.174"
          width="244.95"
          height="11.664"
          rx="5.832"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="316.361"
          y="253.288"
          width="244.95"
          height="11.664"
          rx="5.832"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="316.361"
          y="290.401"
          width="244.95"
          height="11.664"
          rx="5.832"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="316.361"
          y="327.515"
          width="244.95"
          height="11.664"
          rx="5.832"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="316.361"
          y="364.629"
          width="244.95"
          height="11.664"
          rx="5.832"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="316.361"
          y="401.743"
          width="244.95"
          height="11.664"
          rx="5.832"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="316.361"
          y="438.856"
          width="244.95"
          height="11.664"
          rx="5.832"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="316.361"
          y="475.97"
          width="244.95"
          height="11.664"
          rx="5.832"
          fill="#fff"
          stroke="#E1E4E5"
          strokeWidth="4.242"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m695.938 519.585-45.891-45.891"
          stroke="#000000"
          strokeWidth="42.536"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="554.418"
          cy="374.252"
          r="132.019"
          fill="#000000"
          stroke="#000000"
          strokeWidth="39.017"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M554.408 400.223v-4.299c0-14.079 8.701-21.701 17.423-27.557 8.515-5.732 17.05-13.208 17.05-26.997 0-19.043-15.43-34.453-34.452-34.453-19.023 0-34.473 15.389-34.473 34.432m34.43 107.447a3.08 3.08 0 0 0-3.095 3.115 3.112 3.112 0 0 0 3.116 3.115 3.112 3.112 0 0 0 3.115-3.115 3.102 3.102 0 0 0-3.136-3.115"
          stroke="#fff"
          strokeWidth="25.449"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <Text as="em" fontSize="3xl">
        No {obj} Found
      </Text>
    </Box>
  );
};

export default NotFound;
