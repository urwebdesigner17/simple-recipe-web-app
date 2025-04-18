import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure,
    useToast,
    VStack,
    Tooltip,
    Textarea
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const SingleRecipeCard = ({ product }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const { success, message } = await updateProduct(pid, updatedProduct);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: "Product updated successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };

    return (
        <Box
            mt= '12'
            w='90%'
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as='h3' size='md' textAlign="center" mb={2} >
                    {product.name}
                    <Box as="hr" borderColor="gray.300" my={4} w="100%" mx="auto" />
                </Heading>

                <Text fontWeight='med' fontSize='l' color={textColor} >
                    Budget: Php {product.price}
                </Text>
                <Text fontWeight='med' fontSize='l' color={textColor} mb={4}>
                    Servings: {product.servings}
                </Text>
                <Text fontWeight="bold" fontSize="lg" color={textColor}  mb={4}>
                    Ingredients:
                    {product.ingredients.split(',').map((ingredient, index) => (
                    <Text key={index} fontWeight="light" color={textColor}>
                        {ingredient.trim()}
                    </Text>
                    ))}
                </Text>

                <Text fontWeight='bold' fontSize='med' color={textColor}>
                    Procedures:
                </Text>
                <Text fontWeight='med' fontSize='l' color={textColor} mb={4}>
                    {product.procedures}
                </Text>
                <Text fontWeight='bold' fontSize='l' color={textColor}>
                    Nutrition facts:
                </Text>
                <Text fontWeight='med' fontSize='l' color={textColor} mb={4}>
                    {product.nutrition}
                </Text>

                <HStack spacing={2}>
                    <Tooltip label="Edit"><IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' /></Tooltip>
                    <Tooltip label="Delete"><IconButton
                            icon={<DeleteIcon />}
                            onClick={() => handleDeleteProduct(product._id)}
                            colorScheme='red'
                        />
                    </Tooltip>
                    <Tooltip label="View menu">
                        <Button colorScheme='green'  w='full'>
                        <Link to={"/"}>Back to Home</Link>
                        </Button>
                    </Tooltip>
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                            <Input
                                placeholder='Number of servings'
                                name='servings'
                                value={updatedProduct.servings}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, servings: e.target.value })}
                            />
                            <Input
                                placeholder='Ingredients'
                                name='ingredients'
                                value={updatedProduct.ingredients}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, ingredients: e.target.value })}
                            />
                            <Textarea
                                placeholder='Procedures'
                                height="70px"
                                whiteSpace="normal"  // Allow wrapping of text
                                overflow="hidden"
                                wordBreak="break-word"
                                name='procedures'
                                value={updatedProduct.procedures}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, procedures: e.target.value })}
                            />
                            <Input
                                placeholder='Nutrition facts'
                                name='nutrition'
                                value={updatedProduct.nutrition}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, nutrition: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
export default SingleRecipeCard;
