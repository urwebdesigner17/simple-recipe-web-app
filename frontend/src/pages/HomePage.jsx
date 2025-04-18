import { Container, SimpleGrid, Text, Box, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
	const { fetchProducts, products } = useProductStore();

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log("products", products);

	return (
		<Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Box
					bgImage="url('https://t4.ftcdn.net/jpg/09/53/85/55/360_F_953855515_YQ5peGf7ezd16cbl41c8gk0LbUuelBv8.jpg')"
					bgSize="cover"
					bgPosition="center"
					bgRepeat="no-repeat"
					height={['100px', '150px', '200px', '250px']}
					width="100%"
					display="flex"
					alignItems="center"
					justifyContent="center"
					>
					<Text
						fontWeight={"bold"}
						bgClip={"text"}
						textAlign={"center"}
						color='#c4ff78'
						textShadow="2px 2px 4px rgba(0, 0, 0, 1.6)"
						fontSize={["16", "24", "32", "50"]}>
					🥄What do you plan to cook today?
					</Text>
				</Box>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{products
					.filter((product) => product && product._id)
					.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</SimpleGrid>

				{products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No recipe found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a recipe
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
	);
};
export default HomePage;
