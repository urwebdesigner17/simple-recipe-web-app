import { Button, Container, Flex, HStack, Box, Text, useColorMode, Tooltip  } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaHome } from 'react-icons/fa';

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Box
			position="fixed"
			top={0}
			left={0}
			width="100%"
			zIndex={1000}
			bg="#000"
			boxShadow="sm"
		>
		<Container maxW={"100%"} px={4} bgColor="#000">
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					color='#c4ff78'
				>
					<Link to={"/"}>Luto na Tayo <Text as="span" color="teal.500">🥣</Text></Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/"}>
						<Button leftIcon={<FaHome />} bgColor='#c4ff78' _hover={{ bg: "green", color: "#fff" }}>
							Home
						</Button>
					</Link>
					<Tooltip label="Click to add product">
						<Link to={"/create"}>
							<Button bgColor='#c4ff78' _hover={{ bg: "green", color: "#fff" }}>
								<PlusSquareIcon fontSize={20} />
							</Button>
						</Link>
					</Tooltip>
					<Tooltip label="Change Background">
						<Button onClick={toggleColorMode} bgColor='#c4ff78' _hover={{ bg: "green", color: "#fff" }}>
							{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
						</Button>
					</Tooltip>
				</HStack>
			</Flex>
		</Container>
		</Box>
	);
};
export default Navbar;
