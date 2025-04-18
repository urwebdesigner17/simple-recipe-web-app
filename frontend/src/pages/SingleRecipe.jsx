import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Text } from '@chakra-ui/react';
import SingleRecipeCard from '../components/SingleRecipeCard';

const SingleRecipe = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json(); // ✅ Correctly parse response
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [id]);

  if (loading) return <Text>Loading...</Text>;
  if (!product) return <Text>Recipe not found.</Text>;

  return (
    <Container maxW="1100px" mt="6" centerContent>
      <SingleRecipeCard product={product} />
    </Container>
  );
};

export default SingleRecipe;
