import { Box, Text, Flex } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      py={4}
      mt={12}
      w="100%"
    >
      <Flex
        maxW="container.lg"
        mx="auto"
        px={4}
        justify="center"
        align="center"
        textAlign="center"
        fontSize="sm"
      >
        <Text>
          © {new Date().getFullYear()} Luto na Tayo. All rights reserved. 🥣
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
