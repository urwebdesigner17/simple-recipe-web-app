import { Box, Button, Container, Heading, Input, Textarea, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
		servings: "",
		ingredients: "",
		procedures: "",
		nutrition: "",
	});
	const toast = useToast();
	const { createProduct } = useProductStore();
	const navigate = useNavigate(); // <-- initialize the hook

	const handleAddProduct = async () => {
		const { success, message } = await createProduct(newProduct);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
			navigate("/");
		}
		setNewProduct({ name: "", price: "", image: "", description: "" });
	};

	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Product Name'
							name='name'
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type='number'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Input
							placeholder='Image URL'
							name='image'
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>
						<Input
							placeholder='Number of Servings'
							name='servings'
							value={newProduct.servings}
							onChange={(e) => setNewProduct({ ...newProduct, servings: e.target.value })}
						/>
						<Input
							placeholder='Ingredients'
							name='ingredients'
							value={newProduct.ingredients}
							onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })}
						/>
						<Textarea
							placeholder='Procedures'
							height="70px"
							whiteSpace="normal"  // Allow wrapping of text
							overflow="hidden"
							wordBreak="break-word"
							name='procedures'
							value={newProduct.procedures}
							onChange={(e) => setNewProduct({ ...newProduct, procedures: e.target.value })}
						/>
						<Input
							placeholder='Nutrition facts'
							name='nutrition'
							value={newProduct.nutrition}
							onChange={(e) => setNewProduct({ ...newProduct, nutrition: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Recipe
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;
